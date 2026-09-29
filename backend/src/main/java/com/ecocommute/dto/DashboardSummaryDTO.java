package com.ecocommute.dto;

import java.util.List;
import java.util.Map;

public record DashboardSummaryDTO(
        String userId,
        String fullName,
        String email,
        String avatarUrl,
        double totalCo2SavedKg,
        double totalDistanceKm,
        int totalTrips,
        int currentPoints,
        int currentLevel,
        int totalCaloriesBurned,
        double treesEquivalent,
        List<WeeklyTrendPointDTO> weeklyTrend,
        Map<String, Long> tripsByMode,
        List<DashboardBadgeDTO> recentBadges
) {
}
