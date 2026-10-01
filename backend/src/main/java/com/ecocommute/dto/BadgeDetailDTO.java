package com.ecocommute.dto;

import java.time.LocalDateTime;

public record BadgeDetailDTO(
        Long id,
        String code,
        String title,
        String description,
        String iconUrl,
        String iconEmoji,
        int requiredPoints,
        double requiredCo2SavedKg,
        int requiredStreakDays,
        int requiredTrips,
        boolean unlocked,
        int progressPercentage,
        LocalDateTime awardedAt
) {
}
