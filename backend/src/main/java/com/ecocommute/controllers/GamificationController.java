package com.ecocommute.controllers;

import com.ecocommute.dto.DashboardBadgeDTO;
import com.ecocommute.dto.DashboardSummaryDTO;
import com.ecocommute.entities.Badge;
import com.ecocommute.entities.User;
import com.ecocommute.repositories.BadgeRepository;
import com.ecocommute.repositories.UserRepository;
import com.ecocommute.services.DashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/gamification")
@Tag(name = "Gamificación", description = "HU06, HU10, HU11 - Puntos verdes, insignias y progreso de hitos")
public class GamificationController {

    private final DashboardService dashboardService;
    private final BadgeRepository badgeRepository;
    private final UserRepository userRepository;

    public GamificationController(DashboardService dashboardService,
                                  BadgeRepository badgeRepository,
                                  UserRepository userRepository) {
        this.dashboardService = dashboardService;
        this.badgeRepository = badgeRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/stats")
    @Operation(summary = "HU06 - Saldo de puntos verdes y total CO2 acumulado")
    public ResponseEntity<Map<String, Object>> getStats(@AuthenticationPrincipal User user) {
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        DashboardSummaryDTO summary = dashboardService.getUserDashboard(user.getId());
        User refreshedUser = userRepository.findById(user.getId()).orElse(user);
        return ResponseEntity.ok(Map.of(
                "currentPoints", summary.currentPoints(),
                "totalCo2SavedKg", summary.totalCo2SavedKg(),
                "totalDistanceKm", summary.totalDistanceKm(),
                "streakDays", refreshedUser.getStreakDays(),
                "totalTrips", summary.totalTrips()
        ));
    }

    @GetMapping("/milestones")
    @Operation(summary = "HU10 - Progreso porcentual y estado de hitos personales")
    public ResponseEntity<Map<String, Object>> getMilestones(@AuthenticationPrincipal User user) {
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        DashboardSummaryDTO summary = dashboardService.getUserDashboard(user.getId());
        int points = summary.currentPoints();
        int nextMilestone = points < 100 ? 100 : points < 300 ? 300 : points < 700 ? 700 : points < 1500 ? 1500 : 3000;
        int progress = (int) Math.min(100, Math.round(((double) points / nextMilestone) * 100));
        return ResponseEntity.ok(Map.of(
                "currentLevel", summary.currentLevel(),
                "currentPoints", points,
                "nextMilestonePoints", nextMilestone,
                "progressPercentage", progress
        ));
    }

    @GetMapping("/badges")
    @Operation(summary = "HU11 - Medallas desbloqueadas del usuario con fecha de obtención")
    public ResponseEntity<List<DashboardBadgeDTO>> getBadges(@AuthenticationPrincipal User user) {
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(dashboardService.getUserDashboard(user.getId()).recentBadges());
    }

    @GetMapping("/badges/catalog")
    @Operation(summary = "HU11 - Catálogo general de insignias e hitos disponibles")
    public ResponseEntity<List<Badge>> getBadgeCatalog() {
        return ResponseEntity.ok(badgeRepository.findAll());
    }
}
