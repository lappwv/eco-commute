package com.ecocommute.controllers;

import com.ecocommute.dto.AuthResponseDTO;
import com.ecocommute.dto.GoogleLoginRequestDTO;
import com.ecocommute.dto.LoginRequestDTO;
import com.ecocommute.dto.RegisterRequestDTO;
import com.ecocommute.dto.UserProfileDTO;
import com.ecocommute.entities.User;
import com.ecocommute.services.AuthService;
import io.swagger.v3.oas.annotations.Operation;
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
    @Operation(summary = "Registra un usuario EcoCommute")
    public ResponseEntity<AuthResponseDTO> register(@Valid @RequestBody RegisterRequestDTO request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/auth/login")
    @Operation(summary = "Inicia sesion con correo y contrasena")
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
