package com.ecocommute.dto;

public record WeeklyTrendPointDTO(
        String dayOfWeek,
        double co2SavedGrams
) {
}
