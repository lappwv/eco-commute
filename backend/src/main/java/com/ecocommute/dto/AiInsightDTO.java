package com.ecocommute.dto;

public record AiInsightDTO(
        int greenScore,
        int safetyRating,
        double shadeTreeCoveragePercent,
        String cyclingInfrastructureQuality,
        String healthBenefitSummary,
        double treesEquivalentFraction,
        String ecoReasoning
) {
}
