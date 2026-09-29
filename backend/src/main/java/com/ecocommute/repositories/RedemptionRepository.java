package com.ecocommute.repositories;

import com.ecocommute.entities.Redemption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RedemptionRepository extends JpaRepository<Redemption, String> {
    List<Redemption> findByUserIdOrderByCreatedAtDesc(String userId);
    long deleteByUserId(String userId);
    long deleteByRewardId(Long rewardId);
}
