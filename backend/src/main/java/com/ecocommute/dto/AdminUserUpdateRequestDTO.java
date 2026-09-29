package com.ecocommute.dto;

import com.ecocommute.entities.Role;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AdminUserUpdateRequestDTO(
        @NotBlank(message = "El nombre completo es obligatorio")
        @Size(max = 120, message = "El nombre completo no debe superar 120 caracteres")
        String fullName,
        @Size(max = 80, message = "El distrito no debe superar 80 caracteres")
        String district,
        @NotNull(message = "El rol es obligatorio")
        Role role,
        boolean active,
        boolean hasBicycle,
        @Min(value = 5, message = "El tiempo maximo de caminata debe ser al menos 5 minutos")
        @Max(value = 120, message = "El tiempo maximo de caminata no debe superar 120 minutos")
        int maxWalkingMinutes
) {
}
