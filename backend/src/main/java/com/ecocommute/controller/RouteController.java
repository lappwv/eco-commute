package com.ecocommute.controller;

import com.ecocommute.dto.EcoRouteRequest;
import com.ecocommute.dto.RecalculateRouteRequest;
import com.ecocommute.dto.RoutePlanRequest;
import com.ecocommute.dto.TelemetryTickRequest;
import com.ecocommute.service.EcoRoutingService;
import com.ecocommute.service.RoutingEngineService;
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
    public ResponseEntity<Map<String, Object>> planRoutes(@Valid @RequestBody RoutePlanRequest request) {
        return ResponseEntity.ok(routingEngineService.planRoutes(request.toMap(), 1));
    }

    @PostMapping("/routes/eco-route")
    @Operation(summary = "Genera la primera ruta ecologica para seguimiento en vivo")
    public ResponseEntity<Map<String, Object>> getInitialEcoRoute(@Valid @RequestBody EcoRouteRequest request) {
        return ResponseEntity.ok(ecoRoutingService.calculateInitialEcoRoute(request.toMap()));
    }

    @PostMapping("/routes/recalculate")
    @Operation(summary = "Recalcula una ruta ecologica desde la ubicacion actual")
    public ResponseEntity<Map<String, Object>> recalculateRoute(@Valid @RequestBody RecalculateRouteRequest request) {
        return ResponseEntity.ok(ecoRoutingService.recalculateRoute(request.toMap()));
    }

    @PostMapping("/telemetry/tick")
    @Operation(summary = "Registra un punto de telemetria del viaje en curso")
    public ResponseEntity<Map<String, Object>> recordTelemetryTick(@Valid @RequestBody TelemetryTickRequest request) {
        return ResponseEntity.ok(ecoRoutingService.processTelemetryTick(request.toMap()));
    }
}
