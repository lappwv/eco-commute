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
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    @Column(nullable = false)
    private String fullName;

    private String avatarUrl;

    @Column(name = "district", length = 80)
    private String district;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role = Role.ROLE_USER;

    private boolean active = true;

    private String authProvider = "LOCAL"; // "LOCAL" or "GOOGLE"
    private String googleSub;

    private int currentPoints = 0;
    private int currentLevel = 1;
    private int streakDays = 0;
    private LocalDateTime lastTripDate;

    private boolean hasBicycle = true;
    private int maxWalkingMinutes = 20;

    private LocalDateTime createdAt = LocalDateTime.now();

    public User(String email, String password, String fullName, Role role) {
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.role = role;
    }
}
