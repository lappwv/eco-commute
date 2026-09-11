package com.ecocommute.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

import java.util.Map;

public record CoordinateRequest(
        @NotNull(message = "La latitud es obligatoria")
        @DecimalMin(value = "-90.0", message = "La latitud minima es -90")
        @DecimalMax(value = "90.0", message = "La latitud maxima es 90")
        Double latitude,

        @NotNull(message = "La longitud es obligatoria")
        @DecimalMin(value = "-180.0", message = "La longitud minima es -180")
        @DecimalMax(value = "180.0", message = "La longitud maxima es 180")
        Double longitude
) {
    public Map<String, Object> toMap() {
        return Map.of("latitude", latitude, "longitude", longitude);
    }
}
