package com.ecocommute.services;

import com.ecocommute.dto.BadgeAwardDTO;
import com.ecocommute.entities.*;
import com.ecocommute.repositories.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class GamificationServiceTest {

    @Mock
    private TripRepository tripRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserStatsRepository userStatsRepository;

    @Mock
    private BadgeRepository badgeRepository;

    @Mock
    private UserBadgeRepository userBadgeRepository;

    @Mock
    private CarbonEmissionService carbonEmissionService;

    private GamificationService gamificationService;

    private User user;
    private UserStats stats;
    private Badge badgeFirstStep;
    private Badge badgeStreak7;

    @BeforeEach
    void setUp() {
        gamificationService = new GamificationService(
                tripRepository,
                userRepository,
                userStatsRepository,
                badgeRepository,
                userBadgeRepository,
                carbonEmissionService
        );

        user = new User();
        user.setId("u-123");
        user.setCurrentPoints(80);
        user.setCurrentLevel(1);
        user.setStreakDays(2);
        user.setLastTripDate(LocalDateTime.now().minusDays(1));

        stats = new UserStats(user);
        stats.setTotalTrips(2);
        stats.setTotalDistanceKm(15.0);
        stats.setTotalCo2SavedKg(2.55);
        stats.setTotalCaloriesBurned(400);

        badgeFirstStep = new Badge("FIRST_STEP", "Primer Paso Verde", "Primer viaje sostenible registrado", "🌱", 10, 0.0, 0, 1);
        badgeFirstStep.setId(1L);

        badgeStreak7 = new Badge("STREAK_7", "Semana Imparable", "Racha de 7 dias consecutivos", "🔥", 300, 20.0, 7, 7);
        badgeStreak7.setId(2L);
    }

    // =========================================================================
    // HU06: Acumulación de puntos verdes
    // =========================================================================

    @Test
    @DisplayName("HU06: recordTrip debe acumular puntos verdes, recalcular nivel y actualizar estadísticas de forma consistente")
    void hu06_recordTrip_accumulatesPointsAndRecalculatesLevelConsistently() {
        Trip inputTrip = new Trip();
        inputTrip.setDistanceKm(10.0);
        inputTrip.setTransportMode(TransportMode.BICYCLE);
        inputTrip.setDurationMinutes(30);

        when(userRepository.findById("u-123")).thenReturn(Optional.of(user));
        when(userStatsRepository.findByUserId("u-123")).thenReturn(Optional.of(stats));
        when(carbonEmissionService.calculateBaselineEmissionGrams(10.0)).thenReturn(1700.0);
        when(carbonEmissionService.calculateModeEmissionGrams(TransportMode.BICYCLE, 10.0)).thenReturn(0.0);
        when(carbonEmissionService.calculateCo2SavedGrams(TransportMode.BICYCLE, 10.0)).thenReturn(1700.0);
        when(carbonEmissionService.calculateCaloriesBurned(TransportMode.BICYCLE, 10.0)).thenReturn(350);
        when(carbonEmissionService.calculatePoints(eq(TransportMode.BICYCLE), eq(1700.0), anyInt())).thenReturn(50);

        when(tripRepository.save(any(Trip.class))).thenAnswer(i -> {
            Trip t = i.getArgument(0);
            t.setId("trip-999");
            return t;
        });
        when(badgeRepository.findAll()).thenReturn(List.of());

        Trip recorded = gamificationService.recordTrip("u-123", inputTrip);

        assertNotNull(recorded);
        assertEquals(50, recorded.getPointsEarned());

        // Verificar acumulación en User: 80 iniciales + 50 ganados = 130 puntos (Nivel 2)
        assertEquals(130, user.getCurrentPoints());
        assertEquals(2, user.getCurrentLevel());
        verify(userRepository).save(user);

        // Verificar acumulación en UserStats: evitar doble suma o pérdida de consistencia
        assertEquals(3, stats.getTotalTrips());
        assertEquals(25.0, stats.getTotalDistanceKm(), 0.001);
        assertEquals(2.55 + 1.70, stats.getTotalCo2SavedKg(), 0.001);
        assertEquals(750, stats.getTotalCaloriesBurned());
        verify(userStatsRepository).save(stats);
    }

    @Test
    @DisplayName("HU06: deleteTrip debe reconstruir el progreso del usuario a partir de sus viajes restantes para evitar doble suma")
    void hu06_deleteTrip_rebuildsUserProgressWithoutDoubleSum() {
        Trip tripToDelete = new Trip();
        tripToDelete.setId("trip-del");
        tripToDelete.setUser(user);

        Trip remainingTrip = new Trip();
        remainingTrip.setId("trip-rem");
        remainingTrip.setUser(user);
        remainingTrip.setPointsEarned(40);
        remainingTrip.setCo2SavedGrams(1000.0);
        remainingTrip.setDistanceKm(5.0);
        remainingTrip.setCaloriesBurned(150);

        when(tripRepository.findById("trip-del")).thenReturn(Optional.of(tripToDelete));
        when(tripRepository.findByUserIdOrderByCompletedAtDesc("u-123")).thenReturn(List.of(remainingTrip));
        when(userStatsRepository.findByUserId("u-123")).thenReturn(Optional.of(stats));

        gamificationService.deleteTrip("trip-del");

        verify(tripRepository).delete(tripToDelete);
        assertEquals(40, user.getCurrentPoints());
        assertEquals(1, user.getCurrentLevel());
        verify(userRepository).save(user);

        assertEquals(1, stats.getTotalTrips());
        assertEquals(5.0, stats.getTotalDistanceKm(), 0.001);
        assertEquals(1.0, stats.getTotalCo2SavedKg(), 0.001);
        assertEquals(150, stats.getTotalCaloriesBurned());
        verify(userStatsRepository).save(stats);
    }

    // =========================================================================
    // HU10: Desbloqueo automático de medallas
    // =========================================================================

    @Test
    @DisplayName("HU10: checkAndAwardBadges debe desbloquear y persistir automáticamente medallas cuando se cumplen los criterios")
    void hu10_checkAndAwardBadges_unlocksAndPersistsAutomaticallyWhenCriteriaMet() {
        when(badgeRepository.findAll()).thenReturn(List.of(badgeFirstStep));
        when(userBadgeRepository.existsByUserIdAndBadgeId("u-123", 1L)).thenReturn(false);

        when(userBadgeRepository.save(any(UserBadge.class))).thenAnswer(i -> {
            UserBadge ub = i.getArgument(0);
            ub.setAwardedAt(LocalDateTime.now());
            return ub;
        });

        List<BadgeAwardDTO> awarded = gamificationService.checkAndAwardBadges(user, stats);

        assertEquals(1, awarded.size());
        assertEquals("FIRST_STEP", awarded.get(0).code());
        assertEquals("Primer Paso Verde", awarded.get(0).title());
        assertEquals("🌱", awarded.get(0).iconEmoji());

        ArgumentCaptor<UserBadge> captor = ArgumentCaptor.forClass(UserBadge.class);
        verify(userBadgeRepository).save(captor.capture());
        assertEquals(user, captor.getValue().getUser());
        assertEquals(badgeFirstStep, captor.getValue().getBadge());
    }

    @Test
    @DisplayName("HU10: checkAndAwardBadges NO debe volver a otorgar ni duplicar medallas que el usuario ya desbloqueó")
    void hu10_checkAndAwardBadges_doesNotDuplicateAlreadyAwardedBadges() {
        when(badgeRepository.findAll()).thenReturn(List.of(badgeFirstStep));
        when(userBadgeRepository.existsByUserIdAndBadgeId("u-123", 1L)).thenReturn(true);

        List<BadgeAwardDTO> awarded = gamificationService.checkAndAwardBadges(user, stats);

        assertTrue(awarded.isEmpty());
        verify(userBadgeRepository, never()).save(any(UserBadge.class));
    }

    @Test
    @DisplayName("HU10: checkAndAwardBadges NO debe desbloquear medallas cuando los requisitos no se cumplen")
    void hu10_checkAndAwardBadges_doesNotAwardWhenRequirementsNotMet() {
        // badgeStreak7 requiere 300 puntos, 20 kg CO2, 7 días racha, 7 viajes. El usuario no cumple racha ni puntos suficientes.
        when(badgeRepository.findAll()).thenReturn(List.of(badgeStreak7));
        when(userBadgeRepository.existsByUserIdAndBadgeId("u-123", 2L)).thenReturn(false);

        List<BadgeAwardDTO> awarded = gamificationService.checkAndAwardBadges(user, stats);

        assertTrue(awarded.isEmpty());
        verify(userBadgeRepository, never()).save(any(UserBadge.class));
    }

    // =========================================================================
    // HU11: Consulta de medallas
    // =========================================================================

    @Test
    @DisplayName("HU11: Las medallas desbloqueadas deben contener todos los atributos requeridos para la consulta en el perfil")
    void hu11_userBadge_containsAllAttributesForProfileConsultation() {
        UserBadge ub = new UserBadge(user, badgeFirstStep);
        ub.setAwardedAt(LocalDateTime.of(2026, 10, 3, 14, 30));

        BadgeAwardDTO dto = new BadgeAwardDTO(
                ub.getBadge().getId(),
                ub.getBadge().getCode(),
                ub.getBadge().getTitle(),
                ub.getBadge().getDescription(),
                ub.getBadge().getIconEmoji(),
                ub.getAwardedAt().toString()
        );

        assertEquals(1L, dto.id());
        assertEquals("FIRST_STEP", dto.code());
        assertEquals("Primer Paso Verde", dto.title());
        assertEquals("Primer viaje sostenible registrado", dto.description());
        assertEquals("🌱", dto.iconEmoji());
        assertEquals("2026-10-03T14:30", dto.awardedAt());
    }
}
