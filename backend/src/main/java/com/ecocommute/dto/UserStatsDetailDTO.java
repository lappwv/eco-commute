package com.ecocommute.dto;

import java.time.LocalDateTime;
import java.util.Map;

public record UserStatsDetailDTO(
        String userId,
        String fullName,
        double totalCo2SavedKg,
        double totalDistanceKm,
        int totalTrips,
        int totalCaloriesBurned,
        double treesEquivalent,
        double gasolineLitersSaved,
        double kwhEquivalent,
        int ecoScore,
        int currentPoints,
        int currentLevel,
        int streakDays,
        int unlockedBadgesCount,
        int totalBadgesCount,
        Map<String, Long> tripsByTransportMode,
        LocalDateTime lastUpdated
) {
}
