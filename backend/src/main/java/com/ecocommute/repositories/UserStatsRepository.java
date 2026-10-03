package com.ecocommute.repositories;

import com.ecocommute.entities.UserStats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserStatsRepository extends JpaRepository<UserStats, String> {

    Optional<UserStats> findByUserId(String userId);

    long deleteByUserId(String userId);

    @Query("SELECT s FROM UserStats s JOIN FETCH s.user u WHERE u.active = true ORDER BY s.totalCo2SavedKg DESC")
    List<UserStats> findTopEcoUsers();

    @Query("SELECT s FROM UserStats s JOIN FETCH s.user u WHERE u.active = true AND LOWER(u.district) = LOWER(:district) ORDER BY s.totalCo2SavedKg DESC")
    List<UserStats> findTopEcoUsersByDistrict(@Param("district") String district);

    @Query("SELECT s FROM UserStats s JOIN FETCH s.user u WHERE u.active = true ORDER BY u.currentPoints DESC, s.totalCo2SavedKg DESC")
    List<UserStats> findTopEcoUsersOrderByPoints();

    @Query("SELECT s FROM UserStats s JOIN FETCH s.user u WHERE u.active = true AND LOWER(u.district) = LOWER(:district) ORDER BY u.currentPoints DESC, s.totalCo2SavedKg DESC")
    List<UserStats> findTopEcoUsersByDistrictOrderByPoints(@Param("district") String district);

    @Query("SELECT DISTINCT u.district FROM UserStats s JOIN s.user u WHERE u.active = true AND u.district IS NOT NULL ORDER BY u.district")
    List<String> findActiveDistricts();

    @Query("SELECT COALESCE(SUM(s.totalCo2SavedKg), 0.0) FROM UserStats s")
    double sumTotalCo2SavedKg();

    @Query("SELECT COALESCE(SUM(s.totalDistanceKm), 0.0) FROM UserStats s")
    double sumTotalDistanceKm();

    @Query("SELECT COALESCE(SUM(s.totalTrips), 0) FROM UserStats s")
    long sumTotalTrips();
}
