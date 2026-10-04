package com.ecocommute.services;

import com.ecocommute.dto.LeaderboardEntryDTO;
import com.ecocommute.entities.UserStats;
import com.ecocommute.repositories.UserStatsRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class LeaderboardService {

    private final UserStatsRepository userStatsRepository;

    public LeaderboardService(UserStatsRepository userStatsRepository) {
        this.userStatsRepository = userStatsRepository;
    }

    private static final int MAX_DISTRICT_LENGTH = 80;

    @Transactional(readOnly = true)
    public List<LeaderboardEntryDTO> getLeaderboard() {
        return getLeaderboard("co2");
    }

    @Transactional(readOnly = true)
    public List<LeaderboardEntryDTO> getLeaderboard(String sortBy) {
        String normalizedSort = normalizeSortBy(sortBy);
        if ("points".equals(normalizedSort)) {
            return buildRanking(userStatsRepository.findTopEcoUsersOrderByPoints());
        }
        return buildRanking(userStatsRepository.findTopEcoUsers());
    }

    @Transactional(readOnly = true)
    public List<LeaderboardEntryDTO> getLeaderboardByDistrict(String district) {
        return getLeaderboardByDistrict(district, "co2");
    }

    @Transactional(readOnly = true)
    public List<LeaderboardEntryDTO> getLeaderboardByDistrict(String district, String sortBy) {
        if (district != null && district.trim().length() > MAX_DISTRICT_LENGTH) {
            throw new IllegalArgumentException("El nombre del distrito no puede superar los 80 caracteres.");
        }
        if (district == null || district.isBlank()) {
            return getLeaderboard(sortBy);
        }

        String normalizedSort = normalizeSortBy(sortBy);
        String trimmedDistrict = district.trim();

        if ("points".equals(normalizedSort)) {
            return buildRanking(userStatsRepository.findTopEcoUsersByDistrictOrderByPoints(trimmedDistrict));
        }
        return buildRanking(userStatsRepository.findTopEcoUsersByDistrict(trimmedDistrict));
    }

    private String normalizeSortBy(String sortBy) {
        if (sortBy == null || sortBy.isBlank()) {
            return "co2";
        }
        String normalized = sortBy.trim().toLowerCase();
        if (!"co2".equals(normalized) && !"points".equals(normalized)) {
            throw new IllegalArgumentException("Criterio de ordenamiento invalido ('" + sortBy + "'). Use 'co2' o 'points'.");
        }
        return normalized;
    }

    @Transactional(readOnly = true)
    public List<String> getDistricts() {
        return userStatsRepository.findActiveDistricts();
    }

    private List<LeaderboardEntryDTO> buildRanking(List<UserStats> topStats) {
        List<LeaderboardEntryDTO> result = new ArrayList<>();

        int rank = 1;
        for (UserStats s : topStats) {
            result.add(new LeaderboardEntryDTO(
                    s.getUser().getId(),
                    s.getUser().getFullName(),
                    s.getUser().getAvatarUrl(),
                    s.getUser().getDistrict(),
                    s.getTotalCo2SavedKg(),
                    s.getUser().getCurrentPoints(),
                    s.getTotalTrips(),
                    s.getUser().getStreakDays(),
                    rank++));
        }
        return result;
    }
}
