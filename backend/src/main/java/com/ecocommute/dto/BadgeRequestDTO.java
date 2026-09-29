package com.ecocommute.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

public record BadgeRequestDTO(
        @NotBlank(message = "El codigo es obligatorio")
        @Size(max = 80, message = "El codigo no debe superar 80 caracteres")
        String code,
        @NotBlank(message = "El titulo es obligatorio")
        @Size(max = 120, message = "El titulo no debe superar 120 caracteres")
        String title,
        @Size(max = 255, message = "La descripcion no debe superar 255 caracteres")
        String description,
        @Size(max = 255, message = "La URL del icono no debe superar 255 caracteres")
        String iconUrl,
        @Size(max = 32, message = "El icono no debe superar 32 caracteres")
        String iconEmoji,
        @PositiveOrZero(message = "Los puntos requeridos no pueden ser negativos")
        int requiredPoints,
        @PositiveOrZero(message = "El CO2 requerido no puede ser negativo")
        double requiredCo2SavedKg,
        @PositiveOrZero(message = "La racha requerida no puede ser negativa")
        int requiredStreakDays,
        @PositiveOrZero(message = "Los viajes requeridos no pueden ser negativos")
        int requiredTrips
) {
}
