package com.ecocommute.controllers;

import com.ecocommute.dto.CommunityImpactDTO;
import com.ecocommute.dto.DashboardSummaryDTO;
import com.ecocommute.entities.User;
import com.ecocommute.services.DashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/dashboard")
@Tag(name = "Dashboard", description = "HU07 - Dashboard personal y metricas comunitarias de impacto ambiental")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/summary")
    @Operation(
            summary = "HU07 - Estadisticas personales del usuario",
            description = "HU07: Retorna el resumen del dashboard del usuario autenticado con CO2 total ahorrado, distancia, viajes, puntos, nivel, evolucion semanal de CO2, distribucion de viajes por modo e insignias."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Dashboard obtenido exitosamente"),
            @ApiResponse(responseCode = "401", description = "Usuario no autenticado o token invalido")
    })
    public ResponseEntity<DashboardSummaryDTO> getUserDashboard(@AuthenticationPrincipal User user) {
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(dashboardService.getUserDashboard(user.getId()));
    }

    @GetMapping("/community-impact")
    @Operation(
            summary = "Impacto comunitario agregado",
            description = "Retorna metricas acumuladas de la comunidad: CO2 ahorrado en toneladas, km limpios, total de viajes, usuarios activos y arboles equivalentes."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Impacto comunitario obtenido exitosamente")
    })
    public ResponseEntity<CommunityImpactDTO> getCommunityImpact() {
        return ResponseEntity.ok(dashboardService.getCommunityImpact());
    }
}

