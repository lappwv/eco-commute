package com.ecocommute.dto;

import java.time.LocalDateTime;
import java.util.List;

public record EcoCertificateDTO(
        String certificateId,
        String verificationCode,
        LocalDateTime issuedAt,
        String holderName,
        String holderEmail,
        String district,
        int currentLevel,
        String levelTitle,
        int currentPoints,
        int streakDays,
        double totalCo2SavedKg,
        double treesPlantedEquivalent,
        double gasolineLitersAvoided,
        double kwhElectricEquivalent,
        int totalTrips,
        double totalDistanceKm,
        int totalCaloriesBurned,
        int ecoScore,
        List<BadgeAwardDTO> unlockedBadges,
        String summaryStatement
) {
}
