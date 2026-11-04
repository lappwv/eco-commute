package com.ecocommute.controllers;

import com.ecocommute.dto.TripRequestDTO;
import com.ecocommute.dto.TripResponseDTO;
import com.ecocommute.entities.Role;
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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/v1/trips")
@Tag(name = "Viajes", description = "HU04, HU05 - CRUD transaccional e historial de viajes sostenibles")
public class TripController {

    private final GamificationService gamificationService;
    private final TripRepository tripRepository;

    public TripController(GamificationService gamificationService, TripRepository tripRepository) {
        this.gamificationService = gamificationService;
        this.tripRepository = tripRepository;
    }

    @PostMapping
    @Operation(summary = "HU04, HU05 - Registro transaccional de viajes y cálculo de CO2 ahorrado (EPA)")
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
    @Operation(summary = "HU04 - Historial de viajes realizados por el usuario autenticado (extraído vía token JWT)")
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
    @Operation(summary = "HU04 - Detalle y métricas de emisiones de un viaje específico (propietario o ADMIN)")
    public ResponseEntity<TripResponseDTO> getTrip(
            @AuthenticationPrincipal User user,
            @PathVariable String tripId) {
        Trip trip = findAndVerifyAccess(user, tripId);
        return ResponseEntity.ok(TripResponseDTO.fromEntity(trip));
    }

    @PutMapping("/{tripId}")
    @Operation(summary = "HU04 - Corrección de viaje registrado y recálculo automático de CO2 y puntos (propietario o ADMIN)")
    public ResponseEntity<TripResponseDTO> updateTrip(
            @AuthenticationPrincipal User user,
            @PathVariable String tripId,
            @Valid @RequestBody TripRequestDTO request) {
        findAndVerifyAccess(user, tripId);
        return ResponseEntity.ok(TripResponseDTO.fromEntity(gamificationService.updateTrip(tripId, request.toEntity())));
    }

    @DeleteMapping("/{tripId}")
    @Operation(summary = "HU04 - Eliminación de viaje registrado y actualización de estadísticas (propietario o ADMIN)")
    public ResponseEntity<Void> deleteTrip(
            @AuthenticationPrincipal User user,
            @PathVariable String tripId) {
        findAndVerifyAccess(user, tripId);
        gamificationService.deleteTrip(tripId);
        return ResponseEntity.noContent().build();
    }

    private Trip findAndVerifyAccess(User user, String tripId) {
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Autenticación requerida");
        }
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new IllegalArgumentException("Viaje no encontrado"));
        boolean isOwner = trip.getUser() != null && user.getId().equals(trip.getUser().getId());
        boolean isAdmin = user.getRole() == Role.ROLE_ADMIN;
        if (!isOwner && !isAdmin) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "No tiene permisos para modificar este viaje");
        }
        return trip;
    }
}
