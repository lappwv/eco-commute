package com.ecocommute.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "badges")
public class Badge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String code;

    @Column(nullable = false)
    private String title;

    private String description;
    private String iconUrl;
    private String iconEmoji;

    private int requiredPoints;
    private double requiredCo2SavedKg;
    private int requiredStreakDays;
    private int requiredTrips;

    public Badge(String code, String title, String description, String iconEmoji, int requiredPoints, double requiredCo2SavedKg, int requiredStreakDays, int requiredTrips) {
        this.code = code;
        this.title = title;
        this.description = description;
        this.iconEmoji = iconEmoji;
        this.requiredPoints = requiredPoints;
        this.requiredCo2SavedKg = requiredCo2SavedKg;
        this.requiredStreakDays = requiredStreakDays;
        this.requiredTrips = requiredTrips;
    }
}
