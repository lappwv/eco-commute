package com.ecocommute.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "rewards")
public class Reward {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String code;

    @Column(nullable = false)
    private String title;

    private String description;

    @Column(nullable = false)
    private int pointsCost = 0;

    private String iconEmoji;
    private String iconUrl;

    private boolean active = true;

    public Reward(String code, String title, String description, int pointsCost, String iconEmoji) {
        this.code = code;
        this.title = title;
        this.description = description;
        this.pointsCost = pointsCost;
        this.iconEmoji = iconEmoji;
    }
}
