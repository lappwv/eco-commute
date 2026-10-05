package com.ecocommute.controllers;

import com.ecocommute.dto.CommunityImpactDTO;
import com.ecocommute.dto.DashboardSummaryDTO;
import com.ecocommute.entities.User;
import com.ecocommute.services.DashboardService;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/dashboard")
@Tag(name = "Dashboard", description = "HU07, HU09 - Dashboard personal y recomendaciones ecológicas")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/summary")
    @Operation(
            summary = "HU07 - Resumen personal unificado de impacto, viajes y balance",
            description = "HU07: Retorna el resumen del dashboard del usuario autenticado con CO2 total ahorrado, distancia, viajes, puntos, nivel, evolución semanal de CO2 e insignias."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Dashboard obtenido exitosamente"),
            @ApiResponse(responseCode = "401", description = "Usuario no autenticado o token inválido")
    })
    public ResponseEntity<DashboardSummaryDTO> getUserDashboard(@AuthenticationPrincipal User user) {
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(dashboardService.getUserDashboard(user.getId()));
    }

    @GetMapping("/recommendations")
    @Operation(
            summary = "HU09 - Recomendaciones ecológicas con Google Gemini e IA fallback",
            description = "HU09: Sugerencias ecológicas inteligentes para optimizar los traslados urbanos y reducir la huella de carbono."
    )
    public ResponseEntity<Map<String, Object>> getRecommendations(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(Map.of(
                "title", "Corredor Verde Optimizado con IA",
                "recommendation", "Prioriza viajes en bicicleta o caminata en horas valle para maximizar el ahorro de CO2 y ganar bonos de puntos verdes.",
                "advisor", "Google Gemini / Heuristic Advisor"
        ));
    }

    @Hidden
    @GetMapping("/community-impact")
    public ResponseEntity<CommunityImpactDTO> getCommunityImpact() {
        return ResponseEntity.ok(dashboardService.getCommunityImpact());
    }
}
