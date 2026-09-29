package com.ecocommute.dto;

public record LeaderboardEntryDTO(
        String userId,
        String fullName,
        String avatarUrl,
        String district,
        double totalCo2SavedKg,
        int currentPoints,
        int tripsCount,
        int streakDays,
        int rank
) {
}
