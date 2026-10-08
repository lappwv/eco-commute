package com.ecocommute.services;

import com.ecocommute.dto.CommunityImpactDTO;
import com.ecocommute.dto.DashboardBadgeDTO;
import com.ecocommute.dto.DashboardSummaryDTO;
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
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class DashboardServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserStatsRepository userStatsRepository;

    @Mock
    private TripRepository tripRepository;

    @Mock
    private BadgeRepository badgeRepository;

    @Mock
    private UserBadgeRepository userBadgeRepository;

    private DashboardService dashboardService;

    private User testUser;
    private UserStats testStats;

    @BeforeEach
    void setUp() {
        dashboardService = new DashboardService(
                userRepository,
                userStatsRepository,
                tripRepository,
                badgeRepository,
                userBadgeRepository
        );

        testUser = new User();
        testUser.setId("user-123");
        testUser.setFullName("Matias Mariños");
        testUser.setEmail("matias@ecocommute.org");
        testUser.setAvatarUrl("https://api.dicebear.com/7.x/bottts/svg?seed=matias");
        testUser.setCurrentPoints(250);
        testUser.setCurrentLevel(3);
        testUser.setStreakDays(5);

        testStats = new UserStats(testUser);
        testStats.setTotalCo2SavedKg(35.5);
        testStats.setTotalDistanceKm(85.0);
        testStats.setTotalTrips(12);
        testStats.setTotalCaloriesBurned(2975);
    }

    @Test
    @DisplayName("HU07: Retorna el resumen del dashboard con KPIs, historial, evolución semanal e insignias")
    void testGetUserDashboard_success() {
        Trip trip1 = new Trip();
        trip1.setTransportMode(TransportMode.BICYCLE);
        trip1.setCo2SavedGrams(1500.0);
        trip1.setCompletedAt(LocalDateTime.now().minusDays(1));

        Trip trip2 = new Trip();
        trip2.setTransportMode(TransportMode.WALKING);
        trip2.setCo2SavedGrams(800.0);
        trip2.setCompletedAt(LocalDateTime.now().minusDays(2));

        Badge badge1 = new Badge("FIRST_STEP", "Primer Paso Verde", "Primer viaje", "🌱", 10, 0.0, 0, 1);
        badge1.setId(1L);

        Badge badge2 = new Badge("FOREST_HERO", "Salvador del Bosque", "50 kg CO2", "🌳", 600, 50.0, 0, 20);
        badge2.setId(2L);

        UserBadge ub = new UserBadge(testUser, badge1);

        when(userRepository.findById("user-123")).thenReturn(Optional.of(testUser));
        when(userStatsRepository.findByUserId("user-123")).thenReturn(Optional.of(testStats));
        when(tripRepository.findUserTripsSince(eq("user-123"), any())).thenReturn(List.of(trip1, trip2));
        when(tripRepository.findByUserIdOrderByCompletedAtDesc("user-123")).thenReturn(List.of(trip1, trip2));
        when(userBadgeRepository.findByUserId("user-123")).thenReturn(List.of(ub));
        when(badgeRepository.findAll()).thenReturn(List.of(badge1, badge2));

        DashboardSummaryDTO summary = dashboardService.getUserDashboard("user-123");

        assertNotNull(summary);
        assertEquals("user-123", summary.userId());
        assertEquals("Matias Mariños", summary.fullName());
        assertEquals("matias@ecocommute.org", summary.email());
        assertEquals(35.5, summary.totalCo2SavedKg());
        assertEquals(85.0, summary.totalDistanceKm());
        assertEquals(12, summary.totalTrips());
        assertEquals(250, summary.currentPoints());
        assertEquals(3, summary.currentLevel());
        assertEquals(2975, summary.totalCaloriesBurned());
        assertEquals(35.5 / 22.0, summary.treesEquivalent(), 0.001);

        // Evolución semanal: 7 puntos
        assertEquals(7, summary.weeklyTrend().size());
        double totalWeeklyCo2 = summary.weeklyTrend().stream()
                .mapToDouble(p -> p.co2SavedGrams())
                .sum();
        assertEquals(2300.0, totalWeeklyCo2, 0.01);

        // Distribución de viajes por modo
        assertEquals(1L, summary.tripsByMode().get("BICYCLE"));
        assertEquals(1L, summary.tripsByMode().get("WALKING"));

        // Insignias: badge1 desbloqueada al 100%, badge2 en progreso
        assertEquals(2, summary.recentBadges().size());
        DashboardBadgeDTO b1Dto = summary.recentBadges().stream().filter(b -> b.code().equals("FIRST_STEP")).findFirst().orElseThrow();
        assertTrue(b1Dto.unlocked());
        assertEquals(100, b1Dto.progressPercent());

        DashboardBadgeDTO b2Dto = summary.recentBadges().stream().filter(b -> b.code().equals("FOREST_HERO")).findFirst().orElseThrow();
        assertFalse(b2Dto.unlocked());
        assertTrue(b2Dto.progressPercent() > 0 && b2Dto.progressPercent() < 100);
    }

    @Test
    @DisplayName("HU07: Lanza IllegalArgumentException si el usuario no existe")
    void testGetUserDashboard_userNotFound_throwsException() {
        when(userRepository.findById("unknown")).thenReturn(Optional.empty());

        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class,
                () -> dashboardService.getUserDashboard("unknown"));

        assertEquals("Usuario no encontrado", ex.getMessage());
    }

    @Test
    @DisplayName("HU07: Maneja correctamente un usuario nuevo sin estadísticas ni viajes previos")
    void testGetUserDashboard_newUserWithoutStats_returnsZeroMetrics() {
        when(userRepository.findById("user-123")).thenReturn(Optional.of(testUser));
        when(userStatsRepository.findByUserId("user-123")).thenReturn(Optional.empty());
        when(tripRepository.findUserTripsSince(eq("user-123"), any())).thenReturn(List.of());
        when(tripRepository.findByUserIdOrderByCompletedAtDesc("user-123")).thenReturn(List.of());
        when(userBadgeRepository.findByUserId("user-123")).thenReturn(List.of());
        when(badgeRepository.findAll()).thenReturn(List.of());

        DashboardSummaryDTO summary = dashboardService.getUserDashboard("user-123");

        assertNotNull(summary);
        assertEquals(0.0, summary.totalCo2SavedKg());
        assertEquals(0.0, summary.totalDistanceKm());
        assertEquals(0, summary.totalTrips());
        assertEquals(7, summary.weeklyTrend().size());
        assertTrue(summary.tripsByMode().isEmpty());
        assertTrue(summary.recentBadges().isEmpty());
    }

    @Test
    @DisplayName("HU07: Calcula métricas agregadas del impacto comunitario correctamente")
    void testGetCommunityImpact_success() {
        when(userStatsRepository.sumTotalCo2SavedKg()).thenReturn(2177.0);
        when(userStatsRepository.sumTotalDistanceKm()).thenReturn(15000.0);
        when(userStatsRepository.sumTotalTrips()).thenReturn(3500L);
        when(userRepository.count()).thenReturn(120L);

        CommunityImpactDTO impact = dashboardService.getCommunityImpact();

        assertNotNull(impact);
        assertEquals(2.177, impact.totalCo2SavedTons(), 0.0001);
        assertEquals(15000.0, impact.totalCleanKm(), 0.01);
        assertEquals(3500L, impact.totalTrips());
        assertEquals(120L, impact.totalActiveUsers());
        // 2177.0 / 21.77 = 100 árboles equivalentes
        assertEquals(100.0, impact.totalTreesEquivalent(), 0.01);
    }
}
