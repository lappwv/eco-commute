package com.ecocommute.dto;

import com.ecocommute.entity.TransportMode;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

public record EmissionFactorRequest(
        @NotNull(message = "El medio de transporte es obligatorio")
        TransportMode transportMode,
        @PositiveOrZero(message = "El factor de emision no puede ser negativo")
        double gramsCo2PerKm,
        @NotBlank(message = "La descripcion es obligatoria")
        @Size(max = 255, message = "La descripcion no debe superar 255 caracteres")
        String description
) {
}
