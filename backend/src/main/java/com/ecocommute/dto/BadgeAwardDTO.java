package com.ecocommute.dto;

public record BadgeAwardDTO(
        Long id,
        String code,
        String title,
        String description,
        String iconEmoji,
        String awardedAt
) {
}
