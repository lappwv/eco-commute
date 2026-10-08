package com.ecocommute.services;

import com.ecocommute.entities.Redemption;
import com.ecocommute.entities.Reward;
import com.ecocommute.entities.User;
import com.ecocommute.repositories.RedemptionRepository;
import com.ecocommute.repositories.RewardRepository;
import com.ecocommute.repositories.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RewardService {

    private final RewardRepository rewardRepository;
    private final RedemptionRepository redemptionRepository;
    private final UserRepository userRepository;

    public RewardService(RewardRepository rewardRepository,
                         RedemptionRepository redemptionRepository,
                         UserRepository userRepository) {
        this.rewardRepository = rewardRepository;
        this.redemptionRepository = redemptionRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<Reward> getActiveRewards() {
        return rewardRepository.findByActiveTrueOrderByPointsCostAsc();
    }

    @Transactional(isolation = Isolation.REPEATABLE_READ)
    public Redemption redeem(String userId, Long rewardId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        Reward reward = rewardRepository.findById(rewardId)
                .orElseThrow(() -> new IllegalArgumentException("Recompensa no encontrada"));

        if (!reward.isActive()) {
            throw new IllegalArgumentException("La recompensa no esta activa");
        }
        if (user.getCurrentPoints() < reward.getPointsCost()) {
            throw new IllegalArgumentException("No tienes suficientes puntos verdes para canjear esta recompensa");
        }

        user.setCurrentPoints(user.getCurrentPoints() - reward.getPointsCost());
        userRepository.save(user);

        return redemptionRepository.save(new Redemption(user, reward, reward.getPointsCost()));
    }

    @Transactional(readOnly = true)
    public List<Redemption> getHistory(String userId) {
        return redemptionRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }
}
