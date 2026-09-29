package com.ecocommute.dto;

public record AdminKpisDTO(
        long totalUsers,
        long totalTrips,
        double totalCo2SavedKg,
        long suspiciousTripsCount
) {
}
