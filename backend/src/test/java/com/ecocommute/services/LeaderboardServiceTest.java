package com.ecocommute.services;

import com.ecocommute.dto.LeaderboardEntryDTO;
import com.ecocommute.entities.Role;
import com.ecocommute.entities.User;
import com.ecocommute.entities.UserStats;
import com.ecocommute.repositories.UserStatsRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class LeaderboardServiceTest {

    @Mock
    private UserStatsRepository userStatsRepository;

    private LeaderboardService leaderboardService;

    private UserStats statsElena;
    private UserStats statsMateo;

    @BeforeEach
    void setUp() {
        leaderboardService = new LeaderboardService(userStatsRepository);

        User elena = new User("elena@test.com", "pass", "Elena Rojas", Role.ROLE_USER);
        elena.setId("u-1");
        elena.setDistrict("Miraflores");
        elena.setCurrentPoints(450);
        elena.setStreakDays(14);
        statsElena = new UserStats(elena);
        statsElena.setTotalCo2SavedKg(32.5);
        statsElena.setTotalDistanceKm(120.0);
        statsElena.setTotalTrips(15);
        statsElena.setTotalCaloriesBurned(3400);

        User mateo = new User("mateo@test.com", "pass", "Mateo Paz", Role.ROLE_USER);
        mateo.setId("u-2");
        mateo.setDistrict("Miraflores");
        mateo.setCurrentPoints(600);
        mateo.setStreakDays(20);
        statsMateo = new UserStats(mateo);
        statsMateo.setTotalCo2SavedKg(25.0);
        statsMateo.setTotalDistanceKm(95.0);
        statsMateo.setTotalTrips(10);
        statsMateo.setTotalCaloriesBurned(2800);
    }

    @Test
    @DisplayName("HU08: Ranking global por defecto ordenado por CO2")
    void testGetLeaderboard_defaultByCo2() {
        when(userStatsRepository.findTopEcoUsers()).thenReturn(List.of(statsElena, statsMateo));

        List<LeaderboardEntryDTO> ranking = leaderboardService.getLeaderboard();

        assertNotNull(ranking);
        assertEquals(2, ranking.size());
        assertEquals("Elena Rojas", ranking.get(0).fullName());
        assertEquals(1, ranking.get(0).rank());
        assertEquals(32.5, ranking.get(0).totalCo2SavedKg());

        assertEquals("Mateo Paz", ranking.get(1).fullName());
        assertEquals(2, ranking.get(1).rank());
        assertEquals(25.0, ranking.get(1).totalCo2SavedKg());

        verify(userStatsRepository).findTopEcoUsers();
    }

    @Test
    @DisplayName("HU08: Ranking global ordenado por puntos")
    void testGetLeaderboard_byPoints() {
        when(userStatsRepository.findTopEcoUsersOrderByPoints()).thenReturn(List.of(statsMateo, statsElena));

        List<LeaderboardEntryDTO> ranking = leaderboardService.getLeaderboard("points");

        assertNotNull(ranking);
        assertEquals(2, ranking.size());
        assertEquals("Mateo Paz", ranking.get(0).fullName());
        assertEquals(1, ranking.get(0).rank());
        assertEquals(600, ranking.get(0).currentPoints());

        assertEquals("Elena Rojas", ranking.get(1).fullName());
        assertEquals(2, ranking.get(1).rank());
        assertEquals(450, ranking.get(1).currentPoints());

        verify(userStatsRepository).findTopEcoUsersOrderByPoints();
    }

    @Test
    @DisplayName("HU08: Ranking por distrito con filtro insensible a mayúsculas y espacios")
    void testGetLeaderboardByDistrict_trimmedAndCaseInsensitive() {
        when(userStatsRepository.findTopEcoUsersByDistrict("Miraflores"))
                .thenReturn(List.of(statsElena, statsMateo));

        List<LeaderboardEntryDTO> ranking = leaderboardService.getLeaderboardByDistrict("  Miraflores  ");

        assertNotNull(ranking);
        assertEquals(2, ranking.size());
        assertEquals("Miraflores", ranking.get(0).district());
        verify(userStatsRepository).findTopEcoUsersByDistrict("Miraflores");
    }

    @Test
    @DisplayName("HU08: Ranking por distrito ordenado por puntos")
    void testGetLeaderboardByDistrict_byPoints() {
        when(userStatsRepository.findTopEcoUsersByDistrictOrderByPoints("Miraflores"))
                .thenReturn(List.of(statsMateo, statsElena));

        List<LeaderboardEntryDTO> ranking = leaderboardService.getLeaderboardByDistrict("Miraflores", "points");

        assertNotNull(ranking);
        assertEquals(2, ranking.size());
        assertEquals("Mateo Paz", ranking.get(0).fullName());
        assertEquals(1, ranking.get(0).rank());
        verify(userStatsRepository).findTopEcoUsersByDistrictOrderByPoints("Miraflores");
    }

    @Test
    @DisplayName("HU08: Distrito nulo o en blanco redirige al ranking global")
    void testGetLeaderboardByDistrict_nullOrBlankDelegatesToGlobal() {
        when(userStatsRepository.findTopEcoUsers()).thenReturn(List.of(statsElena));

        List<LeaderboardEntryDTO> rankingNull = leaderboardService.getLeaderboardByDistrict(null, "co2");
        List<LeaderboardEntryDTO> rankingBlank = leaderboardService.getLeaderboardByDistrict("   ", "co2");

        assertEquals(1, rankingNull.size());
        assertEquals(1, rankingBlank.size());
        verify(userStatsRepository, times(2)).findTopEcoUsers();
    }

    @Test
    @DisplayName("HU08: Validación de criterio de ordenamiento desconocido lanza IllegalArgumentException")
    void testInvalidSortBy_throwsIllegalArgumentException() {
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () ->
                leaderboardService.getLeaderboard("velocidad")
        );
        assertTrue(exception.getMessage().contains("Criterio de ordenamiento invalido"));

        assertThrows(IllegalArgumentException.class, () ->
                leaderboardService.getLeaderboardByDistrict("Miraflores", "desconocido")
        );
    }

    @Test
    @DisplayName("HU08: Validación de longitud de nombre de distrito (> 80 caracteres) lanza excepción")
    void testExcessiveDistrictLength_throwsIllegalArgumentException() {
        String longDistrict = "A".repeat(81);
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () ->
                leaderboardService.getLeaderboardByDistrict(longDistrict, "co2")
        );
        assertTrue(exception.getMessage().contains("no puede superar los 80 caracteres"));
    }

    @Test
    @DisplayName("HU08: Listado de distritos activos")
    void testGetDistricts() {
        when(userStatsRepository.findActiveDistricts()).thenReturn(List.of("Barranco", "Miraflores", "San Isidro"));

        List<String> districts = leaderboardService.getDistricts();

        assertNotNull(districts);
        assertEquals(3, districts.size());
        assertTrue(districts.contains("Miraflores"));
        verify(userStatsRepository).findActiveDistricts();
    }

    @Test
    @DisplayName("HU08: Lista vacía de usuarios genera ranking vacío sin errores")
    void testBuildRanking_empty() {
        when(userStatsRepository.findTopEcoUsers()).thenReturn(List.of());

        List<LeaderboardEntryDTO> ranking = leaderboardService.getLeaderboard();

        assertNotNull(ranking);
        assertTrue(ranking.isEmpty());
    }
}
