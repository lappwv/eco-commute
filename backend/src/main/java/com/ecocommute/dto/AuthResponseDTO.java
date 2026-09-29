package com.ecocommute.dto;

import com.ecocommute.entities.Role;

public record AuthResponseDTO(
        String token,
        String tokenType,
        String id,
        String email,
        String fullName,
        String avatarUrl,
        Role role,
        int currentPoints,
        int currentLevel,
        int streakDays
) {
}
