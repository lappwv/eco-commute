package com.ecocommute.controller;

import com.ecocommute.dto.GoogleLoginRequest;
import com.ecocommute.dto.LoginRequest;
import com.ecocommute.dto.RegisterRequest;
import com.ecocommute.entity.User;
import com.ecocommute.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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
    public ResponseEntity<Map<String, Object>> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/auth/login")
    @Operation(summary = "Inicia sesion con correo y contrasena")
    public ResponseEntity<Map<String, Object>> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/auth/google")
    @Operation(summary = "Inicia sesion con Google")
    public ResponseEntity<Map<String, Object>> googleLogin(@Valid @RequestBody GoogleLoginRequest request) {
        return ResponseEntity.ok(authService.googleLogin(request));
    }

    @GetMapping("/users/profile/{userId}")
    @Operation(summary = "Obtiene el perfil publico de un usuario")
    public ResponseEntity<Map<String, Object>> getProfile(@PathVariable String userId) {
        return ResponseEntity.ok(authService.getProfile(userId));
    }

    @GetMapping("/users/me")
    @Operation(summary = "Obtiene el perfil del usuario autenticado")
    public ResponseEntity<Map<String, Object>> getMyProfile(@AuthenticationPrincipal User user) {
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(authService.getProfile(user.getId()));
    }
}
