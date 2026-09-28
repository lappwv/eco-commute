package com.ecocommute.dto;

import com.ecocommute.entity.Role;
import com.ecocommute.entity.User;

import java.time.LocalDateTime;

public record AdminUserResponse(
        String id,
        String email,
        String fullName,
        String avatarUrl,
        Role role,
        boolean active,
        int currentPoints,
        int currentLevel,
        boolean hasBicycle,
        int maxWalkingMinutes,
        LocalDateTime createdAt
) {
    public static AdminUserResponse fromEntity(User user) {
        return new AdminUserResponse(user.getId(), user.getEmail(), user.getFullName(), user.getAvatarUrl(),
                user.getRole(), user.isActive(), user.getCurrentPoints(), user.getCurrentLevel(),
                user.isHasBicycle(), user.getMaxWalkingMinutes(), user.getCreatedAt());
    }
}
