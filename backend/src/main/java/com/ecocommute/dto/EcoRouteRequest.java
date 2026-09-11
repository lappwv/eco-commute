package com.ecocommute.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.util.HashMap;
import java.util.Map;

public record EcoRouteRequest(
        @NotNull(message = "La latitud de origen es obligatoria")
        @DecimalMin(value = "-90.0", message = "La latitud minima es -90")
        @DecimalMax(value = "90.0", message = "La latitud maxima es 90")
        Double originLat,

        @NotNull(message = "La longitud de origen es obligatoria")
        @DecimalMin(value = "-180.0", message = "La longitud minima es -180")
        @DecimalMax(value = "180.0", message = "La longitud maxima es 180")
        Double originLng,

        @NotNull(message = "La latitud de destino es obligatoria")
        @DecimalMin(value = "-90.0", message = "La latitud minima es -90")
        @DecimalMax(value = "90.0", message = "La latitud maxima es 90")
        Double destinationLat,

        @NotNull(message = "La longitud de destino es obligatoria")
        @DecimalMin(value = "-180.0", message = "La longitud minima es -180")
        @DecimalMax(value = "180.0", message = "La longitud maxima es 180")
        Double destinationLng,

        @Pattern(regexp = "(?i)BICYCLE|WALKING|DRIVING|CAR", message = "El modo debe ser BICYCLE, WALKING o CAR")
        String vehicleMode
) {
    public Map<String, Object> toMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("originLat", originLat);
        map.put("originLng", originLng);
        map.put("destinationLat", destinationLat);
        map.put("destinationLng", destinationLng);
        map.put("vehicleMode", vehicleMode);
        return map;
    }
}
