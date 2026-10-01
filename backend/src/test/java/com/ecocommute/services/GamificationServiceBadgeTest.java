package com.ecocommute.services;

import com.ecocommute.dto.BadgeAwardDTO;
import com.ecocommute.entities.Badge;
import com.ecocommute.entities.User;
import com.ecocommute.entities.UserBadge;
import com.ecocommute.entities.UserStats;
import com.ecocommute.repositories.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class GamificationServiceBadgeTest {

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
        user.setId("u-1");
        user.setCurrentPoints(350);
        user.setStreakDays(7);

        stats = new UserStats(user);
        stats.setTotalTrips(10);
        stats.setTotalCo2SavedKg(25.0);

        badgeFirstStep = new Badge("FIRST_STEP", "Primer Paso Verde", "Primer viaje", "🌱", 10, 0.0, 0, 1);
        badgeFirstStep.setId(1L);

        badgeStreak7 = new Badge("STREAK_7", "Semana Imparable", "Racha 7 dias", "🔥", 300, 20.0, 7, 7);
        badgeStreak7.setId(2L);
    }

    @Test
    @DisplayName("Debe desbloquear automáticamente las medallas cuyos criterios se cumplan")
    void testCheckAndAwardBadges_Qualifies() {
        when(badgeRepository.findAll()).thenReturn(List.of(badgeFirstStep, badgeStreak7));
        when(userBadgeRepository.existsByUserIdAndBadgeId("u-1", 1L)).thenReturn(false);
        when(userBadgeRepository.existsByUserIdAndBadgeId("u-1", 2L)).thenReturn(false);

        when(userBadgeRepository.save(any(UserBadge.class))).thenAnswer(invocation -> {
            UserBadge ub = invocation.getArgument(0);
            ub.setAwardedAt(LocalDateTime.now());
            return ub;
        });

        List<BadgeAwardDTO> awarded = gamificationService.checkAndAwardBadges(user, stats);

        assertEquals(2, awarded.size());
        verify(userBadgeRepository, times(2)).save(any(UserBadge.class));
    }

    @Test
    @DisplayName("No debe volver a premiar medallas que el usuario ya tiene desbloqueadas")
    void testCheckAndAwardBadges_AlreadyUnlocked() {
        when(badgeRepository.findAll()).thenReturn(List.of(badgeFirstStep));
        when(userBadgeRepository.existsByUserIdAndBadgeId("u-1", 1L)).thenReturn(true);

        List<BadgeAwardDTO> awarded = gamificationService.checkAndAwardBadges(user, stats);

        assertTrue(awarded.isEmpty());
        verify(userBadgeRepository, never()).save(any(UserBadge.class));
    }

    @Test
    @DisplayName("No debe desbloquear medallas si no cumple alguno de los requisitos mínimos")
    void testCheckAndAwardBadges_RequirementsNotMet() {
        Badge highBadge = new Badge("HIGH_TIER", "Supremo", "Reqs altos", "⭐", 1000, 100.0, 30, 50);
        highBadge.setId(3L);

        when(badgeRepository.findAll()).thenReturn(List.of(highBadge));
        when(userBadgeRepository.existsByUserIdAndBadgeId("u-1", 3L)).thenReturn(false);

        List<BadgeAwardDTO> awarded = gamificationService.checkAndAwardBadges(user, stats);

        assertTrue(awarded.isEmpty());
        verify(userBadgeRepository, never()).save(any(UserBadge.class));
    }
}
