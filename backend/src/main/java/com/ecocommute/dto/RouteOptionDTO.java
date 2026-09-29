package com.ecocommute.dto;

import com.ecocommute.entities.TransportMode;

import java.util.List;

public record RouteOptionDTO(
        String id,
        String title,
        TransportMode mode,
        String modeDisplayName,
        double distanceKm,
        int durationMinutes,
        long co2EmittedGrams,
        long co2SavedGrams,
        int potentialPoints,
        int caloriesBurned,
        boolean isAiRecommended,
        AiInsightDTO aiInsight,
        List<List<Double>> pathCoordinates,
        String summary
) {
}
