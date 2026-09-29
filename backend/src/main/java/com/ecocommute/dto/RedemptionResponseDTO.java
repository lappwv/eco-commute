package com.ecocommute.dto;

import com.ecocommute.entities.Redemption;

import java.time.LocalDateTime;

public record RedemptionResponseDTO(
        Long id,
        String rewardCode,
        String rewardTitle,
        String rewardIconEmoji,
        int pointsUsed,
        String status,
        LocalDateTime createdAt
) {
    public static RedemptionResponseDTO fromEntity(Redemption redemption) {
        return new RedemptionResponseDTO(
                redemption.getId(),
                redemption.getReward().getCode(),
                redemption.getReward().getTitle(),
                redemption.getReward().getIconEmoji(),
                redemption.getPointsUsed(),
                redemption.getStatus().name(),
                redemption.getCreatedAt()
        );
    }
}
