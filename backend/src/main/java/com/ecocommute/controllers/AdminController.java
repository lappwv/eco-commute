package com.ecocommute.controllers;

import com.ecocommute.dto.AdminKpisDTO;
import com.ecocommute.dto.AdminUserResponseDTO;
import com.ecocommute.dto.AdminUserUpdateRequestDTO;
import com.ecocommute.dto.BadgeRequestDTO;
import com.ecocommute.dto.ChallengeRequestDTO;
import com.ecocommute.dto.EmissionFactorRequestDTO;
import com.ecocommute.dto.RewardRequestDTO;
import com.ecocommute.entities.Badge;
import com.ecocommute.entities.Challenge;
import com.ecocommute.entities.EmissionFactor;
import com.ecocommute.entities.Reward;
import com.ecocommute.entities.Trip;
import com.ecocommute.entities.User;
import com.ecocommute.services.AdminService;
import org.springframework.data.domain.Page;
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

    @GetMapping("/dashboard/kpis")
    public ResponseEntity<AdminKpisDTO> getAdminKpis() {
        return ResponseEntity.ok(adminService.getAdminKpis());
    }

    @GetMapping("/users")
    public ResponseEntity<Page<AdminUserResponseDTO>> getUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "15") int size,
            @RequestParam(required = false) String search) {
        return ResponseEntity.ok(adminService.getUsers(page, size, search).map(AdminUserResponseDTO::fromEntity));
    }

    @PutMapping("/users/{userId}/toggle-status")
    public ResponseEntity<AdminUserResponseDTO> toggleUserStatus(@PathVariable String userId) {
        return ResponseEntity.ok(AdminUserResponseDTO.fromEntity(adminService.toggleUserStatus(userId)));
    }

    @PutMapping("/users/{userId}")
    public ResponseEntity<AdminUserResponseDTO> updateUser(
            @PathVariable String userId,
            @Valid @RequestBody AdminUserUpdateRequestDTO request) {
        return ResponseEntity.ok(AdminUserResponseDTO.fromEntity(adminService.updateUser(userId, request)));
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable String userId) {
        adminService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/trips/suspicious")
    public ResponseEntity<Page<Trip>> getSuspiciousTrips(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "15") int size) {
        return ResponseEntity.ok(adminService.getSuspiciousTrips(page, size));
    }

    @GetMapping("/settings/emission-factors")
    public ResponseEntity<List<EmissionFactor>> getEmissionFactors() {
        return ResponseEntity.ok(adminService.getEmissionFactors());
    }

    @PutMapping("/settings/emission-factors/{id}")
    public ResponseEntity<EmissionFactor> updateEmissionFactor(
            @PathVariable Long id,
            @Valid @RequestBody EmissionFactorRequestDTO request) {
        return ResponseEntity.ok(adminService.updateEmissionFactor(id, request));
    }

    @PostMapping("/settings/emission-factors")
    public ResponseEntity<EmissionFactor> createEmissionFactor(@Valid @RequestBody EmissionFactorRequestDTO request) {
        return ResponseEntity.ok(adminService.createEmissionFactor(request));
    }

    @DeleteMapping("/settings/emission-factors/{id}")
    public ResponseEntity<Void> deleteEmissionFactor(@PathVariable Long id) {
        adminService.deleteEmissionFactor(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/badges")
    public ResponseEntity<List<Badge>> getBadges() {
        return ResponseEntity.ok(adminService.getBadges());
    }

    @PostMapping("/badges")
    public ResponseEntity<Badge> createBadge(@Valid @RequestBody BadgeRequestDTO request) {
        return ResponseEntity.ok(adminService.createBadge(request));
    }

    @PutMapping("/badges/{id}")
    public ResponseEntity<Badge> updateBadge(@PathVariable Long id, @Valid @RequestBody BadgeRequestDTO request) {
        return ResponseEntity.ok(adminService.updateBadge(id, request));
    }

    @DeleteMapping("/badges/{id}")
    public ResponseEntity<Void> deleteBadge(@PathVariable Long id) {
        adminService.deleteBadge(id);
        return ResponseEntity.noContent().build();
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
