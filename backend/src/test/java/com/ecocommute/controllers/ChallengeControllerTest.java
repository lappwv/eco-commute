package com.ecocommute.controllers;

import com.ecocommute.entities.Challenge;
import com.ecocommute.entities.Role;
import com.ecocommute.entities.User;
import com.ecocommute.repositories.ChallengeRepository;
import com.ecocommute.repositories.UserRepository;
import com.ecocommute.security.JwtTokenUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Prueba de integracion de retos sostenibles (HU13): consulta publica de
 * retos activos y CRUD de administracion, pasando por Spring Security real
 * (JWT), siguiendo el mismo estilo que {@link RewardControllerTest} y
 * {@link com.ecocommute.security.SecurityIntegrationTest}.
 *
 * No existia ninguna prueba para ChallengeController ni para el CRUD de
 * challenges en AdminController antes de esta clase.
 *
 * Se usa @Transactional para que cada test haga rollback automatico y no
 * afecte a otras clases de test que comparten la misma instancia H2.
 */
@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class ChallengeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ChallengeRepository challengeRepository;

    private String testUserToken;
    private String adminToken;
    private Challenge activeChallenge;
    private Challenge inactiveChallenge;

    @BeforeEach
    void setUp() {
        User testUser = new User("challenge-test@ecocommute.org", "N/A", "Usuario de Prueba Challenges", Role.ROLE_USER);
        testUser = userRepository.save(testUser);
        testUserToken = jwtTokenUtil.generateToken(testUser);

        User adminUser = new User("challenge-admin-test@ecocommute.org", "N/A", "Admin de Prueba Challenges", Role.ROLE_ADMIN);
        adminUser = userRepository.save(adminUser);
        adminToken = jwtTokenUtil.generateToken(adminUser);

        activeChallenge = new Challenge("Semana sin auto", "Reto de prueba activo", 5, "viajes",
                LocalDate.now().minusDays(1), LocalDate.now().plusDays(6));
        activeChallenge = challengeRepository.save(activeChallenge);

        inactiveChallenge = new Challenge("Reto vencido", "Reto de prueba inactivo", 3, "viajes",
                LocalDate.now().minusDays(30), LocalDate.now().minusDays(10));
        inactiveChallenge.setActive(false);
        inactiveChallenge = challengeRepository.save(inactiveChallenge);
    }

    @Test
    @DisplayName("GET /api/v1/challenges sin token debe rechazarse con 401")
    void getChallengesWithoutTokenIsUnauthorized() throws Exception {
        mockMvc.perform(get("/api/v1/challenges"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("GET /api/v1/challenges autenticado solo devuelve retos activos")
    void getChallengesReturnsOnlyActiveOnes() throws Exception {
        mockMvc.perform(get("/api/v1/challenges")
                        .header("Authorization", "Bearer " + testUserToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[?(@.title == 'Semana sin auto')]").exists())
                .andExpect(jsonPath("$[?(@.title == 'Reto vencido')]").doesNotExist());
    }

    @Test
    @DisplayName("Un usuario normal no puede acceder a /api/v1/admin/challenges")
    void nonAdminCannotAccessAdminChallenges() throws Exception {
        mockMvc.perform(get("/api/v1/admin/challenges")
                        .header("Authorization", "Bearer " + testUserToken))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("Un admin puede crear un reto con un periodo valido")
    void adminCanCreateChallengeWithValidPeriod() throws Exception {
        String body = """
                {
                  "title": "Pedalea en octubre",
                  "description": "Reto mensual de bicicleta",
                  "goalValue": 10,
                  "goalUnit": "viajes",
                  "periodStart": "%s",
                  "periodEnd": "%s",
                  "active": true
                }
                """.formatted(LocalDate.now(), LocalDate.now().plusDays(30));

        mockMvc.perform(post("/api/v1/admin/challenges")
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Pedalea en octubre"))
                .andExpect(jsonPath("$.goalValue").value(10));
    }

    @Test
    @DisplayName("Crear un reto con el fin del periodo antes del inicio responde 400")
    void adminCreateChallengeWithInvalidPeriodIsRejected() throws Exception {
        String body = """
                {
                  "title": "Reto con fechas invertidas",
                  "description": "No deberia crearse",
                  "goalValue": 5,
                  "goalUnit": "viajes",
                  "periodStart": "%s",
                  "periodEnd": "%s",
                  "active": true
                }
                """.formatted(LocalDate.now(), LocalDate.now().minusDays(5));

        mockMvc.perform(post("/api/v1/admin/challenges")
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("BAD_REQUEST"))
                .andExpect(jsonPath("$.message").value(
                        org.hamcrest.Matchers.containsString("anterior al inicio")));
    }

    @Test
    @DisplayName("Crear un reto sin titulo responde 400 con error de validacion")
    void adminCreateChallengeWithBlankTitleIsRejected() throws Exception {
        String body = """
                {
                  "title": "",
                  "description": "Sin titulo",
                  "goalValue": 5,
                  "goalUnit": "viajes",
                  "periodStart": "%s",
                  "periodEnd": "%s",
                  "active": true
                }
                """.formatted(LocalDate.now(), LocalDate.now().plusDays(10));

        mockMvc.perform(post("/api/v1/admin/challenges")
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("VALIDATION_ERROR"))
                .andExpect(jsonPath("$.details.title").exists());
    }

    @Test
    @DisplayName("Un admin puede actualizar un reto existente")
    void adminCanUpdateExistingChallenge() throws Exception {
        String body = """
                {
                  "title": "Semana sin auto (actualizado)",
                  "description": "Descripcion actualizada",
                  "goalValue": 8,
                  "goalUnit": "viajes",
                  "periodStart": "%s",
                  "periodEnd": "%s",
                  "active": true
                }
                """.formatted(LocalDate.now(), LocalDate.now().plusDays(14));

        mockMvc.perform(put("/api/v1/admin/challenges/{id}", activeChallenge.getId())
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Semana sin auto (actualizado)"))
                .andExpect(jsonPath("$.goalValue").value(8));
    }

    @Test
    @DisplayName("Actualizar un reto inexistente responde 400")
    void updatingNonExistentChallengeIsRejected() throws Exception {
        String body = """
                {
                  "title": "No existe",
                  "description": "No deberia encontrarse",
                  "goalValue": 1,
                  "goalUnit": "viajes",
                  "periodStart": "%s",
                  "periodEnd": "%s",
                  "active": true
                }
                """.formatted(LocalDate.now(), LocalDate.now().plusDays(1));

        mockMvc.perform(put("/api/v1/admin/challenges/{id}", 999999L)
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("BAD_REQUEST"))
                .andExpect(jsonPath("$.message").value(
                        org.hamcrest.Matchers.containsString("Reto no encontrado")));
    }

    @Test
    @DisplayName("Un admin puede eliminar un reto existente")
    void adminCanDeleteChallenge() throws Exception {
        mockMvc.perform(delete("/api/v1/admin/challenges/{id}", activeChallenge.getId())
                        .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isNoContent());

        org.junit.jupiter.api.Assertions.assertTrue(
                challengeRepository.findById(activeChallenge.getId()).isEmpty());
    }

    @Test
    @DisplayName("Eliminar un reto inexistente responde 400")
    void deletingNonExistentChallengeIsRejected() throws Exception {
        mockMvc.perform(delete("/api/v1/admin/challenges/{id}", 999999L)
                        .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("BAD_REQUEST"))
                .andExpect(jsonPath("$.message").value(
                        org.hamcrest.Matchers.containsString("Reto no encontrado")));
    }
}