package com.ecocommute.services;

import com.ecocommute.dto.CommunityImpactDTO;
import com.ecocommute.dto.DashboardBadgeDTO;
import com.ecocommute.dto.DashboardSummaryDTO;
import com.ecocommute.dto.WeeklyTrendPointDTO;
import com.ecocommute.entities.Badge;
import com.ecocommute.entities.Trip;
import com.ecocommute.entities.User;
import com.ecocommute.entities.UserStats;
import com.ecocommute.repositories.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.TextStyle;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private static final double KG_OF_CO2_PER_TREE_PER_YEAR = 21.77;

    private final UserRepository userRepository;
    private final UserStatsRepository userStatsRepository;
    private final TripRepository tripRepository;
    private final BadgeRepository badgeRepository;
    private final UserBadgeRepository userBadgeRepository;

    public DashboardService(UserRepository userRepository,
                            UserStatsRepository userStatsRepository,
                            TripRepository tripRepository,
                            BadgeRepository badgeRepository,
                            UserBadgeRepository userBadgeRepository) {
        this.userRepository = userRepository;
        this.userStatsRepository = userStatsRepository;
        this.tripRepository = tripRepository;
        this.badgeRepository = badgeRepository;
        this.userBadgeRepository = userBadgeRepository;
    }

    @Transactional(readOnly = true)
    public DashboardSummaryDTO getUserDashboard(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        UserStats stats = userStatsRepository.findByUserId(userId)
                .orElseGet(() -> new UserStats(user));

        List<Trip> recentTrips = tripRepository.findUserTripsSince(userId, LocalDateTime.now().minusDays(7));

        // Group CO2 saved by day of week
        Map<LocalDate, Double> dailyCo2 = new LinkedHashMap<>();
        LocalDate today = LocalDate.now();
        for (int i = 6; i >= 0; i--) {
            dailyCo2.put(today.minusDays(i), 0.0);
        }

        for (Trip trip : recentTrips) {
            LocalDate tripDay = trip.getCompletedAt().toLocalDate();
            if (dailyCo2.containsKey(tripDay)) {
                dailyCo2.put(tripDay, dailyCo2.get(tripDay) + trip.getCo2SavedGrams());
            }
        }

        List<Double> weeklyCo2SavedGrams = new ArrayList<>(dailyCo2.values());
        List<String> weeklyLabels = dailyCo2.keySet().stream()
                .map(d -> d.getDayOfWeek().getDisplayName(TextStyle.SHORT, new Locale("es", "ES")))
                .toList();

        // Weekly trend combined into the shape the dashboard UI expects:
        // [{ dayOfWeek: "lun.", co2SavedGrams: 123.0 }, ...]
        List<WeeklyTrendPointDTO> weeklyTrend = new ArrayList<>();
        for (int i = 0; i < weeklyLabels.size(); i++) {
            weeklyTrend.add(new WeeklyTrendPointDTO(weeklyLabels.get(i), weeklyCo2SavedGrams.get(i)));
        }

        // Trips count by mode
        List<Trip> allUserTrips = tripRepository.findByUserIdOrderByCompletedAtDesc(userId);
        Map<String, Long> tripsByMode = allUserTrips.stream()
                .collect(Collectors.groupingBy(t -> t.getTransportMode().name(), Collectors.counting()));

        // Badges: every badge, marked as unlocked/locked with progress toward the next one
        Set<Long> unlockedBadgeIds = userBadgeRepository.findByUserId(userId).stream()
                .map(ub -> ub.getBadge().getId())
                .collect(Collectors.toSet());
        List<Badge> allBadgeEntities = badgeRepository.findAll();

        List<DashboardBadgeDTO> recentBadges = allBadgeEntities.stream()
                .map(badge -> new DashboardBadgeDTO(
                        badge.getId(),
                        badge.getCode(),
                        badge.getTitle(),
                        badge.getDescription(),
                        badge.getIconEmoji(),
                        unlockedBadgeIds.contains(badge.getId()),
                        unlockedBadgeIds.contains(badge.getId())
                                ? 100
                                : calculateBadgeProgress(badge, user, stats)))
                .toList();

        return new DashboardSummaryDTO(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getAvatarUrl(),
                stats.getTotalCo2SavedKg(),
                stats.getTotalDistanceKm(),
                stats.getTotalTrips(),
                user.getCurrentPoints(),
                user.getCurrentLevel(),
                stats.getTotalCaloriesBurned(),
                stats.getTreesEquivalent(),
                weeklyTrend,
                tripsByMode,
                recentBadges);
    }

    private int calculateBadgeProgress(Badge badge, User user, UserStats stats) {
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

    @Transactional(readOnly = true)
    public CommunityImpactDTO getCommunityImpact() {
        double totalCo2Kg = userStatsRepository.sumTotalCo2SavedKg();
        double totalKm = userStatsRepository.sumTotalDistanceKm();
        long totalTrips = userStatsRepository.sumTotalTrips();
        long activeUsers = userRepository.count();

        return new CommunityImpactDTO(
                totalCo2Kg / 1000.0,
                totalKm,
                totalTrips,
                activeUsers,
                totalCo2Kg / KG_OF_CO2_PER_TREE_PER_YEAR);
    }
}
