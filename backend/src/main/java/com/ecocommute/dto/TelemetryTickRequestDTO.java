package com.ecocommute.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record TelemetryTickRequestDTO(
        String tripId,

        @NotNull(message = "El incremento de distancia es obligatorio")
        @PositiveOrZero(message = "El incremento de distancia no puede ser negativo")
        Double distanceIncrementMeters,

        @NotNull(message = "La velocidad es obligatoria")
        @PositiveOrZero(message = "La velocidad no puede ser negativa")
        Double speedKmh,

        @PositiveOrZero(message = "El CO2 acumulado no puede ser negativo")
        Double accumulatedCo2SavedGrams,

        @PositiveOrZero(message = "La distancia acumulada no puede ser negativa")
        Double accumulatedDistanceKm
) {
}
