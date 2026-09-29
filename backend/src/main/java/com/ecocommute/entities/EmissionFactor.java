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
@Table(name = "emission_factors")
public class EmissionFactor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(unique = true, nullable = false)
    private TransportMode transportMode;

    @Column(nullable = false)
    private double gramsCo2PerKm;

    private String description;
    private LocalDateTime updatedAt = LocalDateTime.now();

    public EmissionFactor(TransportMode transportMode, double gramsCo2PerKm, String description) {
        this.transportMode = transportMode;
        this.gramsCo2PerKm = gramsCo2PerKm;
        this.description = description;
    }
}
