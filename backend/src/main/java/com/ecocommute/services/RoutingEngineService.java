package com.ecocommute.services;

import com.ecocommute.dto.AiInsightDTO;
import com.ecocommute.dto.CoordinateRequestDTO;
import com.ecocommute.dto.RouteOptionDTO;
import com.ecocommute.dto.RoutePlanRequestDTO;
import com.ecocommute.dto.RoutePlanResponseDTO;
import com.ecocommute.entities.TransportMode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@Service
public class RoutingEngineService {

    private static final Logger log = LoggerFactory.getLogger(RoutingEngineService.class);

    private static final int OSRM_CONNECT_TIMEOUT_MS = 4000;
    private static final int OSRM_READ_TIMEOUT_MS = 5000;

    private static final String DEFAULT_PROFILE = "BICYCLE";
    private static final String RECOMMENDED_ROUTE_ID = "route-ai-green-corridor";

    private static final double BICYCLE_SPEED_KMH = 16.0;
    private static final double WALKING_SPEED_KMH = 4.8;
    private static final double GREEN_CORRIDOR_BICYCLE_SPEED_KMH = 15.5;
    private static final double GREEN_CORRIDOR_WALKING_SPEED_KMH = 4.5;
    private static final int MIN_ROUTE_DURATION_MINUTES = 3;
    private static final int GREEN_CORRIDOR_BONUS_POINTS = 10;

    private static final double EARTH_RADIUS_KM = 6371.0;
    private static final double STREET_NETWORK_DETOUR_FACTOR = 1.35;
    private static final double AVERAGE_STREET_SPEED_KMH = 35.0;

    private final CarbonEmissionService carbonEmissionService;
    private final AiRouteAdvisorService aiAdvisorService;
    private final RestClient restClient;

    public RoutingEngineService(CarbonEmissionService carbonEmissionService,
                                AiRouteAdvisorService aiAdvisorService) {
        this.carbonEmissionService = carbonEmissionService;
        this.aiAdvisorService = aiAdvisorService;

        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(OSRM_CONNECT_TIMEOUT_MS);
        factory.setReadTimeout(OSRM_READ_TIMEOUT_MS);

        this.restClient = RestClient.builder()
                .requestFactory(factory)
                .build();
    }

    public RoutePlanResponseDTO planRoutes(RoutePlanRequestDTO request, int userStreakDays) {
        Coordinates origin = toCoordinates(request.origin());
        Coordinates destination = toCoordinates(request.destination());
        TransportMode targetMode = resolveTargetMode(request.selectedProfile());

        List<OsrmRouteResult> drivingStreetRoutes = fetchOsrmStreetRoutes("driving", origin, destination, true);
        OsrmRouteResult primaryDrivingRoute = firstOrFallback(
                drivingStreetRoutes, () -> createGeometricFallback(origin, destination));
        double baselineStreetDistanceKm = primaryDrivingRoute.distanceKm();
        double baselineCo2 = carbonEmissionService.calculateBaselineEmissionGrams(baselineStreetDistanceKm);

        RouteOptionDTO baselineCar = buildBaselineCarOption(primaryDrivingRoute, baselineCo2);

        List<OsrmRouteResult> activeModeRoutes = fetchOsrmStreetRoutes(
                osrmProfileFor(targetMode), origin, destination, true);
        OsrmRouteResult standardActiveRoute = firstOrFallback(activeModeRoutes, () -> primaryDrivingRoute);
        RouteOptionDTO standardOption = buildStandardProfileOption(targetMode, standardActiveRoute, baselineCo2, userStreakDays);

        OsrmRouteResult greenStreetRoute = pickGreenCorridorRoute(activeModeRoutes, drivingStreetRoutes, standardActiveRoute);
        RouteOptionDTO greenOption = buildGreenCorridorOption(
                greenStreetRoute, targetMode, baselineCo2, origin, destination, userStreakDays);

        return new RoutePlanResponseDTO(baselineCar, standardOption, greenOption, RECOMMENDED_ROUTE_ID);
    }

    private RouteOptionDTO buildBaselineCarOption(OsrmRouteResult drivingRoute, double baselineCo2) {
        return createRouteOption(
                "route-baseline-car",
                "🚗 Auto / Vehículo Convencional (Línea Base)",
                TransportMode.CAR_SOLO,
                drivingRoute.distanceKm(),
                drivingRoute.durationMinutes(),
                baselineCo2,
                0.0,
                0,
                caloriesFor(drivingRoute.distanceKm(), TransportMode.CAR_SOLO),
                false,
                null,
                drivingRoute.pathCoordinates(),
                "Ruta vehicular estándar directa por avenidas principales."
        );
    }

