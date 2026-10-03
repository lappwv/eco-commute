package com.ecocommute.controllers;

import com.ecocommute.dto.ChallengeRequestDTO;
import com.ecocommute.dto.RewardRequestDTO;
import com.ecocommute.entities.Challenge;
import com.ecocommute.entities.Reward;
import com.ecocommute.services.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/rewards")
    public ResponseEntity<List<Reward>> getRewards() {
        return ResponseEntity.ok(adminService.getRewards());
    }

    @PostMapping("/rewards")
    public ResponseEntity<Reward> createReward(@Valid @RequestBody RewardRequestDTO request) {
        return ResponseEntity.ok(adminService.createReward(request));
    }

    @PutMapping("/rewards/{id}")
    public ResponseEntity<Reward> updateReward(@PathVariable Long id, @Valid @RequestBody RewardRequestDTO request) {
        return ResponseEntity.ok(adminService.updateReward(id, request));
    }

    @DeleteMapping("/rewards/{id}")
    public ResponseEntity<Void> deleteReward(@PathVariable Long id) {
        adminService.deleteReward(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/challenges")
    public ResponseEntity<List<Challenge>> getChallenges() {
        return ResponseEntity.ok(adminService.getChallenges());
    }

    @PostMapping("/challenges")
    public ResponseEntity<Challenge> createChallenge(@Valid @RequestBody ChallengeRequestDTO request) {
        return ResponseEntity.ok(adminService.createChallenge(request));
    }

    @PutMapping("/challenges/{id}")
    public ResponseEntity<Challenge> updateChallenge(@PathVariable Long id, @Valid @RequestBody ChallengeRequestDTO request) {
        return ResponseEntity.ok(adminService.updateChallenge(id, request));
    }

    @DeleteMapping("/challenges/{id}")
    public ResponseEntity<Void> deleteChallenge(@PathVariable Long id) {
        adminService.deleteChallenge(id);
        return ResponseEntity.noContent().build();
    }
}
