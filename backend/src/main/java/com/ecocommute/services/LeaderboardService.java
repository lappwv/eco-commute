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

    @Transactional(readOnly = true)
    public List<LeaderboardEntryDTO> getLeaderboard() {
        return buildRanking(userStatsRepository.findTopEcoUsers());
    }

    @Transactional(readOnly = true)
    public List<LeaderboardEntryDTO> getLeaderboardByDistrict(String district) {
        if (district == null || district.isBlank()) {
            return getLeaderboard();
        }
        return buildRanking(userStatsRepository.findTopEcoUsersByDistrict(district.trim()));
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