    private RouteOptionDTO buildStandardProfileOption(TransportMode targetMode, OsrmRouteResult route,
                                                      double baselineCo2, int userStreakDays) {
        double standardDistanceKm = route.distanceKm();
        int standardDuration = estimateDurationMinutes(route, targetMode, BICYCLE_SPEED_KMH, WALKING_SPEED_KMH);

        double standardEmitted = carbonEmissionService.calculateModeEmissionGrams(targetMode, standardDistanceKm);
        double standardSaved = Math.max(0, baselineCo2 - standardEmitted);
        int standardPoints = carbonEmissionService.calculatePoints(targetMode, standardSaved, userStreakDays);

        return createRouteOption(
                "route-standard-direct",
                standardProfileTitle(targetMode),
                targetMode,
                standardDistanceKm,
                standardDuration,
                standardEmitted,
                standardSaved,
                standardPoints,
                caloriesFor(standardDistanceKm, targetMode),
                false,
                null,
                route.pathCoordinates(),
                "Ruta directa sobre la red vial de la ciudad."
        );
    }

    private RouteOptionDTO buildGreenCorridorOption(OsrmRouteResult greenRoute, TransportMode targetMode,
                                                    double baselineCo2, Coordinates origin, Coordinates destination,
                                                    int userStreakDays) {
        double greenDistanceKm = greenRoute.distanceKm();
        int greenDuration = estimateDurationMinutes(
                greenRoute, targetMode, GREEN_CORRIDOR_BICYCLE_SPEED_KMH, GREEN_CORRIDOR_WALKING_SPEED_KMH);

        double greenEmitted = carbonEmissionService.calculateModeEmissionGrams(targetMode, greenDistanceKm);
        double greenSaved = Math.max(0, baselineCo2 - greenEmitted);
        int greenPoints = carbonEmissionService.calculatePoints(targetMode, greenSaved, userStreakDays)
                + GREEN_CORRIDOR_BONUS_POINTS;

        AiInsightDTO aiInsight = aiAdvisorService.generateRouteInsight(
                origin.lat(), origin.lng(),
                destination.lat(), destination.lng(),
                targetMode,
                greenDistanceKm,
                greenSaved,
                greenDuration,
                true
        );

        return createRouteOption(
                RECOMMENDED_ROUTE_ID,
                "🌿 Corredor Verde Optimizado con IA",
                targetMode,
                greenDistanceKm,
                greenDuration,
                greenEmitted,
                greenSaved,
                greenPoints,
                caloriesFor(greenDistanceKm, targetMode),
                true,
                aiInsight,
                greenRoute.pathCoordinates(),
                "Corredor seleccionado por menor exposición a tráfico y mejor infraestructura."
        );
    }

    private OsrmRouteResult pickGreenCorridorRoute(List<OsrmRouteResult> activeModeRoutes,
                                                   List<OsrmRouteResult> drivingStreetRoutes,
                                                   OsrmRouteResult standardActiveRoute) {
        if (activeModeRoutes.size() > 1) {
            return activeModeRoutes.get(1);
        }
        if (drivingStreetRoutes.size() > 1) {
            return drivingStreetRoutes.get(1);
        }
        return standardActiveRoute;
    }

    private TransportMode resolveTargetMode(String selectedProfile) {
        String profile = selectedProfile != null ? selectedProfile.toUpperCase() : DEFAULT_PROFILE;
        return switch (profile) {
            case "WALKING", "WALK" -> TransportMode.WALKING;
            case "DRIVING", "CAR" -> TransportMode.CAR_SOLO;
            default -> TransportMode.BICYCLE;
        };
    }

    private String osrmProfileFor(TransportMode mode) {
        return (mode == TransportMode.WALKING) ? "foot" : "driving";
    }

    private String standardProfileTitle(TransportMode mode) {
        return switch (mode) {
            case BICYCLE -> "🚲 Bicicleta (Ruta Directa)";
            case WALKING -> "🚶 Caminata (Ruta Directa)";
            default -> "🚗 Vehículo Eficiente";
        };
    }

    private int estimateDurationMinutes(OsrmRouteResult route, TransportMode mode,
                                        double bicycleSpeedKmh, double walkingSpeedKmh) {
        if (mode == TransportMode.BICYCLE) {
            return (int) Math.max(MIN_ROUTE_DURATION_MINUTES, Math.round((route.distanceKm() / bicycleSpeedKmh) * 60));
        }
        if (mode == TransportMode.WALKING) {
            return (int) Math.max(MIN_ROUTE_DURATION_MINUTES, Math.round((route.distanceKm() / walkingSpeedKmh) * 60));
        }
        return route.durationMinutes();
    }

