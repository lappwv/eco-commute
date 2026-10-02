package com.ecocommute.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Map;

@RestController
public class HealthController {

    @GetMapping("/health")
    public Map<String, Object> health() {
        return Map.of(
                "status", "UP",
                "service", "ecocommute-backend",
                "timestamp", Instant.now().toString());
    }

    @GetMapping("/")
    public Map<String, Object> root() {
        return Map.of(
                "service", "EcoCommute API",
                "description", "Backend de movilidad urbana sostenible: rutas eco, CO2 ahorrado, gamificacion y recompensas.",
                "status", "UP",
                "health", "/health",
                "swagger", "/swagger-ui.html",
                "apiDocs", "/v3/api-docs",
                "timestamp", Instant.now().toString());
    }
}
