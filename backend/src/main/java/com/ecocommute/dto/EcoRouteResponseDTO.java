package com.ecocommute.dto;

import java.util.List;

public record EcoRouteResponseDTO(
        String tripId,
        double remainingDistanceMeters,
        int remainingDurationSeconds,
        double totalEstimatedCo2SavedGrams,
        List<List<Double>> polylineCoordinates,
        String currentInstruction,
        String turnDirection,
        String nextStreetName,
        double distanceToNextStepMeters
) {
}
