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
    }

    @Test
    @DisplayName("Debe generar plan de rutas con 3 alternativas (Baseline, Directa, Corredor Verde)")
    void testPlanRoutesSuccess() {
        RoutePlanRequestDTO request = new RoutePlanRequestDTO(
                new CoordinateRequestDTO(-12.0897, -77.0543),
                new CoordinateRequestDTO(-12.0965, -77.0285),
                "BICYCLE",
                null);

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
    }
}
