package com.ecocommute.services;

import com.ecocommute.dto.AiInsightDTO;
import com.ecocommute.dto.CoordinateRequestDTO;
import com.ecocommute.dto.RouteOptionDTO;
import com.ecocommute.dto.RoutePlanRequestDTO;
import com.ecocommute.dto.RoutePlanResponseDTO;
import com.ecocommute.entities.TransportMode;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RoutingEngineServiceTest {

    @Mock
    private CarbonEmissionService carbonEmissionService;

    @Mock
    private AiRouteAdvisorService aiAdvisorService;

    private RoutingEngineService routingEngineService;

    @BeforeEach
    void setUp() {
        routingEngineService = new RoutingEngineService(carbonEmissionService, aiAdvisorService);
        RestClient restClient = mock(RestClient.class, RETURNS_DEEP_STUBS);
        ReflectionTestUtils.setField(routingEngineService, "restClient", restClient);
        when(restClient.get().uri(anyString()).retrieve().body(Map.class)).thenReturn(Map.of(
                "code", "Ok",
                "routes", List.of(
                        Map.of("distance", 4000.0, "duration", 600.0,
                                "geometry", Map.of("coordinates", List.of(
                                        List.of(-77.0543, -12.0897), List.of(-77.0285, -12.0965)))),
                        Map.of("distance", 4500.0, "duration", 720.0,
                                "geometry", Map.of("coordinates", List.of(
                                        List.of(-77.0543, -12.0897), List.of(-77.04, -12.09),
                                        List.of(-77.0285, -12.0965)))))));

    }

    @Test
    @DisplayName("Debe generar plan de rutas con 3 alternativas (Baseline, Directa, Corredor Verde)")
    void testPlanRoutesSuccess() {
        assertPlanRoutesWithAi(null);
    }

    @Test
    @DisplayName("Debe invocar IA cuando la optimización está activada")
    void testPlanRoutesWithAiEnabled() {
        assertPlanRoutesWithAi(true);
    }

    private void assertPlanRoutesWithAi(Boolean enableAiOptimization) {
        RoutePlanRequestDTO request = new RoutePlanRequestDTO(
                new CoordinateRequestDTO(-12.0897, -77.0543),
                new CoordinateRequestDTO(-12.0965, -77.0285),
                "BICYCLE",
                enableAiOptimization);

        when(carbonEmissionService.calculateBaselineEmissionGrams(anyDouble())).thenReturn(1445.0);
        when(carbonEmissionService.calculateModeEmissionGrams(eq(TransportMode.BICYCLE), anyDouble())).thenReturn(0.0);
        when(carbonEmissionService.calculatePoints(eq(TransportMode.BICYCLE), anyDouble(), anyInt())).thenReturn(45);
        when(aiAdvisorService.generateRouteInsight(anyDouble(), anyDouble(), anyDouble(), anyDouble(), any(),
                anyDouble(), anyDouble(), anyInt(), anyBoolean()))
                .thenReturn(new AiInsightDTO(95, 90, 65.0, "Óptima con ciclovías", "500 kcal quemadas", 0.05,
                        "Ruta de prueba"));

        RoutePlanResponseDTO response = routingEngineService.planRoutes(request, 1);

        assertNotNull(response.baselineCarRoute());
        assertNotNull(response.standardProfileRoute());
        assertNotNull(response.aiGreenCorridorRoute());
        assertEquals("route-ai-green-corridor", response.recommendedRouteId());

        RouteOptionDTO green = response.aiGreenCorridorRoute();
        assertTrue(green.isAiRecommended());
        assertEquals("Ruta de prueba", green.aiInsight().ecoReasoning());
        assertEquals(TransportMode.BICYCLE, green.mode());
        assertEquals(4.0, response.baselineCarRoute().distanceKm());
        assertEquals(10, response.baselineCarRoute().durationMinutes());
        assertEquals(4.0, response.standardProfileRoute().distanceKm());
        assertEquals(4.5, green.distanceKm());
        assertEquals(17, green.durationMinutes());
        assertEquals(List.of(-12.0897, -77.0543), green.pathCoordinates().getFirst());
        assertEquals(List.of(-12.0965, -77.0285), green.pathCoordinates().getLast());

        verify(aiAdvisorService).generateRouteInsight(
                eq(-12.0897), eq(-77.0543), eq(-12.0965), eq(-77.0285), eq(TransportMode.BICYCLE),
                anyDouble(), anyDouble(), anyInt(), eq(true));
        verifyNoMoreInteractions(aiAdvisorService);
    }
    @Test
    @DisplayName("Debe conservar 3 alternativas sin invocar IA cuando la optimización está desactivada")
    void testPlanRoutesWithAiDisabled() {
        RoutePlanRequestDTO request = new RoutePlanRequestDTO(
                new CoordinateRequestDTO(-12.0897, -77.0543),
                new CoordinateRequestDTO(-12.0965, -77.0285),
                "BICYCLE",
                false);

        when(carbonEmissionService.calculateBaselineEmissionGrams(anyDouble())).thenReturn(1445.0);
        when(carbonEmissionService.calculateModeEmissionGrams(eq(TransportMode.BICYCLE), anyDouble())).thenReturn(0.0);
        when(carbonEmissionService.calculatePoints(eq(TransportMode.BICYCLE), anyDouble(), anyInt())).thenReturn(45);

        RoutePlanResponseDTO response = routingEngineService.planRoutes(request, 1);

        assertNotNull(response.baselineCarRoute());
        assertNotNull(response.standardProfileRoute());
        RouteOptionDTO green = response.aiGreenCorridorRoute();
        assertNotNull(green);
        assertEquals("route-ai-green-corridor", response.recommendedRouteId());
        assertEquals(response.recommendedRouteId(), green.id());
        assertEquals(TransportMode.BICYCLE, green.mode());
        assertEquals(4.0, response.baselineCarRoute().distanceKm());
        assertEquals(10, response.baselineCarRoute().durationMinutes());
        assertEquals(4.0, response.standardProfileRoute().distanceKm());
        assertEquals(4.5, green.distanceKm());
        assertEquals(17, green.durationMinutes());
        assertEquals(List.of(-12.0897, -77.0543), green.pathCoordinates().getFirst());
        assertEquals(List.of(-12.0965, -77.0285), green.pathCoordinates().getLast());

        assertFalse(green.isAiRecommended());
        assertNull(green.aiInsight());
        assertEquals("🌿 Corredor Verde", green.title());
        assertFalse(green.pathCoordinates().isEmpty());
        assertTrue(green.distanceKm() > 0);
        assertTrue(green.durationMinutes() > 0);
        assertEquals(55, green.potentialPoints());
        verifyNoInteractions(aiAdvisorService);
    }

    @Test
    @DisplayName("HU03: conserva alternativas y geometría de respaldo si OSRM no está disponible")
    void testPlanRoutesWithOsrmUnavailable() {
        RestClient restClient = (RestClient) ReflectionTestUtils.getField(routingEngineService, "restClient");
        when(restClient.get().uri(anyString()).retrieve().body(Map.class))
                .thenThrow(new IllegalStateException("OSRM unavailable"));
        RoutePlanRequestDTO request = new RoutePlanRequestDTO(
                new CoordinateRequestDTO(-12.0897, -77.0543),
                new CoordinateRequestDTO(-12.0965, -77.0285), "WALKING", false);

        RoutePlanResponseDTO response = routingEngineService.planRoutes(request, 1);

        assertNotNull(response.baselineCarRoute());
        assertNotNull(response.standardProfileRoute());
        assertNotNull(response.aiGreenCorridorRoute());
        assertTrue(response.baselineCarRoute().distanceKm() > 0);
        assertTrue(response.standardProfileRoute().durationMinutes() > 0);
        assertEquals(TransportMode.WALKING, response.aiGreenCorridorRoute().mode());
        assertEquals(List.of(-12.0897, -77.0543), response.aiGreenCorridorRoute().pathCoordinates().getFirst());
        assertEquals(List.of(-12.0965, -77.0285), response.aiGreenCorridorRoute().pathCoordinates().getLast());
        assertNull(response.aiGreenCorridorRoute().aiInsight());
        verifyNoInteractions(aiAdvisorService);
    }
}