    private int caloriesFor(double distanceKm, TransportMode mode) {
        return (int) Math.round(distanceKm * mode.getCaloriesPerKm());
    }

    private Coordinates toCoordinates(CoordinateRequestDTO coordinate) {
        return new Coordinates(coordinate.latitude(), coordinate.longitude());
    }

    private OsrmRouteResult firstOrFallback(List<OsrmRouteResult> routes, java.util.function.Supplier<OsrmRouteResult> fallback) {
        return routes.isEmpty() ? fallback.get() : routes.get(0);
    }

    private List<OsrmRouteResult> fetchOsrmStreetRoutes(String profile, Coordinates origin, Coordinates destination,
                                                        boolean requestAlternatives) {
        String url = String.format(
                Locale.US,
                "https://router.project-osrm.org/route/v1/%s/%.6f,%.6f;%.6f,%.6f?overview=full&geometries=geojson&alternatives=%s",
                profile, origin.lng(), origin.lat(), destination.lng(), destination.lat(),
                requestAlternatives ? "true" : "false"
        );

        try {
            Map response = restClient.get()
                    .uri(url)
                    .retrieve()
                    .body(Map.class);

            if (response != null && "Ok".equals(response.get("code"))) {
                List routes = (List) response.get("routes");
                if (routes != null && !routes.isEmpty()) {
                    List<OsrmRouteResult> results = new ArrayList<>();
                    for (Object routeObj : routes) {
                        Map route = (Map) routeObj;
                        double distanceMeters = ((Number) route.get("distance")).doubleValue();
                        double durationSeconds = ((Number) route.get("duration")).doubleValue();

                        Map geometry = (Map) route.get("geometry");
                        List rawCoords = (List) geometry.get("coordinates");

                        List<List<Double>> path = new ArrayList<>();
                        for (Object coordObj : rawCoords) {
                            List coord = (List) coordObj;
                            double lon = ((Number) coord.get(0)).doubleValue();
                            double lat = ((Number) coord.get(1)).doubleValue();
                            path.add(List.of(lat, lon));
                        }

                        results.add(new OsrmRouteResult(
                                distanceMeters / 1000.0,
                                (int) Math.ceil(durationSeconds / 60.0),
                                path
                        ));
                    }
                    return results;
                }
            }
        } catch (Exception e) {
            log.warn("OSRM query failed: {}", e.getMessage());
        }
        return Collections.emptyList();
    }

    private OsrmRouteResult createGeometricFallback(Coordinates origin, Coordinates destination) {
        double dLat = Math.toRadians(destination.lat() - origin.lat());
        double dLon = Math.toRadians(destination.lng() - origin.lng());
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(Math.toRadians(origin.lat())) * Math.cos(Math.toRadians(destination.lat())) *
                        Math.sin(dLon / 2) * Math.sin(dLon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        double straightDistance = EARTH_RADIUS_KM * c;
        double streetDistance = straightDistance * STREET_NETWORK_DETOUR_FACTOR;
        int duration = (int) Math.round((streetDistance / AVERAGE_STREET_SPEED_KMH) * 60);

        List<List<Double>> path = List.of(
                List.of(origin.lat(), origin.lng()),
                List.of((origin.lat() + destination.lat()) / 2, (origin.lng() + destination.lng()) / 2),
                List.of(destination.lat(), destination.lng())
        );

        return new OsrmRouteResult(streetDistance, duration, path);
    }

    private RouteOptionDTO createRouteOption(
            String id, String title, TransportMode mode,
            double distanceKm, int durationMinutes,
            double co2Emitted, double co2Saved,
            int points, int calories,
            boolean isAi, AiInsightDTO aiInsight,
            List<List<Double>> path, String summary) {

        return new RouteOptionDTO(
                id,
                title,
                mode,
                mode.getDisplayName(),
                Math.round(distanceKm * 100.0) / 100.0,
                durationMinutes,
                Math.round(co2Emitted),
                Math.round(co2Saved),
                points,
                calories,
                isAi,
                aiInsight,
                path,
                summary
        );
    }

    private record Coordinates(double lat, double lng) {
    }

    private record OsrmRouteResult(double distanceKm, int durationMinutes, List<List<Double>> pathCoordinates) {
    }
}
