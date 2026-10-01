package com.ecocommute.dto;

import java.time.LocalDateTime;
import java.util.List;

public record EcoImpactReportDTO(
        String userId,
        String fullName,
        String district,
        LocalDateTime generatedAt,
        UserStatsDetailDTO lifetimeStats,
        List<TransportModeStatsDTO> transportBreakdown,
        int totalBadgesEarned,
        int totalBadgesAvailable,
        double badgeCompletionPercentage,
        List<BadgeAwardDTO> recentBadges,
        String ecoRecommendation
) {
}
