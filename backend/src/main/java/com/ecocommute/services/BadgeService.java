package com.ecocommute.services;

import com.ecocommute.dto.BadgeAwardDTO;
import com.ecocommute.dto.BadgeDetailDTO;
import com.ecocommute.entities.Badge;
import com.ecocommute.entities.User;
import com.ecocommute.entities.UserBadge;
import com.ecocommute.entities.UserStats;
import com.ecocommute.repositories.BadgeRepository;
import com.ecocommute.repositories.UserBadgeRepository;
import com.ecocommute.repositories.UserStatsRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class BadgeService {

    private final BadgeRepository badgeRepository;
    private final UserBadgeRepository userBadgeRepository;
    private final UserStatsRepository userStatsRepository;

    public BadgeService(BadgeRepository badgeRepository,
                        UserBadgeRepository userBadgeRepository,
                        UserStatsRepository userStatsRepository) {
        this.badgeRepository = badgeRepository;
        this.userBadgeRepository = userBadgeRepository;
        this.userStatsRepository = userStatsRepository;
    }

    @Transactional(readOnly = true)
    public List<BadgeDetailDTO> getAllBadgesForUser(User user) {
        List<Badge> allBadges = badgeRepository.findAll();
        if (user == null) {
            return allBadges.stream()
                    .map(b -> toDetailDTO(b, false, 0, null))
                    .toList();
        }

        Map<Long, UserBadge> userBadgesMap = userBadgeRepository.findByUserId(user.getId())
                .stream()
                .collect(Collectors.toMap(ub -> ub.getBadge().getId(), ub -> ub, (a, b) -> a));

        UserStats stats = userStatsRepository.findByUserId(user.getId())
                .orElseGet(() -> new UserStats(user));

        return allBadges.stream()
                .map(badge -> {
                    UserBadge ub = userBadgesMap.get(badge.getId());
                    boolean unlocked = ub != null;
                    int progress = unlocked ? 100 : calculateProgress(badge, user, stats);
                    return toDetailDTO(badge, unlocked, progress, ub != null ? ub.getAwardedAt() : null);
                })
                .toList();
    }

    @Transactional(readOnly = true)
    public List<BadgeAwardDTO> getMyBadges(String userId) {
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        return userBadgeRepository.findByUserId(userId).stream()
                .map(ub -> new BadgeAwardDTO(
                        ub.getBadge().getId(),
                        ub.getBadge().getCode(),
                        ub.getBadge().getTitle(),
                        ub.getBadge().getDescription(),
                        ub.getBadge().getIconEmoji(),
                        ub.getAwardedAt() != null ? ub.getAwardedAt().format(formatter) : null
                ))
                .toList();
    }

    @Transactional(readOnly = true)
    public BadgeDetailDTO getBadgeById(Long badgeId, User user) {
        Badge badge = badgeRepository.findById(badgeId)
                .orElseThrow(() -> new IllegalArgumentException("Medalla no encontrada con id: " + badgeId));

        if (user == null) {
            return toDetailDTO(badge, false, 0, null);
        }

        Optional<UserBadge> userBadge = userBadgeRepository.findByUserIdAndBadgeId(user.getId(), badgeId);
        boolean unlocked = userBadge.isPresent();
        UserStats stats = userStatsRepository.findByUserId(user.getId())
                .orElseGet(() -> new UserStats(user));
        int progress = unlocked ? 100 : calculateProgress(badge, user, stats);

        return toDetailDTO(badge, unlocked, progress, userBadge.map(UserBadge::getAwardedAt).orElse(null));
    }

    public int calculateProgress(Badge badge, User user, UserStats stats) {
        List<Double> ratios = new ArrayList<>();
        if (badge.getRequiredPoints() > 0) {
            ratios.add(user.getCurrentPoints() / (double) badge.getRequiredPoints());
        }
        if (badge.getRequiredCo2SavedKg() > 0) {
            ratios.add(stats.getTotalCo2SavedKg() / badge.getRequiredCo2SavedKg());
        }
        if (badge.getRequiredStreakDays() > 0) {
            ratios.add(user.getStreakDays() / (double) badge.getRequiredStreakDays());
        }
        if (badge.getRequiredTrips() > 0) {
            ratios.add(stats.getTotalTrips() / (double) badge.getRequiredTrips());
        }
        if (ratios.isEmpty()) return 0;
        double minRatio = ratios.stream().mapToDouble(Double::doubleValue).min().orElse(0.0);
        return (int) Math.round(Math.min(1.0, Math.max(0.0, minRatio)) * 100);
    }

    private BadgeDetailDTO toDetailDTO(Badge badge, boolean unlocked, int progress, java.time.LocalDateTime awardedAt) {
        return new BadgeDetailDTO(
                badge.getId(),
                badge.getCode(),
                badge.getTitle(),
                badge.getDescription(),
                badge.getIconUrl(),
                badge.getIconEmoji(),
                badge.getRequiredPoints(),
                badge.getRequiredCo2SavedKg(),
                badge.getRequiredStreakDays(),
                badge.getRequiredTrips(),
                unlocked,
                progress,
                awardedAt
        );
    }
}
