package com.ecocommute.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "redemptions")
public class Redemption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "reward_id", nullable = false)
    private Reward reward;

    @Column(nullable = false)
    private int pointsUsed;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RedemptionStatus status = RedemptionStatus.COMPLETED;

    private LocalDateTime createdAt = LocalDateTime.now();

    public Redemption(User user, Reward reward, int pointsUsed) {
        this.user = user;
        this.reward = reward;
        this.pointsUsed = pointsUsed;
    }
}
