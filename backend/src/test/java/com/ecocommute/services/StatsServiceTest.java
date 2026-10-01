package com.ecocommute.services;

import com.ecocommute.dto.UserStatsDetailDTO;
import com.ecocommute.entities.*;
import com.ecocommute.repositories.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class StatsServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserStatsRepository userStatsRepository;

    @Mock
    private TripRepository tripRepository;

    @Mock
    private UserBadgeRepository userBadgeRepository;

    @Mock
    private BadgeRepository badgeRepository;

    @Mock
    private DashboardService dashboardService;

    private StatsService statsService;
    private User user;
    private UserStats stats;

    @BeforeEach
    void setUp() {
        statsService = new StatsService(
                userRepository,
                userStatsRepository,
                tripRepository,
                userBadgeRepository,
                badgeRepository,
                dashboardService
        );

        user = new User();
        user.setId("u-odar");
        user.setFullName("Odar Alcocer");
        user.setCurrentPoints(500);
        user.setCurrentLevel(3);
        user.setStreakDays(10);

        stats = new UserStats(user);
        stats.setTotalCo2SavedKg(46.2); // ~20 litros gasolina, ~2.1 arboles
        stats.setTotalDistanceKm(120.5);
        stats.setTotalTrips(15);
        stats.setTotalCaloriesBurned(3400);
        stats.setUpdatedAt(LocalDateTime.now());
    }

    @Test
    @DisplayName("Debe compilar métricas avanzadas y equivalencias ecológicas correctamente")
    void testGetUserStats() {
        when(userRepository.findById("u-odar")).thenReturn(Optional.of(user));
        when(userStatsRepository.findByUserId("u-odar")).thenReturn(Optional.of(stats));

        Trip trip1 = new Trip();
        trip1.setTransportMode(TransportMode.BICYCLE);
        Trip trip2 = new Trip();
        trip2.setTransportMode(TransportMode.WALKING);
        when(tripRepository.findByUserIdOrderByCompletedAtDesc("u-odar")).thenReturn(List.of(trip1, trip2));

        when(userBadgeRepository.findByUserId("u-odar")).thenReturn(List.of(new UserBadge()));
        when(badgeRepository.count()).thenReturn(6L);

        UserStatsDetailDTO result = statsService.getUserStats("u-odar");

        assertNotNull(result);
        assertEquals("u-odar", result.userId());
        assertEquals("Odar Alcocer", result.fullName());
        assertEquals(46.2, result.totalCo2SavedKg());
        assertTrue(result.treesEquivalent() > 2.0);
        assertTrue(result.gasolineLitersSaved() > 19.0);
        assertTrue(result.kwhEquivalent() > 200.0);
        assertTrue(result.ecoScore() > 0);
        assertEquals(1, result.unlockedBadgesCount());
        assertEquals(6, result.totalBadgesCount());
        assertEquals(1L, result.tripsByTransportMode().get("BICYCLE"));
        assertEquals(1L, result.tripsByTransportMode().get("WALKING"));
    }

    @Test
    @DisplayName("Debe agrupar métricas por modo de transporte correctamente")
    void testGetTransportModeBreakdown() {
        Trip trip1 = new Trip();
        trip1.setTransportMode(TransportMode.BICYCLE);
        trip1.setDistanceKm(10.0);
        trip1.setCo2SavedGrams(2000.0);
        trip1.setCaloriesBurned(300);

        Trip trip2 = new Trip();
        trip2.setTransportMode(TransportMode.BICYCLE);
        trip2.setDistanceKm(5.0);
        trip2.setCo2SavedGrams(1000.0);
        trip2.setCaloriesBurned(150);

        Trip trip3 = new Trip();
        trip3.setTransportMode(TransportMode.WALKING);
        trip3.setDistanceKm(3.0);
        trip3.setCo2SavedGrams(600.0);
        trip3.setCaloriesBurned(180);

        when(tripRepository.findByUserIdOrderByCompletedAtDesc("u-odar"))
                .thenReturn(List.of(trip1, trip2, trip3));

        var breakdown = statsService.getTransportModeBreakdown("u-odar");

        assertEquals(2, breakdown.size());

        var bikeStats = breakdown.stream()
                .filter(b -> b.transportMode() == TransportMode.BICYCLE)
                .findFirst().orElseThrow();
        assertEquals(2L, bikeStats.tripsCount());
        assertEquals(15.0, bikeStats.totalDistanceKm());
        assertEquals(3.0, bikeStats.totalCo2SavedKg());
        assertEquals(450, bikeStats.totalCaloriesBurned());

        var walkStats = breakdown.stream()
                .filter(w -> w.transportMode() == TransportMode.WALKING)
                .findFirst().orElseThrow();
        assertEquals(1L, walkStats.tripsCount());
        assertEquals(3.0, walkStats.totalDistanceKm());
        assertEquals(0.6, walkStats.totalCo2SavedKg());
        assertEquals(180, walkStats.totalCaloriesBurned());
    }

    @Test
    @DisplayName("Debe generar certificado oficial de movilidad sostenible con codigo unico")
    void testGenerateCertificate() {
        when(userRepository.findById("u-odar")).thenReturn(Optional.of(user));
        when(userStatsRepository.findByUserId("u-odar")).thenReturn(Optional.of(stats));
        when(userBadgeRepository.findByUserId("u-odar")).thenReturn(List.of());

        var cert = statsService.generateCertificate("u-odar");

        assertNotNull(cert);
        assertNotNull(cert.certificateId());
        assertTrue(cert.verificationCode().startsWith("ECO-CERT-"));
        assertEquals("Odar Alcocer", cert.holderName());
        assertEquals("Explorador Sostenible", cert.levelTitle());
        assertEquals(46.2, cert.totalCo2SavedKg());
        assertNotNull(cert.summaryStatement());
    }

    @Test
    @DisplayName("Debe generar reporte integral de impacto con porcentaje de medallas y recomendaciones")
    void testGenerateImpactReport() {
        when(userRepository.findById("u-odar")).thenReturn(Optional.of(user));
        when(userStatsRepository.findByUserId("u-odar")).thenReturn(Optional.of(stats));
        when(tripRepository.findByUserIdOrderByCompletedAtDesc("u-odar")).thenReturn(List.of());
        when(userBadgeRepository.findByUserId("u-odar")).thenReturn(List.of());
        when(badgeRepository.count()).thenReturn(8L);

        var report = statsService.generateImpactReport("u-odar");

        assertNotNull(report);
        assertEquals("u-odar", report.userId());
        assertEquals(8, report.totalBadgesAvailable());
        assertEquals(0, report.totalBadgesEarned());
        assertNotNull(report.ecoRecommendation());
        assertNotNull(report.lifetimeStats());
    }
}
