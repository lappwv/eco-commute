package com.ecocommute.dto;

import com.ecocommute.entities.TransportMode;
import com.ecocommute.entities.Trip;

import java.time.LocalDateTime;
import java.util.List;

public record TripResponseDTO(
        String id,
        TransportMode transportMode,
        String modeDisplayName,
        String originName,
        double originLat,
        double originLng,
        String destinationName,
        double destinationLat,
        double destinationLng,
        double distanceKm,
        int durationMinutes,
        double baselineCo2Grams,
        double co2EmittedGrams,
        double co2SavedGrams,
        int caloriesBurned,
        int pointsEarned,
        boolean suspicious,
        String suspiciousReason,
        LocalDateTime completedAt,
        List<BadgeAwardDTO> newlyAwardedBadges
) {
    public TripResponseDTO(
            String id,
            TransportMode transportMode,
            String modeDisplayName,
            String originName,
            double originLat,
            double originLng,
            String destinationName,
            double destinationLat,
            double destinationLng,
            double distanceKm,
            int durationMinutes,
            double baselineCo2Grams,
            double co2EmittedGrams,
            double co2SavedGrams,
            int caloriesBurned,
            int pointsEarned,
            boolean suspicious,
            String suspiciousReason,
            LocalDateTime completedAt
    ) {
        this(id, transportMode, modeDisplayName, originName, originLat, originLng,
                destinationName, destinationLat, destinationLng, distanceKm, durationMinutes,
                baselineCo2Grams, co2EmittedGrams, co2SavedGrams, caloriesBurned, pointsEarned,
                suspicious, suspiciousReason, completedAt, List.of());
    }

    public static TripResponseDTO fromEntity(Trip trip) {
        TransportMode mode = trip.getTransportMode();
        return new TripResponseDTO(
                trip.getId(),
                mode,
                mode != null ? mode.getDisplayName() : null,
                trip.getOriginName(),
                trip.getOriginLat(),
                trip.getOriginLng(),
                trip.getDestinationName(),
                trip.getDestinationLat(),
                trip.getDestinationLng(),
                trip.getDistanceKm(),
                trip.getDurationMinutes(),
                trip.getBaselineCo2Grams(),
                trip.getCo2EmittedGrams(),
                trip.getCo2SavedGrams(),
                trip.getCaloriesBurned(),
                trip.getPointsEarned(),
                trip.isSuspicious(),
                trip.getSuspiciousReason(),
                trip.getCompletedAt(),
                trip.getNewlyAwardedBadges() != null ? trip.getNewlyAwardedBadges() : List.of()
        );
    }
}
