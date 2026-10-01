package com.ecocommute.services;

import com.ecocommute.dto.BadgeAwardDTO;
import com.ecocommute.dto.BadgeDetailDTO;
import com.ecocommute.entities.Badge;
import com.ecocommute.entities.User;
import com.ecocommute.entities.UserBadge;
import com.ecocommute.entities.UserStats;
import com.ecocommute.repositories.BadgeRepository;
import com.ecocommute.repositories.UserBadgeRepository;
import com.ecocommute.repositories.UserRepository;
import com.ecocommute.repositories.UserStatsRepository;
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
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BadgeServiceTest {

    @Mock
    private BadgeRepository badgeRepository;

    @Mock
    private UserBadgeRepository userBadgeRepository;

    @Mock
    private UserStatsRepository userStatsRepository;

    private BadgeService badgeService;

    private User user;
    private Badge badge1;
    private Badge badge2;

    @BeforeEach
    void setUp() {
        badgeService = new BadgeService(badgeRepository, userBadgeRepository, userStatsRepository);

        user = new User();
        user.setId("u-123");
        user.setFullName("Odar Alcocer");
        user.setCurrentPoints(250);
        user.setStreakDays(5);

        badge1 = new Badge("FIRST_STEP", "Primer Paso Verde", "Primer viaje", "🌱", 10, 0.0, 0, 1);
        badge1.setId(1L);

        badge2 = new Badge("FOREST_HERO", "Salvador del Bosque", "50 kg CO2", "🌳", 600, 50.0, 0, 20);
        badge2.setId(2L);
    }

    @Test
    @DisplayName("Debe listar todas las medallas bloqueadas cuando no hay usuario autenticado")
    void testGetAllBadges_AnonymousUser() {
        when(badgeRepository.findAll()).thenReturn(List.of(badge1, badge2));

        List<BadgeDetailDTO> result = badgeService.getAllBadgesForUser(null);

        assertEquals(2, result.size());
        assertFalse(result.get(0).unlocked());
        assertEquals(0, result.get(0).progressPercentage());
        assertNull(result.get(0).awardedAt());
    }

    @Test
    @DisplayName("Debe calcular progreso y estado de desbloqueo para usuario autenticado")
    void testGetAllBadges_AuthenticatedUser() {
        when(badgeRepository.findAll()).thenReturn(List.of(badge1, badge2));

        UserBadge ub = new UserBadge(user, badge1);
        ub.setAwardedAt(LocalDateTime.now().minusDays(1));
        when(userBadgeRepository.findByUserId(user.getId())).thenReturn(List.of(ub));

        UserStats stats = new UserStats(user);
        stats.setTotalTrips(10);
        stats.setTotalCo2SavedKg(25.0);
        when(userStatsRepository.findByUserId(user.getId())).thenReturn(Optional.of(stats));

        List<BadgeDetailDTO> result = badgeService.getAllBadgesForUser(user);

        assertEquals(2, result.size());

        // badge1 está desbloqueada
        BadgeDetailDTO b1DTO = result.stream().filter(b -> b.id().equals(1L)).findFirst().orElseThrow();
        assertTrue(b1DTO.unlocked());
        assertEquals(100, b1DTO.progressPercentage());
        assertNotNull(b1DTO.awardedAt());

        // badge2 está bloqueada con progreso proporcional
        BadgeDetailDTO b2DTO = result.stream().filter(b -> b.id().equals(2L)).findFirst().orElseThrow();
        assertFalse(b2DTO.unlocked());
        assertTrue(b2DTO.progressPercentage() > 0 && b2DTO.progressPercentage() < 100);
    }

    @Test
    @DisplayName("Debe retornar únicamente las medallas obtenidas del usuario en my-badges")
    void testGetMyBadges() {
        UserBadge ub = new UserBadge(user, badge1);
        ub.setAwardedAt(LocalDateTime.now());
        when(userBadgeRepository.findByUserId(user.getId())).thenReturn(List.of(ub));

        List<BadgeAwardDTO> result = badgeService.getMyBadges(user.getId());

        assertEquals(1, result.size());
        assertEquals("FIRST_STEP", result.get(0).code());
        assertEquals("Primer Paso Verde", result.get(0).title());
    }

    @Test
    @DisplayName("Debe lanzar excepción si se busca una medalla inexistente por ID")
    void testGetBadgeById_NotFound() {
        when(badgeRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class, () -> badgeService.getBadgeById(999L, user));
    }
}
