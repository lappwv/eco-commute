package com.ecocommute.controllers;

import com.ecocommute.dto.AuthResponseDTO;
import com.ecocommute.dto.LoginRequestDTO;
import com.ecocommute.dto.RegisterRequestDTO;
import com.ecocommute.dto.UserProfileDTO;
import com.ecocommute.entities.User;
import com.ecocommute.services.AuthService;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@Tag(name = "Autenticación", description = "HU01, HU02 - Registro e inicio de sesión seguro con JWT")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/auth/register")
    @Operation(summary = "HU01 - Registro de nuevos usuarios con contraseña cifrada en BCrypt",
            description = "Crea la cuenta con contraseña encriptada (BCrypt) y devuelve un JWT.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Usuario registrado, sesión iniciada con JWT"),
            @ApiResponse(responseCode = "400", description = "Datos inválidos o contraseña que no cumple las reglas"),
            @ApiResponse(responseCode = "409", description = "El correo ya se encuentra registrado")
    })
    public ResponseEntity<AuthResponseDTO> register(@Valid @RequestBody RegisterRequestDTO request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/auth/login")
    @Operation(summary = "HU02 - Autenticación y generación de token JWT Bearer (HMAC-SHA256)",
            description = "Valida credenciales con BCrypt y devuelve un JWT con vigencia de 24 horas.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Credenciales válidas, devuelve JWT"),
            @ApiResponse(responseCode = "400", description = "Cuerpo o campos con formato inválido"),
            @ApiResponse(responseCode = "401", description = "Credenciales inválidas (correo no existe o contraseña incorrecta)")
    })
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody LoginRequestDTO request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @Hidden
    @GetMapping("/users/me")
    public ResponseEntity<UserProfileDTO> getMyProfile(@AuthenticationPrincipal User user) {
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(authService.getProfile(user.getId()));
    }
}
