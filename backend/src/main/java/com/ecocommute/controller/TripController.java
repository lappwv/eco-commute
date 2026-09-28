package com.ecocommute.controller;

import com.ecocommute.dto.TripRequest;
import com.ecocommute.dto.TripResponse;
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
import org.springframework.security.access.prepost.PreAuthorize;
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
    public ResponseEntity<TripResponse> recordTrip(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody TripRequest trip) {

        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        Trip savedTrip = gamificationService.recordTrip(user.getId(), trip.toEntity());
        return ResponseEntity.ok(TripResponse.fromEntity(savedTrip));
    }

    @GetMapping("/history")
    @Operation(summary = "Lista el historial paginado del usuario autenticado")
    public ResponseEntity<Page<TripResponse>> getMyTrips(
            @AuthenticationPrincipal User user,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        if (user == null) {
            return ResponseEntity.status(401).build();
        }

        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "completedAt"));
        Page<Trip> trips = tripRepository.findByUserIdOrderByCompletedAtDesc(user.getId(), pageRequest);
        return ResponseEntity.ok(trips.map(TripResponse::fromEntity));
    }

    @GetMapping("/{tripId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @Operation(summary = "Obtiene un viaje por identificador para auditoria")
    public ResponseEntity<TripResponse> getTrip(@PathVariable String tripId) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new IllegalArgumentException("Viaje no encontrado"));
        return ResponseEntity.ok(TripResponse.fromEntity(trip));
    }

    @PutMapping("/{tripId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @Operation(summary = "Actualiza un viaje y recalcula sus metricas")
    public ResponseEntity<TripResponse> updateTrip(
            @PathVariable String tripId,
            @Valid @RequestBody TripRequest request) {
        return ResponseEntity.ok(TripResponse.fromEntity(gamificationService.updateTrip(tripId, request.toEntity())));
    }

    @DeleteMapping("/{tripId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @Operation(summary = "Elimina un viaje y recalcula los acumulados del usuario")
    public ResponseEntity<Void> deleteTrip(@PathVariable String tripId) {
        gamificationService.deleteTrip(tripId);
        return ResponseEntity.noContent().build();
    }
}
