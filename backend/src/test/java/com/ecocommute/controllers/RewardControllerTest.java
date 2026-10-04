package com.ecocommute.controllers;

import com.ecocommute.entities.Reward;
import com.ecocommute.entities.Role;
import com.ecocommute.entities.User;
import com.ecocommute.repositories.RewardRepository;
import com.ecocommute.repositories.UserRepository;
import com.ecocommute.security.JwtTokenUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Prueba de integracion del flujo completo de recompensas (HU12/HU14):
 * catalogo -> canje -> historial, pasando por Spring Security real (JWT)
 * en vez de mockear el servicio, siguiendo el mismo estilo que
 * {@link com.ecocommute.security.SecurityIntegrationTest}.
 *
 * Se usa @Transactional para que cada test haga rollback automatico al
 * terminar: como el proyecto comparte una sola instancia H2 en memoria
 * entre clases de test (ver application.yml de test), esto evita que los
 * puntos o canjes que creamos aqui queden "pegados" y afecten otras
 * pruebas que corran despues.
 */
@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class RewardControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RewardRepository rewardRepository;

    private User testUser;
    private String testUserToken;
    private Reward testReward;

    @BeforeEach
    void setUp() {
        // Usuario propio para esta prueba (no el "demo@ecocommute.org" que
        // usan otros tests), para no depender de ni interferir con el
        // puntaje que manejen otras clases de test.
        testUser = new User("reward-test@ecocommute.org", "N/A", "Usuario de Prueba Rewards", Role.ROLE_USER);
        testUser.setCurrentPoints(100);
        testUser = userRepository.save(testUser);
        testUserToken = jwtTokenUtil.generateToken(testUser);

        testReward = new Reward("TEST_VOUCHER_50", "Vale de prueba", "Vale usado solo en tests", 50, "ticket");
        testReward = rewardRepository.save(testReward);
    }

    @Test
    @DisplayName("GET /api/v1/rewards sin token debe rechazarse con 401")
    void getRewardsWithoutTokenIsUnauthorized() throws Exception {
        mockMvc.perform(get("/api/v1/rewards"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("GET /api/v1/rewards autenticado debe incluir la recompensa activa creada en la prueba")
    void getRewardsReturnsActiveCatalog() throws Exception {
        mockMvc.perform(get("/api/v1/rewards")
                        .header("Authorization", "Bearer " + testUserToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[?(@.code == 'TEST_VOUCHER_50')]").exists());
    }

    @Test
    @DisplayName("Canjear una recompensa descuenta los puntos y queda en el historial")
    void redeemRewardDeductsPointsAndAppearsInHistory() throws Exception {
        mockMvc.perform(post("/api/v1/rewards/{id}/redeem", testReward.getId())
                        .header("Authorization", "Bearer " + testUserToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.redemption.rewardCode").value("TEST_VOUCHER_50"))
                .andExpect(jsonPath("$.redemption.pointsUsed").value(50))
                .andExpect(jsonPath("$.redemption.status").value("COMPLETED"));

        mockMvc.perform(get("/api/v1/redemptions")
                        .header("Authorization", "Bearer " + testUserToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].rewardCode").value("TEST_VOUCHER_50"))
                .andExpect(jsonPath("$[0].pointsUsed").value(50));

        User reloaded = userRepository.findById(testUser.getId()).orElseThrow();
        org.junit.jupiter.api.Assertions.assertEquals(50, reloaded.getCurrentPoints());
    }

    @Test
    @DisplayName("Canjear sin puntos suficientes responde 400 con mensaje claro")
    void redeemRewardWithInsufficientPointsIsRejected() throws Exception {
        testUser.setCurrentPoints(10);
        userRepository.save(testUser);

        mockMvc.perform(post("/api/v1/rewards/{id}/redeem", testReward.getId())
                        .header("Authorization", "Bearer " + testUserToken))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("BAD_REQUEST"))
                .andExpect(jsonPath("$.message").value(
                        org.hamcrest.Matchers.containsString("suficientes puntos")));
    }

    @Test
    @DisplayName("Canjear una recompensa inexistente responde 400")
    void redeemNonExistentRewardIsRejected() throws Exception {
        mockMvc.perform(post("/api/v1/rewards/{id}/redeem", 999999L)
                        .header("Authorization", "Bearer " + testUserToken))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("BAD_REQUEST"));
    }
}