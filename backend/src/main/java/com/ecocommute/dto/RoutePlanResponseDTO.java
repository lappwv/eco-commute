package com.ecocommute.dto;

public record RoutePlanResponseDTO(
        RouteOptionDTO baselineCarRoute,
        RouteOptionDTO standardProfileRoute,
        RouteOptionDTO aiGreenCorridorRoute,
        String recommendedRouteId
) {
}
