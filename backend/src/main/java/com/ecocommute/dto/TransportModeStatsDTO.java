package com.ecocommute.dto;

import com.ecocommute.entities.TransportMode;

public record TransportModeStatsDTO(
        TransportMode transportMode,
        String displayName,
        long tripsCount,
        double totalDistanceKm,
        double totalCo2SavedKg,
        int totalCaloriesBurned
) {
}
