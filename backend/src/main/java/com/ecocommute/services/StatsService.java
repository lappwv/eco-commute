package com.ecocommute.services;

import com.ecocommute.dto.CommunityImpactDTO;
import com.ecocommute.dto.TransportModeStatsDTO;
import com.ecocommute.dto.UserStatsDetailDTO;
import com.ecocommute.entities.TransportMode;
import com.ecocommute.entities.Trip;
import com.ecocommute.entities.User;
import com.ecocommute.entities.UserStats;
import com.ecocommute.repositories.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class StatsService {

    private final UserRepository userRepository;
    private final UserStatsRepository userStatsRepository;
    private final TripRepository tripRepository;
    private final UserBadgeRepository userBadgeRepository;
    private final BadgeRepository badgeRepository;
    private final DashboardService dashboardService;

    public StatsService(UserRepository userRepository,
                        UserStatsRepository userStatsRepository,
                        TripRepository tripRepository,
                        UserBadgeRepository userBadgeRepository,
                        BadgeRepository badgeRepository,
                        DashboardService dashboardService) {
        this.userRepository = userRepository;
        this.userStatsRepository = userStatsRepository;
        this.tripRepository = tripRepository;
        this.userBadgeRepository = userBadgeRepository;
        this.badgeRepository = badgeRepository;
        this.dashboardService = dashboardService;
    }

    @Transactional(readOnly = true)
    public UserStatsDetailDTO getUserStats(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        UserStats stats = userStatsRepository.findByUserId(userId)
                .orElseGet(() -> new UserStats(user));

        List<Trip> trips = tripRepository.findByUserIdOrderByCompletedAtDesc(userId);
        Map<String, Long> tripsByMode = trips.stream()
                .collect(Collectors.groupingBy(t -> t.getTransportMode().name(), Collectors.counting()));

        int unlockedBadgesCount = userBadgeRepository.findByUserId(userId).size();
        int totalBadgesCount = (int) badgeRepository.count();

        return new UserStatsDetailDTO(
                user.getId(),
                user.getFullName(),
                stats.getTotalCo2SavedKg(),
                stats.getTotalDistanceKm(),
                stats.getTotalTrips(),
                stats.getTotalCaloriesBurned(),
                stats.getTreesEquivalent(),
                stats.getGasolineLitersSaved(),
                stats.getKwhEquivalent(),
                stats.getEcoScore(),
                user.getCurrentPoints(),
                user.getCurrentLevel(),
                user.getStreakDays(),
                unlockedBadgesCount,
                totalBadgesCount,
                tripsByMode,
                stats.getUpdatedAt()
        );
    }

    @Transactional(readOnly = true)
    public List<TransportModeStatsDTO> getTransportModeBreakdown(String userId) {
        List<Trip> trips = tripRepository.findByUserIdOrderByCompletedAtDesc(userId);
        Map<TransportMode, List<Trip>> grouped = trips.stream()
                .filter(t -> t.getTransportMode() != null)
                .collect(Collectors.groupingBy(Trip::getTransportMode));

        return grouped.entrySet().stream()
                .map(entry -> {
                    TransportMode mode = entry.getKey();
                    List<Trip> modeTrips = entry.getValue();
                    long count = modeTrips.size();
                    double distanceKm = Math.round(modeTrips.stream().mapToDouble(Trip::getDistanceKm).sum() * 100.0) / 100.0;
                    double co2SavedKg = Math.round((modeTrips.stream().mapToDouble(Trip::getCo2SavedGrams).sum() / 1000.0) * 100.0) / 100.0;
                    int calories = modeTrips.stream().mapToInt(Trip::getCaloriesBurned).sum();
                    return new TransportModeStatsDTO(mode, mode.getDisplayName(), count, distanceKm, co2SavedKg, calories);
                })
                .sorted(Comparator.comparing(TransportModeStatsDTO::tripsCount).reversed())
                .toList();
    }

    @Transactional(readOnly = true)
    public CommunityImpactDTO getCommunityImpact() {
        return dashboardService.getCommunityImpact();
    }
}
