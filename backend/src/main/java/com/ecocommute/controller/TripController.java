package com.ecocommute.controller;

import com.ecocommute.dto.TripRequest;
import com.ecocommute.entity.Trip;
import com.ecocommute.entity.User;
import com.ecocommute.repository.TripRepository;
import com.ecocommute.service.GamificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/trips")
@Tag(name = "Viajes", description = "Registro e historial de viajes sostenibles")
public class TripController {

    private final GamificationService gamificationService;
    private final TripRepository tripRepository;

    public TripController(GamificationService gamificationService, TripRepository tripRepository) {
        this.gamificationService = gamificationService;
        this.tripRepository = tripRepository;
    }

    @PostMapping
    @Operation(summary = "Registra un viaje finalizado y calcula CO2, puntos e insignias")
    public ResponseEntity<Trip> recordTrip(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody TripRequest trip) {

        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(gamificationService.recordTrip(user.getId(), trip.toEntity()));
    }

    @GetMapping("/history")
    @Operation(summary = "Lista el historial paginado del usuario autenticado")
    public ResponseEntity<Page<Trip>> getMyTrips(
            @AuthenticationPrincipal User user,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        if (user == null) {
            return ResponseEntity.status(401).build();
        }

        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "completedAt"));
        Page<Trip> trips = tripRepository.findByUserIdOrderByCompletedAtDesc(user.getId(), pageRequest);
        return ResponseEntity.ok(trips);
    }
}
