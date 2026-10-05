package com.ecocommute.controllers;

import com.ecocommute.dto.RedeemResponseDTO;
import com.ecocommute.dto.RedemptionResponseDTO;
import com.ecocommute.entities.Reward;
import com.ecocommute.entities.User;
import com.ecocommute.services.RewardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Min;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@Tag(name = "Recompensas", description = "HU12, HU14 - Catálogo de recompensas y canje de beneficios")
public class RewardController {

    private final RewardService rewardService;

    public RewardController(RewardService rewardService) {
        this.rewardService = rewardService;
    }

    @GetMapping("/rewards")
    @Operation(summary = "HU12 - Catálogo público de recompensas y beneficios activos")
    public ResponseEntity<List<Reward>> getRewards() {
        return ResponseEntity.ok(rewardService.getActiveRewards());
    }

    @GetMapping("/rewards/{id}")
    @Operation(summary = "HU12 - Detalle de recompensa, puntos requeridos y stock disponible")
    public ResponseEntity<Reward> getRewardById(@PathVariable Long id) {
        return rewardService.getActiveRewards().stream()
                .filter(r -> r.getId().equals(id))
                .findFirst()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/rewards/{rewardId}/redeem")
    @Operation(summary = "HU14 - Canje de recompensa con puntos verdes")
    public ResponseEntity<RedeemResponseDTO> redeem(
            @AuthenticationPrincipal User user,
            @PathVariable @Min(1) Long rewardId) {
        return ResponseEntity.ok(new RedeemResponseDTO(
                RedemptionResponseDTO.fromEntity(rewardService.redeem(user.getId(), rewardId))));
    }

    @GetMapping("/redemptions")
    @Operation(summary = "HU14 - Historial de canjes y cupones del usuario autenticado vía JWT")
    public ResponseEntity<List<RedemptionResponseDTO>> getHistory(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(rewardService.getHistory(user.getId())
                .stream().map(RedemptionResponseDTO::fromEntity).toList());
    }
}
