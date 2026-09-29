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
@Table(name = "user_stats")
public class UserStats {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", unique = true, nullable = false)
    private User user;

    private double totalCo2SavedKg = 0.0;
    private double totalDistanceKm = 0.0;
    private int totalTrips = 0;
    private int totalCaloriesBurned = 0;

    private LocalDateTime updatedAt = LocalDateTime.now();

    public UserStats(User user) {
        this.user = user;
    }

    public double getTreesEquivalent() {
        return this.totalCo2SavedKg / 22.0;
    }
}
