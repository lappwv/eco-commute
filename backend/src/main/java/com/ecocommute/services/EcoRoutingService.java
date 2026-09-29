package com.ecocommute.services;

import com.ecocommute.dto.EcoRouteRequestDTO;
import com.ecocommute.dto.EcoRouteResponseDTO;
import com.ecocommute.dto.RecalculateRouteRequestDTO;
import com.ecocommute.dto.TelemetryTickRequestDTO;
import com.ecocommute.dto.TelemetryTickResponseDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;

@Service
public class EcoRoutingService {

    private static final Logger log = LoggerFactory.getLogger(EcoRoutingService.class);
    private final RestClient restClient;

    private static final int OSRM_CONNECT_TIMEOUT_MS = 4000;
    private static final int OSRM_READ_TIMEOUT_MS = 5000;

    private static final double BASELINE_CAR_EMISSION_PER_KM = 170.0;
    private static final double BICYCLE_EMISSION_PER_KM = 0.0;
    private static final double WALKING_EMISSION_PER_KM = 0.0;
    private static final double ECO_DRIVING_EMISSION_PER_KM = 125.0;

    private static final double DRIVING_SPEED_THRESHOLD_KMH = 25.0;
    private static final double GRAMS_OF_CO2_PER_POINT = 15.0;
    private static final double KG_OF_CO2_PER_TREE_PER_YEAR = 21.77;
    private static final double DEFAULT_REMAINING_DISTANCE_METERS = 1000.0;
    private static final int DEFAULT_REMAINING_DURATION_SECONDS = 300;
    private static final double DEFAULT_DISTANCE_TO_NEXT_STEP_METERS = 150.0;

    public EcoRoutingService() {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(OSRM_CONNECT_TIMEOUT_MS);
        factory.setReadTimeout(OSRM_READ_TIMEOUT_MS);
        this.restClient = RestClient.builder().requestFactory(factory).build();
    }

    public EcoRouteResponseDTO calculateInitialEcoRoute(EcoRouteRequestDTO request) {
        UUID tripId = UUID.randomUUID();
        return computeRoute(
                tripId,
                request.originLat(), request.originLng(),
                request.destinationLat(), request.destinationLng(),
                request.vehicleMode(), 0.0);
    }

    public EcoRouteResponseDTO recalculateRoute(RecalculateRouteRequestDTO request) {
        UUID tripId = request.tripId() != null ? UUID.fromString(request.tripId()) : UUID.randomUUID();
        double accumulatedCo2SavedGrams = valueOrDefault(request.accumulatedCo2SavedGrams(), 0.0);

        return computeRoute(
                tripId,
                request.currentLat(), request.currentLng(),
                request.destinationLat(), request.destinationLng(),
                request.vehicleMode(), accumulatedCo2SavedGrams);
    }

    public TelemetryTickResponseDTO processTelemetryTick(TelemetryTickRequestDTO tick) {
        double distanceKm = tick.distanceIncrementMeters() / 1000.0;
        double speedKmh = tick.speedKmh();

        double baselineGrams = distanceKm * BASELINE_CAR_EMISSION_PER_KM;
        double modeEmissionGrams = distanceKm * emissionPerKmForSpeed(speedKmh);

        double deltaCo2Saved = Math.max(0.0, baselineGrams - modeEmissionGrams);
        double accCo2 = valueOrDefault(tick.accumulatedCo2SavedGrams(), 0.0);
        double totalCo2Saved = accCo2 + deltaCo2Saved;

        double treesEquivalent = (totalCo2Saved / 1000.0) / KG_OF_CO2_PER_TREE_PER_YEAR;
        double totalDist = valueOrDefault(tick.accumulatedDistanceKm(), 0.0) + distanceKm;
        int ecoPointsEarned = (int) Math.round(totalCo2Saved / GRAMS_OF_CO2_PER_POINT);

        return new TelemetryTickResponseDTO(
                tick.tripId(),
                deltaCo2Saved,
                totalCo2Saved,
                treesEquivalent,
                totalDist,
                speedKmh,
                ecoPointsEarned,
                DEFAULT_DISTANCE_TO_NEXT_STEP_METERS,
                "Continúa por 120 metros.",
                "CONTINUE_STRAIGHT");
    }

    private EcoRouteResponseDTO computeRoute(UUID tripId, double lat1, double lon1, double lat2, double lon2,
                                             String mode, double accSavedCo2) {
        String profile = switch (mode != null ? mode.toUpperCase() : "BICYCLE") {
            case "WALKING", "FOOT" -> "foot";
            case "DRIVING", "CAR" -> "driving";
            default -> "bike";
        };

        String url = String.format(Locale.US, "https://router.project-osrm.org/route/v1/%s/%.6f,%.6f;%.6f,%.6f?overview=full&geometries=geojson&steps=true",
                profile.equals("bike") ? "driving" : profile, lon1, lat1, lon2, lat2);

        List<List<Double>> pathCoordinates = new ArrayList<>();
        double remainingDistanceMeters = DEFAULT_REMAINING_DISTANCE_METERS;
        int remainingDurationSeconds = DEFAULT_REMAINING_DURATION_SECONDS;

        try {
            Map response = restClient.get().uri(url).retrieve().body(Map.class);
            if (response != null && "Ok".equals(response.get("code"))) {
                List routes = (List) response.get("routes");
                if (routes != null && !routes.isEmpty()) {
                    Map primary = (Map) routes.get(0);
                    remainingDistanceMeters = ((Number) primary.get("distance")).doubleValue();
                    remainingDurationSeconds = ((Number) primary.get("duration")).intValue();

                    Map geometry = (Map) primary.get("geometry");
                    List rawCoords = (List) geometry.get("coordinates");
                    for (Object pt : rawCoords) {
                        List c = (List) pt;
                        pathCoordinates.add(List.of(((Number) c.get(1)).doubleValue(), ((Number) c.get(0)).doubleValue()));
                    }
                }
            }
        } catch (Exception e) {
            log.warn("OSRM lookup error: {}", e.getMessage());
            pathCoordinates.add(List.of(lat1, lon1));
            pathCoordinates.add(List.of(lat2, lon2));
        }

        double remainingKm = remainingDistanceMeters / 1000.0;
        double baselineGrams = remainingKm * BASELINE_CAR_EMISSION_PER_KM;
        double modeGrams = remainingKm * (mode != null && mode.equalsIgnoreCase("WALKING") ? WALKING_EMISSION_PER_KM : BICYCLE_EMISSION_PER_KM);
        double remainingSaved = Math.max(0, baselineGrams - modeGrams);

        return new EcoRouteResponseDTO(
                tripId.toString(),
                remainingDistanceMeters,
                remainingDurationSeconds,
                accSavedCo2 + remainingSaved,
                pathCoordinates,
                "Iniciando recorrido ecológico...",
                "CONTINUE",
                "Vía Principal",
                DEFAULT_DISTANCE_TO_NEXT_STEP_METERS);
    }

    private double emissionPerKmForSpeed(double speedKmh) {
        if (speedKmh > DRIVING_SPEED_THRESHOLD_KMH) {
            return ECO_DRIVING_EMISSION_PER_KM;
        }
        return BICYCLE_EMISSION_PER_KM;
    }

    private double valueOrDefault(Double value, double defaultValue) {
        return value != null ? value : defaultValue;
    }
}
