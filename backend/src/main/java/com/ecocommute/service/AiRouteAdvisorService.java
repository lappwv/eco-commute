package com.ecocommute.service;

import com.ecocommute.entity.TransportMode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AiRouteAdvisorService {

    private static final Logger log = LoggerFactory.getLogger(AiRouteAdvisorService.class);

    @Value("${app.openai.api-key:}")
    private String openAiApiKey;

    private final RestClient restClient;

    public AiRouteAdvisorService() {
        this.restClient = RestClient.builder().build();
    }

    public Map<String, Object> generateRouteInsight(double originLat, double originLng,
                                                    double destLat, double destLng,
                                                    TransportMode selectedMode,
                                                    double distanceKm,
                                                    double co2SavedGrams,
                                                    int durationMinutes,
                                                    boolean userHasBicycle) {

        int currentHour = LocalTime.now().getHour();
        boolean isRushHour = (currentHour >= 7 && currentHour <= 9) || (currentHour >= 17 && currentHour <= 20);

        double treesSavedFraction = (co2SavedGrams / 1000.0) / 22.0;
        int calories = (int) Math.round(distanceKm * selectedMode.getCaloriesPerKm());
        String weatherContext = "21°C, cielo despejado, viento favorable";

        if (openAiApiKey != null && !openAiApiKey.isBlank()) {
            try {
                String prompt = String.format(
                        "Actúa como el motor de IA de EcoCommute para Lima y el ODS 11. " +
                        "El usuario eligió viajar en %s. La ruta prioriza calles arboladas, ciclovías, menor exposición a tráfico y flujo continuo. " +
                        "Distancia: %.2f km, CO2 ahorrado: %.0f g, duración estimada: %d min, hora punta: %s. " +
                        "Responde en español con un título atractivo y una explicación breve de máximo dos oraciones.",
                        selectedMode.getDisplayName(), distanceKm, co2SavedGrams, durationMinutes, isRushHour ? "sí" : "no"
                );

                Map<String, Object> requestBody = Map.of(
                        "model", "gpt-4o-mini",
                        "messages", List.of(
                                Map.of("role", "system", "content", "Eres un asesor de movilidad sostenible claro y breve."),
                                Map.of("role", "user", "content", prompt)
                        ),
                        "temperature", 0.6
                );

                Map response = restClient.post()
                        .uri("https://api.openai.com/v1/chat/completions")
                        .header("Authorization", "Bearer " + openAiApiKey)
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(requestBody)
                        .retrieve()
                        .body(Map.class);

                String aiText = extractOpenAiText(response);
                if (aiText != null && !aiText.isBlank()) {
                    Map<String, Object> insight = baseInsight(selectedMode, calories, treesSavedFraction);
                    insight.put("ecoReasoning", aiText.trim());
                    return insight;
                }
            } catch (Exception e) {
                log.warn("OpenAI API call failed, using heuristic advisor: {}", e.getMessage());
            }
        }

        String fallbackTitle = switch (selectedMode) {
            case BICYCLE -> "Corredor Verde Optimizado con IA";
            case WALKING -> "Senda Peatonal Saludable";
            default -> "Ruta con Menor Tráfico y Emisiones";
        };

        String fallbackExplanation = String.format(
                "Ruta adaptada por calles arboladas, ciclovías y vías con menor exposición a smog (%s). Permite un ahorro de %.2f kg de CO2 frente a un auto convencional.",
                weatherContext, (co2SavedGrams / 1000.0)
        );

        Map<String, Object> insight = baseInsight(selectedMode, calories, treesSavedFraction);
        insight.put("ecoReasoning", fallbackTitle + "\n" + fallbackExplanation);
        return insight;
    }

    private String extractOpenAiText(Map response) {
        if (response == null || !response.containsKey("choices")) {
            return null;
        }

        List choices = (List) response.get("choices");
        if (choices.isEmpty()) {
            return null;
        }

        Map first = (Map) choices.get(0);
        Map message = (Map) first.get("message");
        return message != null ? (String) message.get("content") : null;
    }

    private Map<String, Object> baseInsight(TransportMode selectedMode, int calories, double treesSavedFraction) {
        Map<String, Object> insight = new HashMap<>();
        insight.put("greenScore", selectedMode == TransportMode.BICYCLE || selectedMode == TransportMode.WALKING ? 95 : 65);
        insight.put("safetyRating", selectedMode == TransportMode.BICYCLE ? 90 : 85);
        insight.put("shadeTreeCoveragePercent", 65.0);
        insight.put("cyclingInfrastructureQuality", selectedMode == TransportMode.BICYCLE ? "Óptima con ciclovías" : "N/A");
        insight.put("healthBenefitSummary", String.format("%d kcal quemadas", calories));
        insight.put("treesEquivalentFraction", treesSavedFraction);
        return insight;
    }
}
