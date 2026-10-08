package com.ecocommute.controllers;

import com.ecocommute.dto.LeaderboardEntryDTO;
import com.ecocommute.services.LeaderboardService;
import io.swagger.v3.oas.annotations.Hidden;
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

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/leaderboard")
@Tag(name = "Leaderboard", description = "HU08 - Ranking y clasificacion de usuarios por distrito y metropolitano")
public class LeaderboardController {

    private final LeaderboardService leaderboardService;

    public LeaderboardController(LeaderboardService leaderboardService) {
        this.leaderboardService = leaderboardService;
    }

    @Hidden
    @GetMapping
    public ResponseEntity<List<LeaderboardEntryDTO>> getLeaderboard(
            @RequestParam(required = false) String district,
            @RequestParam(required = false, defaultValue = "co2") String sortBy) {
        return ResponseEntity.ok(leaderboardService.getLeaderboardByDistrict(district, sortBy));
    }

    @GetMapping("/districts")
    @Operation(summary = "HU08 - Ranking distrital con métricas de emisiones",
            description = "HU08: Retorna el ranking de usuarios agrupado y clasificado por distritos de Lima Metropolitana.")
    public ResponseEntity<List<LeaderboardEntryDTO>> getDistrictRanking() {
        return ResponseEntity.ok(leaderboardService.getLeaderboard("co2"));
    }

    @GetMapping("/districts/summary")
    @Operation(summary = "HU08 - Resumen consolidado de métricas distritales y vecinos activos",
            description = "HU08: Retorna el resumen distrital de distritos activos y su participación.")
    public ResponseEntity<Map<String, Object>> getDistrictsSummary() {
        List<String> districts = leaderboardService.getDistricts();
        List<LeaderboardEntryDTO> leaders = leaderboardService.getLeaderboard("co2");
        Map<String, Object> summary = new HashMap<>();
        summary.put("activeDistrictsCount", districts.size());
        summary.put("activeDistricts", districts);
        summary.put("totalRankedUsers", leaders.size());
        return ResponseEntity.ok(summary);
    }

    @GetMapping("/users")
    @Operation(summary = "HU06, HU08 - Tabla de posiciones de usuarios por puntos acumulados",
            description = "HU06, HU08: Retorna la clasificación general de usuarios ordenada por puntos verdes acumulados.")
    public ResponseEntity<List<LeaderboardEntryDTO>> getUsersRanking() {
        return ResponseEntity.ok(leaderboardService.getLeaderboard("points"));
    }
}
