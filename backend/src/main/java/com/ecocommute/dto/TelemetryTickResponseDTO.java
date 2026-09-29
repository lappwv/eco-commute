package com.ecocommute.dto;

public record TelemetryTickResponseDTO(
        String tripId,
        double deltaCo2SavedGrams,
        double totalCo2SavedGrams,
        double treesEquivalent,
        double totalDistanceKm,
        double currentSpeedKmh,
        int ecoPointsEarned,
        double nextManeuverDistanceMeters,
        String voiceAnnouncementText,
        String suggestedManeuver
) {
}
