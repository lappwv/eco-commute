package com.ecocommute.controllers;

import com.ecocommute.entities.Challenge;
import com.ecocommute.repositories.ChallengeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/challenges")
public class ChallengeController {

    private final ChallengeRepository challengeRepository;

    public ChallengeController(ChallengeRepository challengeRepository) {
        this.challengeRepository = challengeRepository;
    }

    @GetMapping
    public ResponseEntity<List<Challenge>> getActiveChallenges() {
        return ResponseEntity.ok(challengeRepository.findByActiveTrueOrderByPeriodStartDesc());
    }
}
