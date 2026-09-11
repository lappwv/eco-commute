package com.ecocommute.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank(message = "El correo es obligatorio")
        @Email(message = "El correo debe tener un formato valido")
        String email,

        @NotBlank(message = "La contrasena es obligatoria")
        @Size(min = 8, max = 72, message = "La contrasena debe tener entre 8 y 72 caracteres")
        String password,

        @NotBlank(message = "El nombre completo es obligatorio")
        @Size(max = 120, message = "El nombre completo no debe superar 120 caracteres")
        String fullName,

        Boolean hasBicycle,

        @Min(value = 5, message = "El tiempo maximo de caminata debe ser al menos 5 minutos")
        @Max(value = 120, message = "El tiempo maximo de caminata no debe superar 120 minutos")
        Integer maxWalkingMinutes
) {
}
