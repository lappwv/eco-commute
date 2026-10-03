package com.ecocommute.security;

import com.ecocommute.entities.Role;
import com.ecocommute.entities.User;
import com.ecocommute.repositories.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class SecurityIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserRepository userRepository;

    @Test
    @DisplayName("Endpoints pÃºblicos de consulta deben ser accesibles sin token")
    void testPublicEndpointsAccess() throws Exception {
        mockMvc.perform(get("/api/v1/dashboard/community-impact"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalCo2SavedTons").exists())
                .andExpect(jsonPath("$.totalActiveUsers").exists());
    }

    @Test
    @DisplayName("Registro con datos invalidos debe responder error de validacion")
    void testRegisterValidationError() throws Exception {
        String invalidRegisterJson = """
                {
                  "email": "correo-invalido",
                  "password": "123",
                  "fullName": ""
                }
                """;

        mockMvc.perform(post("/api/v1/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(invalidRegisterJson))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("VALIDATION_ERROR"))
                .andExpect(jsonPath("$.details.email").exists())
                .andExpect(jsonPath("$.details.password").exists())
                .andExpect(jsonPath("$.details.fullName").exists());
    }

    @Test
    @DisplayName("Acceso anÃ³nimo a /api/v1/admin/rewards debe ser rechazado con 401 Unauthorized")
    void testAnonymousAccessToAdminDenied() throws Exception {
        mockMvc.perform(get("/api/v1/admin/rewards"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("Usuario con ROLE_USER debe ser rechazado con 403 al intentar acceder a /api/v1/admin/**")
    void testUserRoleAccessToAdminDenied() throws Exception {
        User normalUser = userRepository.findByEmail("demo@ecocommute.org").orElseThrow();
        String userToken = jwtTokenUtil.generateToken(normalUser);

        mockMvc.perform(get("/api/v1/admin/rewards")
                        .header("Authorization", "Bearer " + userToken))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("Usuario con ROLE_ADMIN debe tener acceso 200 OK a /api/v1/admin/**")
    void testAdminRoleAccessGranted() throws Exception {
        User adminUser = userRepository.findByEmail("admin@ecocommute.org").orElseThrow();
        String adminToken = jwtTokenUtil.generateToken(adminUser);

        mockMvc.perform(get("/api/v1/admin/rewards")
                        .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON));
    }

    @Test
    @DisplayName("Token JWT manipulado o invalido debe ser rechazado")
    void testTamperedJwtRejected() throws Exception {
        String fakeToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.invalid.payload";

        mockMvc.perform(get("/api/v1/users/me")
                        .header("Authorization", "Bearer " + fakeToken))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("Login con credenciales invalidas debe responder 401 Unauthorized (HU02)")
    void testLoginInvalidCredentialsReturns401() throws Exception {
        String loginJson = """
                {
                  "email": "noexiste@ecocommute.org",
                  "password": "Secret123!"
                }
                """;

        mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginJson))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.code").value("UNAUTHORIZED"));
    }

    @Test
    @DisplayName("Registro con contrasena sin letra ni numero debe responder 400 (HU01)")
    void testWeakPasswordRegisterRejected() throws Exception {
        String weakPasswordJson = """
                {
                  "email": "debil@ecocommute.org",
                  "password": "abcdefgh",
                  "fullName": "Usuario Debil"
                }
                """;

        mockMvc.perform(post("/api/v1/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(weakPasswordJson))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("VALIDATION_ERROR"))
                .andExpect(jsonPath("$.details.password").exists());
    }

    @Test
    @DisplayName("Login con credenciales validas debe responder 200 y devolver el JWT (HU02)")
    void testLoginSuccessReturnsToken() throws Exception {
        String loginJson = """
                {
                  "email": "demo@ecocommute.org",
                  "password": "Demo123!"
                }
                """;

        mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").isNotEmpty())
                .andExpect(jsonPath("$.tokenType").value("Bearer"));
    }
}
