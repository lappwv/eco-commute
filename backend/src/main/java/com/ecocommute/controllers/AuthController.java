package com.ecocommute.controllers;

import com.ecocommute.dto.AuthResponseDTO;
import com.ecocommute.dto.GoogleLoginRequestDTO;
import com.ecocommute.dto.LoginRequestDTO;
import com.ecocommute.dto.RegisterRequestDTO;
import com.ecocommute.dto.UserProfileDTO;
import com.ecocommute.entities.User;
import com.ecocommute.services.AuthService;
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
@Tag(name = "Autenticacion", description = "Registro, inicio de sesion y perfil del usuario")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/auth/register")
    @Operation(summary = "Registra un usuario EcoCommute (HU01)",
            description = "Crea la cuenta con contrasena encriptada (BCrypt) y devuelve un JWT. "
                    + "El correo debe ser unico y la contrasena al menos 8 caracteres con letra y numero.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Usuario registrado, sesion iniciada con JWT"),
            @ApiResponse(responseCode = "400", description = "Datos invalidos o contrasena que no cumple las reglas"),
            @ApiResponse(responseCode = "409", description = "El correo ya se encuentra registrado")
    })
    public ResponseEntity<AuthResponseDTO> register(@Valid @RequestBody RegisterRequestDTO request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/auth/login")
    @Operation(summary = "Inicia sesion con correo y contrasena (HU02)",
            description = "Valida credenciales con BCrypt y devuelve un JWT con vigencia de 24 horas.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Credenciales validas, devuelve JWT"),
            @ApiResponse(responseCode = "400", description = "Cuerpo o campos con formato invalido"),
            @ApiResponse(responseCode = "401", description = "Credenciales invalidas (correo no existe o contrasena incorrecta)")
    })
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody LoginRequestDTO request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/auth/google")
    @Operation(summary = "Inicia sesion con Google")
    public ResponseEntity<AuthResponseDTO> googleLogin(@Valid @RequestBody GoogleLoginRequestDTO request) {
        return ResponseEntity.ok(authService.googleLogin(request));
    }

    @GetMapping("/users/profile/{userId}")
    @Operation(summary = "Obtiene el perfil publico de un usuario")
    public ResponseEntity<UserProfileDTO> getProfile(@PathVariable String userId) {
        return ResponseEntity.ok(authService.getProfile(userId));
    }

    @GetMapping("/users/me")
    @Operation(summary = "Obtiene el perfil del usuario autenticado")
    public ResponseEntity<UserProfileDTO> getMyProfile(@AuthenticationPrincipal User user) {
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(authService.getProfile(user.getId()));
    }
}
