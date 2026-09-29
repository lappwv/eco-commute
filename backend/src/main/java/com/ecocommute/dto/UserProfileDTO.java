package com.ecocommute.dto;

import com.ecocommute.entities.Role;

import java.util.List;

public record UserProfileDTO(
        String id,
        String email,
        String fullName,
        String avatarUrl,
        Role role,
        int currentPoints,
        int currentLevel,
        int streakDays,
        boolean hasBicycle,
        int maxWalkingMinutes,
        double totalCo2SavedKg,
        double totalDistanceKm,
        int totalTrips,
        int totalCaloriesBurned,
        double treesEquivalent,
        List<BadgeAwardDTO> badges
) {
}
