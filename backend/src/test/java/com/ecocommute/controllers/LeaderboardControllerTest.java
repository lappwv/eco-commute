package com.ecocommute.controllers;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class LeaderboardControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("HU08: Consulta pública de ranking global sin necesidad de token")
    void testGetLeaderboard_globalPublicAccess() throws Exception {
        mockMvc.perform(get("/api/v1/leaderboard")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", not(empty())))
                .andExpect(jsonPath("$[0].rank").value(1))
                .andExpect(jsonPath("$[0].userId").exists())
                .andExpect(jsonPath("$[0].fullName").exists())
                .andExpect(jsonPath("$[0].totalCo2SavedKg").exists())
                .andExpect(jsonPath("$[0].currentPoints").exists());
    }

    @Test
    @DisplayName("HU08: Filtro de ranking por distrito existente")
    void testGetLeaderboard_byDistrict() throws Exception {
        mockMvc.perform(get("/api/v1/leaderboard")
                        .param("district", "San Isidro")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", not(empty())))
                .andExpect(jsonPath("$[*].district", everyItem(equalToIgnoringCase("San Isidro"))));
    }

    @Test
    @DisplayName("HU08: Filtro por distrito insensible a mayúsculas/minúsculas y espacios")
    void testGetLeaderboard_byDistrictCaseInsensitive() throws Exception {
        mockMvc.perform(get("/api/v1/leaderboard")
                        .param("district", "  san isidro  ")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", not(empty())))
                .andExpect(jsonPath("$[*].district", everyItem(equalToIgnoringCase("San Isidro"))));
    }

    @Test
    @DisplayName("HU08: Consulta de ranking ordenado por puntos acumulados")
    void testGetLeaderboard_sortByPoints() throws Exception {
        mockMvc.perform(get("/api/v1/leaderboard")
                        .param("sortBy", "points")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", not(empty())))
                .andExpect(jsonPath("$[0].rank").value(1));
    }

    @Test
    @DisplayName("HU08: Consulta de ranking por distrito ordenado por puntos")
    void testGetLeaderboard_byDistrictAndPoints() throws Exception {
        mockMvc.perform(get("/api/v1/leaderboard")
                        .param("district", "San Isidro")
                        .param("sortBy", "points")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", not(empty())))
                .andExpect(jsonPath("$[*].district", everyItem(equalToIgnoringCase("San Isidro"))));
    }

    @Test
    @DisplayName("HU08: Parámetro de ordenamiento inválido retorna 400 Bad Request")
    void testGetLeaderboard_invalidSortByReturnsBadRequest() throws Exception {
        mockMvc.perform(get("/api/v1/leaderboard")
                        .param("sortBy", "invalido")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("BAD_REQUEST"))
                .andExpect(jsonPath("$.message", containsString("Criterio de ordenamiento invalido")));
    }

    @Test
    @DisplayName("HU08: Nombre de distrito excesivamente largo retorna 400 Bad Request")
    void testGetLeaderboard_excessiveDistrictLengthReturnsBadRequest() throws Exception {
        String excessiveDistrict = "A".repeat(85);
        mockMvc.perform(get("/api/v1/leaderboard")
                        .param("district", excessiveDistrict)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("BAD_REQUEST"))
                .andExpect(jsonPath("$.message", containsString("no puede superar los 80 caracteres")));
    }

    @Test
    @DisplayName("HU08: Listado de distritos activos retorna HTTP 200 y array con distritos")
    void testGetDistricts_returnsActiveDistricts() throws Exception {
        mockMvc.perform(get("/api/v1/leaderboard/districts")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", not(empty())))
                .andExpect(jsonPath("$", hasItem("San Isidro")));
    }
}
