package com.ecocommute.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record ChallengeRequestDTO(
        @NotBlank(message = "El titulo es obligatorio")
        @Size(max = 120, message = "El titulo no debe superar 120 caracteres")
        String title,
        @Size(max = 255, message = "La descripcion no debe superar 255 caracteres")
        String description,
        @PositiveOrZero(message = "La meta no puede ser negativa")
        int goalValue,
        @Size(max = 32, message = "La unidad de la meta no debe superar 32 caracteres")
        String goalUnit,
        @NotNull(message = "El inicio del periodo es obligatorio")
        LocalDate periodStart,
        @NotNull(message = "El fin del periodo es obligatorio")
        LocalDate periodEnd,
        boolean active
) {
}
