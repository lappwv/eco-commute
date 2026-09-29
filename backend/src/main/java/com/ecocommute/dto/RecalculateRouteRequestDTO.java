package com.ecocommute.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.PositiveOrZero;

public record RecalculateRouteRequestDTO(
        String tripId,

        @NotNull(message = "La latitud actual es obligatoria")
        @DecimalMin(value = "-90.0", message = "La latitud minima es -90")
        @DecimalMax(value = "90.0", message = "La latitud maxima es 90")
        Double currentLat,

        @NotNull(message = "La longitud actual es obligatoria")
        @DecimalMin(value = "-180.0", message = "La longitud minima es -180")
        @DecimalMax(value = "180.0", message = "La longitud maxima es 180")
        Double currentLng,

        @NotNull(message = "La latitud de destino es obligatoria")
        @DecimalMin(value = "-90.0", message = "La latitud minima es -90")
        @DecimalMax(value = "90.0", message = "La latitud maxima es 90")
        Double destinationLat,

        @NotNull(message = "La longitud de destino es obligatoria")
        @DecimalMin(value = "-180.0", message = "La longitud minima es -180")
        @DecimalMax(value = "180.0", message = "La longitud maxima es 180")
        Double destinationLng,

        @Pattern(regexp = "(?i)BICYCLE|WALKING|DRIVING|CAR", message = "El modo debe ser BICYCLE, WALKING o CAR")
        String vehicleMode,

        @PositiveOrZero(message = "El CO2 acumulado no puede ser negativo")
        Double accumulatedCo2SavedGrams,

        @PositiveOrZero(message = "La distancia acumulada no puede ser negativa")
        Double accumulatedDistanceKm
) {
}
