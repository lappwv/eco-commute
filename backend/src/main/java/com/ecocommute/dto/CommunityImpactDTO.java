package com.ecocommute.dto;

public record CommunityImpactDTO(
        double totalCo2SavedTons,
        double totalCleanKm,
        long totalTrips,
        long totalActiveUsers,
        double totalTreesEquivalent
) {
}
