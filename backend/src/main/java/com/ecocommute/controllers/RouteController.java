package com.ecocommute.controllers;

import com.ecocommute.dto.RoutePlanRequestDTO;
import com.ecocommute.dto.RoutePlanResponseDTO;
import com.ecocommute.services.RoutingEngineService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@Tag(name = "Rutas", description = "Planificacion de rutas sostenibles")
public class RouteController {

    private static final int DEFAULT_STREAK_DAYS = 1;

    private final RoutingEngineService routingEngineService;

    public RouteController(RoutingEngineService routingEngineService) {
        this.routingEngineService = routingEngineService;
    }

    @PostMapping("/routes/plan")
    @Operation(summary = "Compara rutas sostenibles y recomienda una alternativa optimizada")
    public ResponseEntity<RoutePlanResponseDTO> planRoutes(@Valid @RequestBody RoutePlanRequestDTO request) {
        return ResponseEntity.ok(routingEngineService.planRoutes(request, DEFAULT_STREAK_DAYS));
    }
}
