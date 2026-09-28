package com.ecocommute.controller;

import com.ecocommute.dto.AdminUserResponse;
import com.ecocommute.dto.AdminUserUpdateRequest;
import com.ecocommute.dto.BadgeRequest;
import com.ecocommute.dto.EmissionFactorRequest;
import com.ecocommute.entity.Badge;
import com.ecocommute.entity.EmissionFactor;
import com.ecocommute.entity.Trip;
import com.ecocommute.entity.User;
import com.ecocommute.service.AdminService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/dashboard/kpis")
    public ResponseEntity<Map<String, Object>> getAdminKpis() {
        return ResponseEntity.ok(adminService.getAdminKpis());
    }

    @GetMapping("/users")
    public ResponseEntity<Page<AdminUserResponse>> getUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "15") int size,
            @RequestParam(required = false) String search) {
        return ResponseEntity.ok(adminService.getUsers(page, size, search).map(AdminUserResponse::fromEntity));
    }

    @PutMapping("/users/{userId}/toggle-status")
    public ResponseEntity<AdminUserResponse> toggleUserStatus(@PathVariable String userId) {
        return ResponseEntity.ok(AdminUserResponse.fromEntity(adminService.toggleUserStatus(userId)));
    }

    @PutMapping("/users/{userId}")
    public ResponseEntity<AdminUserResponse> updateUser(
            @PathVariable String userId,
            @Valid @RequestBody AdminUserUpdateRequest request) {
        return ResponseEntity.ok(AdminUserResponse.fromEntity(adminService.updateUser(userId, request)));
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
            @Valid @RequestBody EmissionFactorRequest request) {
        return ResponseEntity.ok(adminService.updateEmissionFactor(id, request));
    }

    @PostMapping("/settings/emission-factors")
    public ResponseEntity<EmissionFactor> createEmissionFactor(@Valid @RequestBody EmissionFactorRequest request) {
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
    public ResponseEntity<Badge> createBadge(@Valid @RequestBody BadgeRequest request) {
        return ResponseEntity.ok(adminService.createBadge(request));
    }

    @PutMapping("/badges/{id}")
    public ResponseEntity<Badge> updateBadge(@PathVariable Long id, @Valid @RequestBody BadgeRequest request) {
        return ResponseEntity.ok(adminService.updateBadge(id, request));
    }

    @DeleteMapping("/badges/{id}")
    public ResponseEntity<Void> deleteBadge(@PathVariable Long id) {
        adminService.deleteBadge(id);
        return ResponseEntity.noContent().build();
    }
}
