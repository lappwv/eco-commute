package com.ecocommute.services;

import com.ecocommute.entities.UserStats;
import com.ecocommute.repositories.UserStatsRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class LeaderboardService {

    private final UserStatsRepository userStatsRepository;

    public LeaderboardService(UserStatsRepository userStatsRepository) {
        this.userStatsRepository = userStatsRepository;
    }

    @Transactional(readOnly = true)
    public List<Map<String, Object>> getLeaderboard() {
        return buildRanking(userStatsRepository.findTopEcoUsers());
    }

    @Transactional(readOnly = true)
    public List<Map<String, Object>> getLeaderboardByDistrict(String district) {
        if (district == null || district.isBlank()) {
            return getLeaderboard();
        }
        return buildRanking(userStatsRepository.findTopEcoUsersByDistrict(district.trim()));
    }

    @Transactional(readOnly = true)
    public List<String> getDistricts() {
        return userStatsRepository.findActiveDistricts();
    }

    private List<Map<String, Object>> buildRanking(List<UserStats> topStats) {
        List<Map<String, Object>> result = new ArrayList<>();

        int rank = 1;
        for (UserStats s : topStats) {
            Map<String, Object> entry = new HashMap<>();
            entry.put("userId", s.getUser().getId());
            entry.put("fullName", s.getUser().getFullName());
            entry.put("avatarUrl", s.getUser().getAvatarUrl());
            entry.put("district", s.getUser().getDistrict());
            entry.put("totalCo2SavedKg", s.getTotalCo2SavedKg());
            entry.put("currentPoints", s.getUser().getCurrentPoints());
            entry.put("tripsCount", s.getTotalTrips());
            entry.put("streakDays", s.getUser().getStreakDays());
            entry.put("rank", rank++);
            result.add(entry);
        }
        return result;
    }
}
