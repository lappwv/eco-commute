package com.ecocommute.dto;

public record DashboardBadgeDTO(
        Long id,
        String code,
        String title,
        String description,
        String iconEmoji,
        boolean unlocked,
        int progressPercent
) {
}
