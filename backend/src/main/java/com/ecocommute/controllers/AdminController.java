package com.ecocommute.controllers;

import com.ecocommute.dto.ChallengeRequestDTO;
import com.ecocommute.dto.RewardRequestDTO;
import com.ecocommute.entities.Challenge;
import com.ecocommute.entities.Reward;
import com.ecocommute.services.AdminService;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
@Tag(name = "Administración", description = "HU12, HU13 - Gestión administrativa de recompensas y retos")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @Hidden
    @GetMapping("/rewards")
    public ResponseEntity<List<Reward>> getRewards() {
        return ResponseEntity.ok(adminService.getRewards());
    }

    @PostMapping("/rewards")
    @Operation(summary = "HU12 - Creación de recompensas en catálogo protegida por rol (ADMIN)")
    public ResponseEntity<Reward> createReward(@Valid @RequestBody RewardRequestDTO request) {
        return ResponseEntity.ok(adminService.createReward(request));
    }

    @PutMapping("/rewards/{id}")
    @Operation(summary = "HU12 - Actualización de stock o condiciones de recompensa para administrador (ADMIN)")
    public ResponseEntity<Reward> updateReward(@PathVariable Long id, @Valid @RequestBody RewardRequestDTO request) {
        return ResponseEntity.ok(adminService.updateReward(id, request));
    }

    @Hidden
    @DeleteMapping("/rewards/{id}")
    public ResponseEntity<Void> deleteReward(@PathVariable Long id) {
        adminService.deleteReward(id);
        return ResponseEntity.noContent().build();
    }

    @Hidden
    @GetMapping("/challenges")
    public ResponseEntity<List<Challenge>> getChallenges() {
        return ResponseEntity.ok(adminService.getChallenges());
    }

    @PostMapping("/challenges")
    @Operation(summary = "HU13 - Creación de nuevo reto comunitario de reducción de CO2 protegida por rol (ADMIN)")
    public ResponseEntity<Challenge> createChallenge(@Valid @RequestBody ChallengeRequestDTO request) {
        return ResponseEntity.ok(adminService.createChallenge(request));
    }

    @Hidden
    @PutMapping("/challenges/{id}")
    public ResponseEntity<Challenge> updateChallenge(@PathVariable Long id, @Valid @RequestBody ChallengeRequestDTO request) {
        return ResponseEntity.ok(adminService.updateChallenge(id, request));
    }

    @Hidden
    @DeleteMapping("/challenges/{id}")
    public ResponseEntity<Void> deleteChallenge(@PathVariable Long id) {
        adminService.deleteChallenge(id);
        return ResponseEntity.noContent().build();
    }
}
