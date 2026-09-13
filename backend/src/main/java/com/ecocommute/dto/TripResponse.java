package com.ecocommute.dto;

import com.ecocommute.entity.TransportMode;
import com.ecocommute.entity.Trip;

import java.time.LocalDateTime;

public record TripResponse(
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
    public static TripResponse fromEntity(Trip trip) {
        TransportMode mode = trip.getTransportMode();
        return new TripResponse(
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
                trip.getCompletedAt()
        );
    }
}
