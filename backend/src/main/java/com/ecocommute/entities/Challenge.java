package com.ecocommute.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "challenges")
public class Challenge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String description;

    @Column(nullable = false)
    private int goalValue = 0;

    private String goalUnit;

    private LocalDate periodStart;
    private LocalDate periodEnd;

    private boolean active = true;

    public Challenge(String title, String description, int goalValue, String goalUnit,
                     LocalDate periodStart, LocalDate periodEnd) {
        this.title = title;
        this.description = description;
        this.goalValue = goalValue;
        this.goalUnit = goalUnit;
        this.periodStart = periodStart;
        this.periodEnd = periodEnd;
    }
}
