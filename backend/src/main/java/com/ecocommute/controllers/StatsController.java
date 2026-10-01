package com.ecocommute.controllers;

import com.ecocommute.dto.*;
import com.ecocommute.entities.User;
import com.ecocommute.services.StatsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/stats")
@Tag(name = "Estadisticas", description = "Metricas ambientales, equivalencias ecologicas, reportes y certificados (HU07)")
public class StatsController {

    private final StatsService statsService;

    public StatsController(StatsService statsService) {
        this.statsService = statsService;
    }

    @GetMapping("/me")
    @Operation(summary = "Obtiene las estadisticas avanzadas y equivalencias ecologicas del usuario autenticado")
    public ResponseEntity<UserStatsDetailDTO> getMyStats(@AuthenticationPrincipal User user) {
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(statsService.getUserStats(user.getId()));
    }

    @GetMapping("/breakdown")
    @Operation(summary = "Obtiene el desglose de impacto y distancia por modo de transporte")
    public ResponseEntity<List<TransportModeStatsDTO>> getMyModeBreakdown(@AuthenticationPrincipal User user) {
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(statsService.getTransportModeBreakdown(user.getId()));
    }

    @GetMapping("/certificate")
    @Operation(summary = "Genera el certificado oficial de movilidad sostenible del usuario autenticado")
    public ResponseEntity<EcoCertificateDTO> getMyCertificate(@AuthenticationPrincipal User user) {
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(statsService.generateCertificate(user.getId()));
    }

    @GetMapping("/report")
    @Operation(summary = "Genera un reporte integral de impacto ecologico, medallas y recomendaciones")
    public ResponseEntity<EcoImpactReportDTO> getMyImpactReport(@AuthenticationPrincipal User user) {
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(statsService.generateImpactReport(user.getId()));
    }

    @GetMapping("/summary")
    @Operation(summary = "Obtiene el resumen global de impacto comunitario")
    public ResponseEntity<CommunityImpactDTO> getCommunitySummary() {
        return ResponseEntity.ok(statsService.getCommunityImpact());
    }
}
