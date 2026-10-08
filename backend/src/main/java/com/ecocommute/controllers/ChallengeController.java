package com.ecocommute.controllers;

import com.ecocommute.entities.Challenge;
import com.ecocommute.repositories.ChallengeRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/challenges")
@Tag(name = "Retos", description = "HU13 - Desafíos sostenibles y metas comunitarias")
public class ChallengeController {

    private final ChallengeRepository challengeRepository;

    public ChallengeController(ChallengeRepository challengeRepository) {
        this.challengeRepository = challengeRepository;
    }

    @GetMapping
    @Operation(summary = "HU13 - Listado de retos y desafíos comunitarios activos")
    public ResponseEntity<List<Challenge>> getActiveChallenges() {
        return ResponseEntity.ok(challengeRepository.findByActiveTrueOrderByPeriodStartDesc());
    }

    @GetMapping("/{id}")
    @Operation(summary = "HU13 - Detalle y porcentaje de avance de un reto colectivo")
    public ResponseEntity<Challenge> getChallengeById(@PathVariable Long id) {
        return challengeRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
