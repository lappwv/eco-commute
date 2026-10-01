package com.ecocommute.controllers;

import com.ecocommute.dto.BadgeAwardDTO;
import com.ecocommute.dto.BadgeDetailDTO;
import com.ecocommute.entities.User;
import com.ecocommute.services.BadgeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/badges")
@Tag(name = "Medallas", description = "Consulta y seguimiento de logros e insignias sostenibles (HU10, HU11)")
public class BadgeController {

    private final BadgeService badgeService;

    public BadgeController(BadgeService badgeService) {
        this.badgeService = badgeService;
    }

    @GetMapping
    @Operation(summary = "Obtiene el catalogo de medallas con filtro opcional de estado (ALL, UNLOCKED, LOCKED)")
    public ResponseEntity<List<BadgeDetailDTO>> getAllBadges(
            @AuthenticationPrincipal User user,
            @Parameter(description = "Filtro por estado: ALL, UNLOCKED o LOCKED")
            @RequestParam(required = false, defaultValue = "ALL") String status) {
        return ResponseEntity.ok(badgeService.getAllBadgesForUser(user, status));
    }

    @GetMapping("/my-badges")
    @Operation(summary = "Obtiene unicamente las medallas desbloqueadas por el usuario autenticado")
    public ResponseEntity<List<BadgeAwardDTO>> getMyBadges(@AuthenticationPrincipal User user) {
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(badgeService.getMyBadges(user.getId()));
    }

    @PostMapping("/sync")
    @Operation(summary = "Sincroniza y reevalua todas las medallas para el usuario autenticado")
    public ResponseEntity<List<BadgeAwardDTO>> syncMyBadges(@AuthenticationPrincipal User user) {
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(badgeService.syncUserBadges(user));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtiene el detalle de una medalla y su progreso")
    public ResponseEntity<BadgeDetailDTO> getBadgeById(@PathVariable Long id, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(badgeService.getBadgeById(id, user));
    }
}
