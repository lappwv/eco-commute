package com.ecocommute.controllers;

import com.ecocommute.dto.TripRequestDTO;
import com.ecocommute.dto.TripResponseDTO;
import com.ecocommute.entities.Trip;
import com.ecocommute.entities.User;
import com.ecocommute.repositories.TripRepository;
import com.ecocommute.services.GamificationService;
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
    public ResponseEntity<TripResponseDTO> recordTrip(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody TripRequestDTO trip) {

        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        Trip savedTrip = gamificationService.recordTrip(user.getId(), trip.toEntity());
        return ResponseEntity.ok(TripResponseDTO.fromEntity(savedTrip));
    }

    @GetMapping("/history")
    @Operation(summary = "Lista el historial paginado del usuario autenticado")
    public ResponseEntity<Page<TripResponseDTO>> getMyTrips(
            @AuthenticationPrincipal User user,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        if (user == null) {
            return ResponseEntity.status(401).build();
        }

        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "completedAt"));
        Page<Trip> trips = tripRepository.findByUserIdOrderByCompletedAtDesc(user.getId(), pageRequest);
        return ResponseEntity.ok(trips.map(TripResponseDTO::fromEntity));
    }

    @GetMapping("/{tripId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @Operation(summary = "Obtiene un viaje por identificador para auditoria")
    public ResponseEntity<TripResponseDTO> getTrip(@PathVariable String tripId) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new IllegalArgumentException("Viaje no encontrado"));
        return ResponseEntity.ok(TripResponseDTO.fromEntity(trip));
    }

    @PutMapping("/{tripId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @Operation(summary = "Actualiza un viaje y recalcula sus metricas")
    public ResponseEntity<TripResponseDTO> updateTrip(
            @PathVariable String tripId,
            @Valid @RequestBody TripRequestDTO request) {
        return ResponseEntity.ok(TripResponseDTO.fromEntity(gamificationService.updateTrip(tripId, request.toEntity())));
    }

    @DeleteMapping("/{tripId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @Operation(summary = "Elimina un viaje y recalcula los acumulados del usuario")
    public ResponseEntity<Void> deleteTrip(@PathVariable String tripId) {
        gamificationService.deleteTrip(tripId);
        return ResponseEntity.noContent().build();
    }
}
