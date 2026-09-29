package com.ecocommute.dto;

import com.ecocommute.entities.Role;
import com.ecocommute.entities.User;

import java.time.LocalDateTime;

public record AdminUserResponseDTO(
        String id,
        String email,
        String fullName,
        String avatarUrl,
        String district,
        Role role,
        boolean active,
        int currentPoints,
        int currentLevel,
        boolean hasBicycle,
        int maxWalkingMinutes,
        LocalDateTime createdAt
) {
    public static AdminUserResponseDTO fromEntity(User user) {
        return new AdminUserResponseDTO(user.getId(), user.getEmail(), user.getFullName(), user.getAvatarUrl(),
                user.getDistrict(), user.getRole(), user.isActive(), user.getCurrentPoints(), user.getCurrentLevel(),
                user.isHasBicycle(), user.getMaxWalkingMinutes(), user.getCreatedAt());
    }
}
