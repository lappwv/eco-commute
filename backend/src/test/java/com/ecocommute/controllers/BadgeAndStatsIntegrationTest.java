package com.ecocommute.controllers;

import com.ecocommute.entities.Role;
import com.ecocommute.entities.User;
import com.ecocommute.repositories.UserRepository;
import com.ecocommute.security.JwtTokenUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class BadgeAndStatsIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserRepository userRepository;

    private String userToken;
    private User testUser;

    @BeforeEach
    void setUp() {
        testUser = userRepository.findByEmail("odar.test@ecocommute.pe").orElseGet(() -> {
            User u = new User();
            u.setEmail("odar.test@ecocommute.pe");
            u.setFullName("Odar Alcocer Test");
            u.setRole(Role.ROLE_USER);
            u.setActive(true);
            u.setCurrentPoints(100);
            return userRepository.save(u);
        });

        userToken = "Bearer " + jwtTokenUtil.generateToken(testUser);
    }

    @Test
    @DisplayName("GET /api/v1/badges - Debe responder 200 OK con catalogo de medallas para visitantes")
    void testGetBadgesAnonymous() throws Exception {
        mockMvc.perform(get("/api/v1/badges"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    @DisplayName("GET /api/v1/badges?status=UNLOCKED - Debe filtrar medallas por estado")
    void testGetBadgesFilter() throws Exception {
        mockMvc.perform(get("/api/v1/badges").param("status", "UNLOCKED").header("Authorization", userToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    @DisplayName("GET /api/v1/badges/my-badges - Debe responder 401 sin autenticar")
    void testGetMyBadgesUnauthenticated() throws Exception {
        mockMvc.perform(get("/api/v1/badges/my-badges"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("GET /api/v1/badges/my-badges - Debe responder 200 con token de usuario")
    void testGetMyBadgesAuthenticated() throws Exception {
        mockMvc.perform(get("/api/v1/badges/my-badges").header("Authorization", userToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    @DisplayName("POST /api/v1/badges/sync - Debe reevaluar medallas y responder 200 OK")
    void testSyncBadges() throws Exception {
        mockMvc.perform(post("/api/v1/badges/sync").header("Authorization", userToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    @DisplayName("GET /api/v1/stats/summary - Debe responder 200 OK de forma publica")
    void testGetStatsSummary() throws Exception {
        mockMvc.perform(get("/api/v1/stats/summary"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalCo2SavedTons").exists());
    }

    @Test
    @DisplayName("GET /api/v1/stats/me - Debe responder 200 OK con metricas avanzadas para usuario autenticado")
    void testGetMyStats() throws Exception {
        mockMvc.perform(get("/api/v1/stats/me").header("Authorization", userToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.userId").value(testUser.getId()))
                .andExpect(jsonPath("$.treesEquivalent").exists())
                .andExpect(jsonPath("$.gasolineLitersSaved").exists())
                .andExpect(jsonPath("$.kwhEquivalent").exists())
                .andExpect(jsonPath("$.ecoScore").exists());
    }

    @Test
    @DisplayName("GET /api/v1/stats/breakdown - Debe responder 200 OK con desglose de transportes")
    void testGetStatsBreakdown() throws Exception {
        mockMvc.perform(get("/api/v1/stats/breakdown").header("Authorization", userToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    @DisplayName("GET /api/v1/stats/certificate - Debe responder 200 OK con certificado y codigo de verificacion")
    void testGetCertificate() throws Exception {
        mockMvc.perform(get("/api/v1/stats/certificate").header("Authorization", userToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.certificateId").exists())
                .andExpect(jsonPath("$.verificationCode").exists())
                .andExpect(jsonPath("$.holderName").value("Odar Alcocer Test"))
                .andExpect(jsonPath("$.summaryStatement").exists());
    }

    @Test
    @DisplayName("GET /api/v1/stats/report - Debe responder 200 OK con reporte integral y recomendaciones")
    void testGetImpactReport() throws Exception {
        mockMvc.perform(get("/api/v1/stats/report").header("Authorization", userToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.userId").value(testUser.getId()))
                .andExpect(jsonPath("$.lifetimeStats").exists())
                .andExpect(jsonPath("$.ecoRecommendation").exists());
    }
}
