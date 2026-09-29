package com.ecocommute.controllers;

import com.ecocommute.dto.EcoRouteRequestDTO;
import com.ecocommute.dto.EcoRouteResponseDTO;
import com.ecocommute.dto.RecalculateRouteRequestDTO;
import com.ecocommute.dto.RoutePlanRequestDTO;
import com.ecocommute.dto.RoutePlanResponseDTO;
import com.ecocommute.dto.TelemetryTickRequestDTO;
import com.ecocommute.dto.TelemetryTickResponseDTO;
import com.ecocommute.services.EcoRoutingService;
import com.ecocommute.services.RoutingEngineService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@Tag(name = "Rutas", description = "Planificacion de rutas sostenibles y telemetria")
public class RouteController {

    private static final int DEFAULT_STREAK_DAYS = 1;

    private final EcoRoutingService ecoRoutingService;
    private final RoutingEngineService routingEngineService;

    public RouteController(EcoRoutingService ecoRoutingService,
                           RoutingEngineService routingEngineService) {
        this.ecoRoutingService = ecoRoutingService;
        this.routingEngineService = routingEngineService;
    }

    @PostMapping("/routes/plan")
    @Operation(summary = "Compara rutas sostenibles y recomienda una alternativa optimizada")
    public ResponseEntity<RoutePlanResponseDTO> planRoutes(@Valid @RequestBody RoutePlanRequestDTO request) {
        return ResponseEntity.ok(routingEngineService.planRoutes(request, DEFAULT_STREAK_DAYS));
    }

    @PostMapping("/routes/eco-route")
    @Operation(summary = "Genera la primera ruta ecologica para seguimiento en vivo")
    public ResponseEntity<EcoRouteResponseDTO> getInitialEcoRoute(@Valid @RequestBody EcoRouteRequestDTO request) {
        return ResponseEntity.ok(ecoRoutingService.calculateInitialEcoRoute(request));
    }

    @PostMapping("/routes/recalculate")
    @Operation(summary = "Recalcula una ruta ecologica desde la ubicacion actual")
    public ResponseEntity<EcoRouteResponseDTO> recalculateRoute(@Valid @RequestBody RecalculateRouteRequestDTO request) {
        return ResponseEntity.ok(ecoRoutingService.recalculateRoute(request));
    }

    @PostMapping("/telemetry/tick")
    @Operation(summary = "Registra un punto de telemetria del viaje en curso")
    public ResponseEntity<TelemetryTickResponseDTO> recordTelemetryTick(@Valid @RequestBody TelemetryTickRequestDTO request) {
        return ResponseEntity.ok(ecoRoutingService.processTelemetryTick(request));
    }
}
