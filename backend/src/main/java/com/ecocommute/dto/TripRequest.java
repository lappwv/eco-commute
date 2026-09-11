package com.ecocommute.dto;

import com.ecocommute.entity.TransportMode;
import com.ecocommute.entity.Trip;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public record TripRequest(
        @NotNull(message = "El medio de transporte es obligatorio")
        TransportMode transportMode,

        @NotBlank(message = "El nombre del origen es obligatorio")
        @Size(max = 150, message = "El origen no debe superar 150 caracteres")
        String originName,

        @DecimalMin(value = "-90.0", message = "La latitud minima es -90")
        @DecimalMax(value = "90.0", message = "La latitud maxima es 90")
        double originLat,

        @DecimalMin(value = "-180.0", message = "La longitud minima es -180")
        @DecimalMax(value = "180.0", message = "La longitud maxima es 180")
        double originLng,

        @NotBlank(message = "El nombre del destino es obligatorio")
        @Size(max = 150, message = "El destino no debe superar 150 caracteres")
        String destinationName,

        @DecimalMin(value = "-90.0", message = "La latitud minima es -90")
        @DecimalMax(value = "90.0", message = "La latitud maxima es 90")
        double destinationLat,

        @DecimalMin(value = "-180.0", message = "La longitud minima es -180")
        @DecimalMax(value = "180.0", message = "La longitud maxima es 180")
        double destinationLng,

        @Positive(message = "La distancia debe ser mayor a cero")
        double distanceKm,

        @Positive(message = "La duracion debe ser mayor a cero")
        int durationMinutes
) {
    public Trip toEntity() {
        Trip trip = new Trip();
        trip.setTransportMode(transportMode);
        trip.setOriginName(originName);
        trip.setOriginLat(originLat);
        trip.setOriginLng(originLng);
        trip.setDestinationName(destinationName);
        trip.setDestinationLat(destinationLat);
        trip.setDestinationLng(destinationLng);
        trip.setDistanceKm(distanceKm);
        trip.setDurationMinutes(durationMinutes);
        return trip;
    }
}
