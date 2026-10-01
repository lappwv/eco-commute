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
        return Math.round((this.totalCo2SavedKg / 22.0) * 100.0) / 100.0;
    }

    public double getGasolineLitersSaved() {
        // 1 litro de gasolina = ~2.31 kg CO2
        return Math.round((this.totalCo2SavedKg / 2.31) * 100.0) / 100.0;
    }

    public double getKwhEquivalent() {
        // Red electrica equivalente ~0.20 kg CO2 / kWh
        return Math.round((this.totalCo2SavedKg / 0.20) * 100.0) / 100.0;
    }

    public int getEcoScore() {
        // EcoScore 0-100 ponderado por viajes, distancia y CO2 ahorrado
        double score = (totalTrips * 2.0) + (totalDistanceKm * 0.5) + (totalCo2SavedKg * 1.5);
        return (int) Math.min(100, Math.round(score));
    }
}
