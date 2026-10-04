package com.ecocommute.controllers;

import com.ecocommute.entities.Role;
import com.ecocommute.entities.TransportMode;
import com.ecocommute.entities.Trip;
import com.ecocommute.entities.User;
import com.ecocommute.repositories.TripRepository;
import com.ecocommute.repositories.UserRepository;
import com.ecocommute.repositories.UserStatsRepository;
import com.ecocommute.security.JwtTokenUtil;
import com.ecocommute.services.GamificationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class DashboardControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserStatsRepository userStatsRepository;

    @Autowired
    private TripRepository tripRepository;

    @Autowired
    private GamificationService gamificationService;

    private User testUser;
    private String userToken;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setEmail("dashboard_user_" + UUID.randomUUID() + "@ecocommute.org");
        testUser.setPassword("Password123!");
        testUser.setFullName("Usuario Dashboard Test");
        testUser.setRole(Role.ROLE_USER);
        testUser.setDistrict("Miraflores");
        testUser.setAvatarUrl("https://api.dicebear.com/7.x/bottts/svg?seed=dash");
        testUser = userRepository.save(testUser);

        userToken = jwtTokenUtil.generateToken(testUser);

        // Record a test trip for this user to validate personal metrics
        Trip trip = new Trip();
        trip.setTransportMode(TransportMode.BICYCLE);
        trip.setOriginName("Parque Kennedy");
        trip.setOriginLat(-12.1215);
        trip.setOriginLng(-77.0298);
        trip.setDestinationName("Larcomar");
        trip.setDestinationLat(-12.1310);
        trip.setDestinationLng(-77.0290);
        trip.setDistanceKm(5.0);
        trip.setDurationMinutes(20);
        gamificationService.recordTrip(testUser.getId(), trip);
    }

    @Autowired
    private com.fasterxml.jackson.databind.ObjectMapper objectMapper;

    @Test
    @DisplayName("HU07: GET /api/v1/dashboard/summary autenticado retorna 200 con KPIs, historial y evolución semanal")
    void testGetUserDashboard_authenticated_returns200AndSummary() throws Exception {
        String responseJson = mockMvc.perform(get("/api/v1/dashboard/summary")
                        .header("Authorization", "Bearer " + userToken)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.userId").value(testUser.getId()))
                .andExpect(jsonPath("$.fullName").value("Usuario Dashboard Test"))
                .andExpect(jsonPath("$.email").value(testUser.getEmail()))
                .andExpect(jsonPath("$.totalCo2SavedKg").isNumber())
                .andExpect(jsonPath("$.totalDistanceKm").isNumber())
                .andExpect(jsonPath("$.totalTrips").value(greaterThanOrEqualTo(1)))
                .andExpect(jsonPath("$.currentPoints").value(greaterThan(0)))
                .andExpect(jsonPath("$.currentLevel").value(greaterThanOrEqualTo(1)))
                .andExpect(jsonPath("$.totalCaloriesBurned").value(greaterThan(0)))
                .andExpect(jsonPath("$.treesEquivalent").isNumber())
                .andExpect(jsonPath("$.weeklyTrend").isArray())
                .andExpect(jsonPath("$.weeklyTrend", hasSize(7)))
                .andExpect(jsonPath("$.weeklyTrend[0].dayOfWeek").exists())
                .andExpect(jsonPath("$.weeklyTrend[0].co2SavedGrams").isNumber())
                .andExpect(jsonPath("$.tripsByMode.BICYCLE").value(greaterThanOrEqualTo(1)))
                .andExpect(jsonPath("$.recentBadges").isArray())
                .andExpect(jsonPath("$.recentBadges", not(empty())))
                .andReturn().getResponse().getContentAsString();

        com.fasterxml.jackson.databind.JsonNode root = objectMapper.readTree(responseJson);
        org.junit.jupiter.api.Assertions.assertTrue(root.get("totalCo2SavedKg").asDouble() > 0.0);
        org.junit.jupiter.api.Assertions.assertTrue(root.get("totalDistanceKm").asDouble() >= 5.0);
        org.junit.jupiter.api.Assertions.assertTrue(root.get("treesEquivalent").asDouble() > 0.0);
    }

    @Test
    @DisplayName("HU07: GET /api/v1/dashboard/summary sin token debe responder 401 Unauthorized")
    void testGetUserDashboard_unauthenticated_returns401() throws Exception {
        mockMvc.perform(get("/api/v1/dashboard/summary")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("HU07: GET /api/v1/dashboard/summary con token manipulado debe responder 401 Unauthorized")
    void testGetUserDashboard_tamperedToken_returns401() throws Exception {
        mockMvc.perform(get("/api/v1/dashboard/summary")
                        .header("Authorization", "Bearer invalid.fake.token")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("HU07: GET /api/v1/dashboard/community-impact es público y devuelve métricas acumuladas de la comunidad")
    void testGetCommunityImpact_publicAccess_returns200() throws Exception {
        mockMvc.perform(get("/api/v1/dashboard/community-impact")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalCo2SavedTons").isNumber())
                .andExpect(jsonPath("$.totalCleanKm").isNumber())
                .andExpect(jsonPath("$.totalTrips").isNumber())
                .andExpect(jsonPath("$.totalActiveUsers").isNumber())
                .andExpect(jsonPath("$.totalTreesEquivalent").isNumber());
    }

    @Test
    @DisplayName("HU07: Confirma que GET /api/v1/dashboard/community fue retirado y no se reintroduce")
    void testDeprecatedCommunityEndpoint_isNotRecreated() throws Exception {
        mockMvc.perform(get("/api/v1/dashboard/community")
                        .header("Authorization", "Bearer " + userToken)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }
}
