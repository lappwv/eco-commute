package com.ecocommute.controllers;

import com.ecocommute.dto.RedeemResponseDTO;
import com.ecocommute.dto.RedemptionResponseDTO;
import com.ecocommute.entities.Reward;
import com.ecocommute.entities.User;
import com.ecocommute.services.RewardService;
import jakarta.validation.constraints.Min;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class RewardController {

    private final RewardService rewardService;

    public RewardController(RewardService rewardService) {
        this.rewardService = rewardService;
    }

    @GetMapping("/rewards")
    public ResponseEntity<List<Reward>> getRewards() {
        return ResponseEntity.ok(rewardService.getActiveRewards());
    }

    @PostMapping("/rewards/{rewardId}/redeem")
    public ResponseEntity<RedeemResponseDTO> redeem(
            @AuthenticationPrincipal User user,
            @PathVariable @Min(1) Long rewardId) {
        return ResponseEntity.ok(new RedeemResponseDTO(
                RedemptionResponseDTO.fromEntity(rewardService.redeem(user.getId(), rewardId))));
    }

    @GetMapping("/redemptions")
    public ResponseEntity<List<RedemptionResponseDTO>> getHistory(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(rewardService.getHistory(user.getId())
                .stream().map(RedemptionResponseDTO::fromEntity).toList());
    }
}
