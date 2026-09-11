package com.ecocommute.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.util.HashMap;
import java.util.Map;

public record RoutePlanRequest(
        @Valid
        @NotNull(message = "El origen es obligatorio")
        CoordinateRequest origin,

        @Valid
        @NotNull(message = "El destino es obligatorio")
        CoordinateRequest destination,

        @Pattern(regexp = "(?i)BICYCLE|WALKING|WALK|DRIVING|CAR", message = "El perfil debe ser BICYCLE, WALKING o CAR")
        String selectedProfile,

        Boolean enableAiOptimization
) {
    public Map<String, Object> toMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("origin", origin.toMap());
        map.put("destination", destination.toMap());
        map.put("selectedProfile", selectedProfile);
        map.put("enableAiOptimization", enableAiOptimization);
        return map;
    }
}
