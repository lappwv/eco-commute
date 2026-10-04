package com.ecocommute.controllers;

import com.ecocommute.entities.*;
import com.ecocommute.repositories.*;
import com.ecocommute.security.JwtTokenUtil;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.EnumSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class TripControllerTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper objectMapper;
    @Autowired private JwtTokenUtil jwtTokenUtil;
    @Autowired private UserRepository userRepository;
    @Autowired private TripRepository tripRepository;
    @Autowired private UserStatsRepository userStatsRepository;
    @Autowired private UserBadgeRepository userBadgeRepository;
    @Autowired private BadgeRepository badgeRepository;

    private User user;
    private String token;

    @BeforeEach
    void setUp() {
        user = userRepository.save(new User(
                UUID.randomUUID() + "@example.test", "unused", "Usuario de prueba", Role.ROLE_USER));
        token = jwtTokenUtil.generateToken(user);
    }

    @ParameterizedTest
    @EnumSource(TransportMode.class)
    void recordTripPersistsOwnerAndCo2AndUpdatesProgress(TransportMode mode) throws Exception {
        Map<String, Object> request = validRequest();
        request.put("transportMode", mode.name());
        String tripId = recordTrip(request);

        Trip saved = tripRepository.findById(tripId).orElseThrow();
        double expectedBaseline = 10.0 * 170.0;
        double expectedEmission = 10.0 * mode.getCo2GramsPerKm();
        double expectedSaved = Math.max(0, expectedBaseline - expectedEmission);

        assertEquals(user.getId(), saved.getUser().getId());
        assertEquals(mode, saved.getTransportMode());
        assertEquals("Origen de prueba", saved.getOriginName());
        assertEquals("Destino de prueba", saved.getDestinationName());
        assertEquals(-12.0897, saved.getOriginLat(), 0.000001);
        assertEquals(-77.0285, saved.getDestinationLng(), 0.000001);
        assertEquals(10.0, saved.getDistanceKm(), 0.001);
        assertEquals(120, saved.getDurationMinutes());
        assertEquals(expectedBaseline, saved.getBaselineCo2Grams(), 0.001);
        assertEquals(expectedEmission, saved.getCo2EmittedGrams(), 0.001);
        assertEquals(expectedSaved, saved.getCo2SavedGrams(), 0.001);
        assertNotNull(saved.getCompletedAt());
        assertFalse(saved.isSuspicious());

        User refreshed = userRepository.findById(user.getId()).orElseThrow();
        UserStats stats = userStatsRepository.findByUserId(user.getId()).orElseThrow();
        assertEquals(saved.getPointsEarned(), refreshed.getCurrentPoints());
        assertEquals(1, refreshed.getStreakDays());
        assertEquals(expectedSaved / 1000, stats.getTotalCo2SavedKg(), 0.001);
        assertEquals(10.0, stats.getTotalDistanceKm(), 0.001);
        assertEquals(1, stats.getTotalTrips());
        assertEquals(saved.getCaloriesBurned(), stats.getTotalCaloriesBurned());

        if (mode.isSustainable()) {
            assertTrue(saved.getPointsEarned() > 0);
            Badge firstStep = badgeRepository.findAll().stream()
                    .filter(badge -> "FIRST_STEP".equals(badge.getCode())).findFirst().orElseThrow();
            assertTrue(userBadgeRepository.existsByUserIdAndBadgeId(user.getId(), firstStep.getId()));
        } else {
            assertEquals(0, saved.getPointsEarned());
        }
    }

    @Test
    void historyIsPrivatePaginatedAndOrderedByCompletion() throws Exception {
        String olderId = recordTrip(validRequest());
        Trip older = tripRepository.findById(olderId).orElseThrow();
        older.setCompletedAt(LocalDateTime.now().minusDays(1));
        tripRepository.saveAndFlush(older);
        String newerId = recordTrip(validRequest());

        User other = userRepository.save(new User(
                UUID.randomUUID() + "@example.test", "unused", "Otro usuario", Role.ROLE_USER));
        Trip otherTrip = new Trip();
        otherTrip.setUser(other);
        otherTrip.setTransportMode(TransportMode.WALKING);
        tripRepository.saveAndFlush(otherTrip);

        mockMvc.perform(get("/api/v1/trips/history").header("Authorization", "Bearer " + token)
                        .param("page", "0").param("size", "1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalElements").value(2))
                .andExpect(jsonPath("$.content.length()").value(1))
                .andExpect(jsonPath("$.content[0].id").value(newerId));
        mockMvc.perform(get("/api/v1/trips/history").header("Authorization", "Bearer " + token)
                        .param("page", "1").param("size", "1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].id").value(olderId));
    }

    @ParameterizedTest
    @CsvSource({
            "transportMode, NULL", "originName, BLANK", "destinationName, BLANK",
            "originLat, 91", "originLng, 181", "destinationLat, -91", "destinationLng, -181",
            "distanceKm, 0", "durationMinutes, 0"
    })
    void invalidTripIsRejectedWithoutPersistence(String field, String invalidValue) throws Exception {
        Map<String, Object> request = validRequest();
        request.put(field, switch (invalidValue) {
            case "NULL" -> null;
            case "BLANK" -> " ";
            default -> Double.parseDouble(invalidValue);
        });
        long tripsBefore = tripRepository.count();

        mockMvc.perform(post("/api/v1/trips").header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("VALIDATION_ERROR"))
                .andExpect(jsonPath("$.details." + field).exists());

        assertEquals(tripsBefore, tripRepository.count());
        assertEquals(0, user.getCurrentPoints());
        assertTrue(userStatsRepository.findByUserId(user.getId()).isEmpty());
    }

    @Test
    void anonymousUserCannotRegisterOrReadHistory() throws Exception {
        mockMvc.perform(post("/api/v1/trips").contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validRequest())))
                .andExpect(status().isUnauthorized());
        mockMvc.perform(get("/api/v1/trips/history")).andExpect(status().isUnauthorized());
        assertTrue(tripRepository.findByUserIdOrderByCompletedAtDesc(user.getId()).isEmpty());
    }

    @Test
    void normalUserCannotAccessAdministrativeTripOperations() throws Exception {
        String tripId = recordTrip(validRequest());
        String path = "/api/v1/trips/" + tripId;
        mockMvc.perform(get(path).header("Authorization", "Bearer " + token))
                .andExpect(status().isForbidden());
        mockMvc.perform(put(path).header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(validRequest())))
                .andExpect(status().isForbidden());
        mockMvc.perform(delete(path).header("Authorization", "Bearer " + token))
                .andExpect(status().isForbidden());
        assertTrue(tripRepository.existsById(tripId));
    }

    @Test
    void adminUpdatesMetricsAndDeletesTripWithoutChangingOwner() throws Exception {
        String tripId = recordTrip(validRequest());
        User admin = userRepository.findByEmail("admin@ecocommute.org").orElseThrow();
        String adminToken = jwtTokenUtil.generateToken(admin);
        String path = "/api/v1/trips/" + tripId;
        Map<String, Object> updatedRequest = validRequest();
        updatedRequest.put("distanceKm", 5.0);

        mockMvc.perform(put(path).header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(updatedRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.distanceKm").value(5.0))
                .andExpect(jsonPath("$.baselineCo2Grams").value(850.0))
                .andExpect(jsonPath("$.co2EmittedGrams").value(0.0))
                .andExpect(jsonPath("$.co2SavedGrams").value(850.0));
        mockMvc.perform(get(path).header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isOk()).andExpect(jsonPath("$.id").value(tripId));
        assertEquals(user.getId(), tripRepository.findById(tripId).orElseThrow().getUser().getId());
        UserStats stats = userStatsRepository.findByUserId(user.getId()).orElseThrow();
        assertEquals(5.0, stats.getTotalDistanceKm(), 0.001);
        assertEquals(0.85, stats.getTotalCo2SavedKg(), 0.001);
        assertEquals(1, stats.getTotalTrips());

        mockMvc.perform(delete(path).header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isNoContent());
        assertFalse(tripRepository.existsById(tripId));
        assertEquals(0, stats.getTotalTrips());
        assertEquals(0.0, stats.getTotalDistanceKm(), 0.001);
        assertEquals(0.0, stats.getTotalCo2SavedKg(), 0.001);
        assertEquals(0, userRepository.findById(user.getId()).orElseThrow().getCurrentPoints());
    }

    private String recordTrip(Map<String, Object> request) throws Exception {
        String response = mockMvc.perform(post("/api/v1/trips").header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk()).andExpect(jsonPath("$.id").isNotEmpty())
                .andReturn().getResponse().getContentAsString();
        JsonNode result = objectMapper.readTree(response);
        return result.get("id").asText();
    }

    private Map<String, Object> validRequest() {
        Map<String, Object> request = new LinkedHashMap<>();
        request.put("transportMode", "BICYCLE");
        request.put("originName", "Origen de prueba");
        request.put("originLat", -12.0897);
        request.put("originLng", -77.0543);
        request.put("destinationName", "Destino de prueba");
        request.put("destinationLat", -12.0965);
        request.put("destinationLng", -77.0285);
        request.put("distanceKm", 10.0);
        request.put("durationMinutes", 120);
        return request;
    }
}
