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
}
