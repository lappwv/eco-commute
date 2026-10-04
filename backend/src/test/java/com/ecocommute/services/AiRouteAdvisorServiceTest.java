package com.ecocommute.services;

import com.ecocommute.dto.AiInsightDTO;
import com.ecocommute.entities.TransportMode;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class AiRouteAdvisorServiceTest {

    private AiRouteAdvisorService advisorService;

    @BeforeEach
    void setUp() {
        advisorService = new AiRouteAdvisorService();
    }

    @Test
    @DisplayName("HU09: Fallback heurístico para Bicicleta genera recomendación explicada con datos reales de la ruta")
    void testGenerateRouteInsight_heuristicFallback_bicycle() {
        double originLat = -12.0897;
        double originLng = -77.0543;
        double destLat = -12.0965;
        double destLng = -77.0285;
        TransportMode mode = TransportMode.BICYCLE;
        double distanceKm = 5.0;
        double co2SavedGrams = 850.0;
        int durationMinutes = 18;

        AiInsightDTO insight = advisorService.generateRouteInsight(
                originLat, originLng, destLat, destLng,
                mode, distanceKm, co2SavedGrams, durationMinutes, true
        );

        assertNotNull(insight);
        assertEquals(95, insight.greenScore());
        assertEquals(90, insight.safetyRating());
        assertEquals(65.0, insight.shadeTreeCoveragePercent());
        assertEquals("Óptima con ciclovías", insight.cyclingInfrastructureQuality());
        assertEquals("175 kcal quemadas", insight.healthBenefitSummary()); // 5.0 km * 35 kcal/km
        assertEquals((850.0 / 1000.0) / 22.0, insight.treesEquivalentFraction(), 0.0001);

        String ecoReasoning = insight.ecoReasoning();
        assertNotNull(ecoReasoning);
        assertTrue(ecoReasoning.contains("Corredor Verde Optimizado con IA"));
        assertTrue(ecoReasoning.contains("5.0 km"));
        assertTrue(ecoReasoning.contains("18 min"));
        assertTrue(ecoReasoning.contains("0.85 kg de CO2"));
    }

    @Test
    @DisplayName("HU09: Fallback heurístico para Caminata genera recomendación de senda saludable")
    void testGenerateRouteInsight_heuristicFallback_walking() {
        TransportMode mode = TransportMode.WALKING;
        double distanceKm = 2.5;
        double co2SavedGrams = 425.0;
        int durationMinutes = 30;

        AiInsightDTO insight = advisorService.generateRouteInsight(
                -12.1215, -77.0298, -12.1280, -77.0310,
                mode, distanceKm, co2SavedGrams, durationMinutes, false
        );

        assertNotNull(insight);
        assertEquals(95, insight.greenScore());
        assertEquals(85, insight.safetyRating());
        assertEquals("N/A", insight.cyclingInfrastructureQuality());
        assertEquals("100 kcal quemadas", insight.healthBenefitSummary()); // 2.5 km * 40 kcal/km
        assertTrue(insight.ecoReasoning().contains("Senda Peatonal Saludable"));
        assertTrue(insight.ecoReasoning().contains("2.5 km"));
        assertTrue(insight.ecoReasoning().contains("30 min"));
        assertTrue(insight.ecoReasoning().contains("0.43 kg de CO2") || insight.ecoReasoning().contains("0.42 kg de CO2"));
    }

    @Test
    @DisplayName("HU09: Extrae texto generado desde la estructura de respuesta de Google Gemini")
    void testExtractGeminiText_validStructure() {
        Map<String, Object> geminiResponse = Map.of(
                "candidates", List.of(
                        Map.of(
                                "content", Map.of(
                                        "parts", List.of(
                                                Map.of("text", "Corredor Verde: Excelente alternativa por ciclovías arboladas de Salaverry.")
                                        )
                                )
                        )
                )
        );

        String text = advisorService.extractGeminiText(geminiResponse);
        assertNotNull(text);
        assertEquals("Corredor Verde: Excelente alternativa por ciclovías arboladas de Salaverry.", text);
    }

    @Test
    @DisplayName("HU09: Manejo seguro ante respuestas nulas o malformadas de Gemini")
    void testExtractGeminiText_malformedOrEmpty() {
        assertNull(advisorService.extractGeminiText(null));
        assertNull(advisorService.extractGeminiText(Map.of()));
        assertNull(advisorService.extractGeminiText(Map.of("candidates", List.of())));
        assertNull(advisorService.extractGeminiText(Map.of("candidates", List.of(Map.of()))));
    }

    @Test
    @DisplayName("HU09: Extrae texto generado desde la estructura de respuesta de OpenAI")
    void testExtractOpenAiText_validStructure() {
        Map<String, Object> openAiResponse = Map.of(
                "choices", List.of(
                        Map.of(
                                "message", Map.of(
                                        "content", "Ruta óptima por vías peatonales seguras."
                                )
                        )
                )
        );

        String text = advisorService.extractOpenAiText(openAiResponse);
        assertNotNull(text);
        assertEquals("Ruta óptima por vías peatonales seguras.", text);
    }

    @Test
    @DisplayName("HU09: Manejo seguro ante respuestas nulas o malformadas de OpenAI")
    void testExtractOpenAiText_malformedOrEmpty() {
        assertNull(advisorService.extractOpenAiText(null));
        assertNull(advisorService.extractOpenAiText(Map.of()));
        assertNull(advisorService.extractOpenAiText(Map.of("choices", List.of())));
    }
}
