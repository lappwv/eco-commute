package com.ecocommute.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record RoutePlanRequestDTO(
        @Valid
        @NotNull(message = "El origen es obligatorio")
        CoordinateRequestDTO origin,

        @Valid
        @NotNull(message = "El destino es obligatorio")
        CoordinateRequestDTO destination,

        @Pattern(regexp = "(?i)BICYCLE|WALKING|WALK|DRIVING|CAR", message = "El perfil debe ser BICYCLE, WALKING o CAR")
        String selectedProfile,

        Boolean enableAiOptimization
) {
}
