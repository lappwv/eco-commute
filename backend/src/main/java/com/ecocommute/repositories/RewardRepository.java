package com.ecocommute.repositories;

import com.ecocommute.entities.Reward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RewardRepository extends JpaRepository<Reward, Long> {
    Optional<Reward> findByCode(String code);
    List<Reward> findByActiveTrueOrderByPointsCostAsc();
}
