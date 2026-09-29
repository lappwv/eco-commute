package com.ecocommute.controllers;

import com.ecocommute.dto.EcoRouteRequestDTO;
import com.ecocommute.dto.RecalculateRouteRequestDTO;
import com.ecocommute.dto.RoutePlanRequestDTO;
import com.ecocommute.dto.TelemetryTickRequestDTO;
import com.ecocommute.services.EcoRoutingService;
import com.ecocommute.services.RoutingEngineService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@Tag(name = "Rutas", description = "Planificacion de rutas sostenibles y telemetria")
public class RouteController {

    private final EcoRoutingService ecoRoutingService;
    private final RoutingEngineService routingEngineService;

    public RouteController(EcoRoutingService ecoRoutingService,
                           RoutingEngineService routingEngineService) {
        this.ecoRoutingService = ecoRoutingService;
        this.routingEngineService = routingEngineService;
    }

    @PostMapping("/routes/plan")
    @Operation(summary = "Compara rutas sostenibles y recomienda una alternativa optimizada")
    public ResponseEntity<Map<String, Object>> planRoutes(@Valid @RequestBody RoutePlanRequestDTO request) {
        return ResponseEntity.ok(routingEngineService.planRoutes(request.toMap(), 1));
    }

    @PostMapping("/routes/eco-route")
    @Operation(summary = "Genera la primera ruta ecologica para seguimiento en vivo")
    public ResponseEntity<Map<String, Object>> getInitialEcoRoute(@Valid @RequestBody EcoRouteRequestDTO request) {
        return ResponseEntity.ok(ecoRoutingService.calculateInitialEcoRoute(request.toMap()));
    }

    @PostMapping("/routes/recalculate")
    @Operation(summary = "Recalcula una ruta ecologica desde la ubicacion actual")
    public ResponseEntity<Map<String, Object>> recalculateRoute(@Valid @RequestBody RecalculateRouteRequestDTO request) {
        return ResponseEntity.ok(ecoRoutingService.recalculateRoute(request.toMap()));
    }

    @PostMapping("/telemetry/tick")
    @Operation(summary = "Registra un punto de telemetria del viaje en curso")
    public ResponseEntity<Map<String, Object>> recordTelemetryTick(@Valid @RequestBody TelemetryTickRequestDTO request) {
        return ResponseEntity.ok(ecoRoutingService.processTelemetryTick(request.toMap()));
    }
}
