package com.ecocommute.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.util.HashMap;
import java.util.Map;

public record TelemetryTickRequest(
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
    public Map<String, Object> toMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("tripId", tripId);
        map.put("distanceIncrementMeters", distanceIncrementMeters);
        map.put("speedKmh", speedKmh);
        map.put("accumulatedCo2SavedGrams", accumulatedCo2SavedGrams);
        map.put("accumulatedDistanceKm", accumulatedDistanceKm);
        return map;
    }
}
