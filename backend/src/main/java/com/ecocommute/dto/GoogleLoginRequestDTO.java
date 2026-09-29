package com.ecocommute.dto;

import jakarta.validation.constraints.NotBlank;

public record GoogleLoginRequestDTO(
        @NotBlank(message = "El token de Google es obligatorio")
        String idToken
) {
}
