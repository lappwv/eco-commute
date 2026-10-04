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
@Table(name = "trips")
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TransportMode transportMode;

    private String originName;
    private double originLat;
    private double originLng;

    private String destinationName;
    private double destinationLat;
    private double destinationLng;

    private double distanceKm;
    private int durationMinutes;

    private double baselineCo2Grams;
    private double co2EmittedGrams;
    private double co2SavedGrams;
    private int caloriesBurned;
    private int pointsEarned;

    private boolean suspicious = false;
    private String suspiciousReason;

    private LocalDateTime completedAt = LocalDateTime.now();
}
