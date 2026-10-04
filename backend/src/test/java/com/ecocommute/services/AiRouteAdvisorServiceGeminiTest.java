package com.ecocommute.services;

import com.ecocommute.dto.AiInsightDTO;
import com.ecocommute.entities.TransportMode;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.web.client.RestClient;

import java.time.Clock;
import java.time.Instant;
import java.time.ZoneId;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.content;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.method;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withServerError;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

class AiRouteAdvisorServiceGeminiTest {

    private static final ZoneId LIMA = ZoneId.of("America/Lima");
    private static final String GEMINI_URL_PREFIX =
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-test-model:generateContent";

    private MockRestServiceServer server;
    private AiRouteAdvisorService advisor;

    @BeforeEach
    void setUp() {
        RestClient.Builder builder = RestClient.builder();
        server = MockRestServiceServer.bindTo(builder).build();
        advisor = withClock(builder.build(), clockAtLimaHour(12));
        ReflectionTestUtils.setField(advisor, "geminiApiKey", "test-key");
        ReflectionTestUtils.setField(advisor, "geminiModel", "gemini-test-model");
        ReflectionTestUtils.setField(advisor, "openAiApiKey", "");
    }

    @Test
    @DisplayName("HU09: La zona horaria por defecto del asesor es America/Lima (el servidor corre en UTC)")
    void defaultClock_usesLimaTimezone() {
        AiRouteAdvisorService defaultAdvisor = new AiRouteAdvisorService();
        Clock clock = (Clock) ReflectionTestUtils.getField(defaultAdvisor, "clock");
        assertNotNull(clock);
        assertEquals(LIMA, clock.getZone());
    }

    @Test
    @DisplayName("HU09: Gemini disponible -> usa su texto y el prompt solo contiene datos reales de la ruta")
    void gemini_success_usesGeminiTextAndGroundedPrompt() {
        server.expect(requestTo(org.hamcrest.Matchers.startsWith(GEMINI_URL_PREFIX)))
                .andExpect(method(HttpMethod.POST))
                .andExpect(content().string(org.hamcrest.Matchers.containsString("5.00 km")))
                .andExpect(content().string(org.hamcrest.Matchers.containsString("850 g")))
                .andExpect(content().string(org.hamcrest.Matchers.containsString("18 min")))
                .andExpect(content().string(org.hamcrest.Matchers.containsString("hora punta: no")))
                .andExpect(content().string(org.hamcrest.Matchers.not(org.hamcrest.Matchers.containsString("arboladas"))))
                .andRespond(withSuccess(
                        "{\"candidates\":[{\"content\":{\"parts\":[{\"text\":\"  Pedalea limpio\\nAhorras 0.85 kg de CO2.  \"}]}}]}",
                        MediaType.APPLICATION_JSON));

        AiInsightDTO insight = advisor.generateRouteInsight(
                -12.0897, -77.0543, -12.0965, -77.0285,
                TransportMode.BICYCLE, 5.0, 850.0, 18, true);

        server.verify();
        assertEquals("Pedalea limpio\nAhorras 0.85 kg de CO2.", insight.ecoReasoning());
    }

    @Test
    @DisplayName("HU09: Gemini falla -> cae al fallback heurístico sin romper la planificación")
    void gemini_failure_fallsBackToHeuristic() {
        server.expect(requestTo(org.hamcrest.Matchers.startsWith(GEMINI_URL_PREFIX)))
                .andRespond(withServerError());

        AiInsightDTO insight = advisor.generateRouteInsight(
                -12.0897, -77.0543, -12.0965, -77.0285,
                TransportMode.BICYCLE, 5.0, 850.0, 18, true);

        server.verify();
        assertTrue(insight.ecoReasoning().contains("Corredor Verde Optimizado con IA"));
        assertTrue(insight.ecoReasoning().contains("5.0 km"));
        assertTrue(insight.ecoReasoning().contains("18 min"));
        assertTrue(insight.ecoReasoning().contains("0.85 kg de CO2"));
    }

    @Test
    @DisplayName("HU09: Gemini devuelve texto vacío -> cae al fallback heurístico")
    void gemini_emptyText_fallsBackToHeuristic() {
        server.expect(requestTo(org.hamcrest.Matchers.startsWith(GEMINI_URL_PREFIX)))
                .andRespond(withSuccess("{\"candidates\":[]}", MediaType.APPLICATION_JSON));

        AiInsightDTO insight = advisor.generateRouteInsight(
                -12.0897, -77.0543, -12.0965, -77.0285,
                TransportMode.WALKING, 2.5, 425.0, 30, false);

        server.verify();
        assertTrue(insight.ecoReasoning().contains("Senda Peatonal Saludable"));
    }

    @Test
    @DisplayName("HU09: Sin claves de IA, el fallback marca hora punta usando la hora de Lima")
    void fallback_rushHourInLima_mentionsRushHour() {
        // 08:00 en Lima = 13:00 UTC. Evaluado en UTC (bug previo) NO sería hora punta.
        AiRouteAdvisorService rush = noKeysAdvisor(clockAtLimaHour(8));

        AiInsightDTO insight = rush.generateRouteInsight(
                -12.0897, -77.0543, -12.0965, -77.0285,
                TransportMode.BICYCLE, 5.0, 850.0, 18, true);

        assertTrue(insight.ecoReasoning().contains("en hora punta"));
        assertFalse(insight.ecoReasoning().contains("fuera de hora punta"));
    }

    @Test
    @DisplayName("HU09: Sin claves de IA, el fallback marca fuera de hora punta usando la hora de Lima")
    void fallback_offPeakInLima_mentionsOffPeak() {
        // 12:00 en Lima = 17:00 UTC. Evaluado en UTC (bug previo) SÍ sería hora punta.
        AiRouteAdvisorService offPeak = noKeysAdvisor(clockAtLimaHour(12));

        AiInsightDTO insight = offPeak.generateRouteInsight(
                -12.0897, -77.0543, -12.0965, -77.0285,
                TransportMode.BICYCLE, 5.0, 850.0, 18, true);

        assertTrue(insight.ecoReasoning().contains("fuera de hora punta"));
    }

    @Test
    @DisplayName("HU09: El fallback no afirma arbolado, ciclovías ni smog (no hay datos que lo respalden)")
    void fallback_doesNotMakeUnsupportedClaims() {
        AiRouteAdvisorService noKeys = noKeysAdvisor(clockAtLimaHour(12));

        AiInsightDTO insight = noKeys.generateRouteInsight(
                -12.0897, -77.0543, -12.0965, -77.0285,
                TransportMode.BICYCLE, 5.0, 850.0, 18, true);

        String text = insight.ecoReasoning().toLowerCase();
        assertFalse(text.contains("arbolad"));
        assertFalse(text.contains("ciclov"));
        assertFalse(text.contains("smog"));
    }

    private AiRouteAdvisorService noKeysAdvisor(Clock clock) {
        AiRouteAdvisorService service = withClock(RestClient.builder().build(), clock);
        ReflectionTestUtils.setField(service, "geminiApiKey", "");
        ReflectionTestUtils.setField(service, "openAiApiKey", "");
        return service;
    }

    private AiRouteAdvisorService withClock(RestClient restClient, Clock clock) {
        return new AiRouteAdvisorService(restClient, clock);
    }

    private Clock clockAtLimaHour(int hour) {
        Instant instant = java.time.LocalDate.of(2026, 10, 5).atTime(hour, 0).atZone(LIMA).toInstant();
        return Clock.fixed(instant, LIMA);
    }
}
