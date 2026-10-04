package com.ecocommute.controllers;

import com.ecocommute.dto.LeaderboardEntryDTO;
import com.ecocommute.services.LeaderboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/leaderboard")
@Tag(name = "Leaderboard", description = "HU08 - Ranking y clasificacion de usuarios por distrito y metropolitano")
public class LeaderboardController {

    private final LeaderboardService leaderboardService;

    public LeaderboardController(LeaderboardService leaderboardService) {
        this.leaderboardService = leaderboardService;
    }

    @GetMapping
    @Operation(
            summary = "HU08 - Consulta de ranking distrital o global",
            description = "HU08: Permite comparar el impacto ambiental entre usuarios, con filtro opcional por distrito y ordenamiento por CO2 ahorrado ('co2') o puntos acumulados ('points')."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Ranking obtenido exitosamente"),
            @ApiResponse(responseCode = "400", description = "Parametro de ordenamiento o nombre de distrito invalido")
    })
    public ResponseEntity<List<LeaderboardEntryDTO>> getLeaderboard(
            @Parameter(description = "Nombre del distrito para filtrar (ej. 'Miraflores', 'San Isidro')", example = "Miraflores")
            @RequestParam(required = false) String district,
            @Parameter(description = "Criterio de ordenamiento: 'co2' (por defecto) o 'points'", example = "co2")
            @RequestParam(required = false, defaultValue = "co2") String sortBy) {
        return ResponseEntity.ok(leaderboardService.getLeaderboardByDistrict(district, sortBy));
    }
}
