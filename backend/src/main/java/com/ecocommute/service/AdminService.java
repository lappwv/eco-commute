package com.ecocommute.service;

import com.ecocommute.dto.AdminUserUpdateRequest;
import com.ecocommute.dto.BadgeRequest;
import com.ecocommute.dto.EmissionFactorRequest;
import com.ecocommute.entity.*;
import com.ecocommute.repository.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.time.LocalDateTime;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final UserStatsRepository userStatsRepository;
    private final TripRepository tripRepository;
    private final EmissionFactorRepository emissionFactorRepository;
    private final BadgeRepository badgeRepository;
    private final UserBadgeRepository userBadgeRepository;

    public AdminService(UserRepository userRepository,
                        UserStatsRepository userStatsRepository,
                        TripRepository tripRepository,
                        EmissionFactorRepository emissionFactorRepository,
                        BadgeRepository badgeRepository,
                        UserBadgeRepository userBadgeRepository) {
        this.userRepository = userRepository;
        this.userStatsRepository = userStatsRepository;
        this.tripRepository = tripRepository;
        this.emissionFactorRepository = emissionFactorRepository;
        this.badgeRepository = badgeRepository;
        this.userBadgeRepository = userBadgeRepository;
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getAdminKpis() {
        long totalUsers = userRepository.count();
        long totalTrips = tripRepository.count();
        double totalCo2 = userStatsRepository.sumTotalCo2SavedKg();
        long suspiciousCount = tripRepository.findBySuspiciousTrueOrderByCompletedAtDesc(PageRequest.of(0, 1)).getTotalElements();

        Map<String, Object> kpis = new HashMap<>();
        kpis.put("totalUsers", totalUsers);
        kpis.put("totalTrips", totalTrips);
        kpis.put("totalCo2SavedKg", totalCo2);
        kpis.put("suspiciousTripsCount", suspiciousCount);
        return kpis;
    }

    @Transactional(readOnly = true)
    public Page<User> getUsers(int page, int size, String search) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        if (search != null && !search.trim().isEmpty()) {
            return userRepository.findByFullNameContainingIgnoreCaseOrEmailContainingIgnoreCase(search.trim(), search.trim(), pageRequest);
        }
        return userRepository.findAll(pageRequest);
    }

    @Transactional
    public User toggleUserStatus(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));
        user.setActive(!user.isActive());
        return userRepository.save(user);
    }

    @Transactional
    public User updateUser(String userId, AdminUserUpdateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));
        user.setFullName(request.fullName().trim());
        user.setRole(request.role());
        user.setActive(request.active());
        user.setHasBicycle(request.hasBicycle());
        user.setMaxWalkingMinutes(request.maxWalkingMinutes());
        return userRepository.save(user);
    }

    @Transactional
    public void deleteUser(String userId) {
        if (!userRepository.existsById(userId)) {
            throw new IllegalArgumentException("Usuario no encontrado");
        }
        userBadgeRepository.deleteByUserId(userId);
        tripRepository.deleteByUserId(userId);
        userStatsRepository.deleteByUserId(userId);
        userRepository.deleteById(userId);
    }

    @Transactional(readOnly = true)
    public Page<Trip> getSuspiciousTrips(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "completedAt"));
        return tripRepository.findBySuspiciousTrueOrderByCompletedAtDesc(pageRequest);
    }

    @Transactional(readOnly = true)
    public List<EmissionFactor> getEmissionFactors() {
        return emissionFactorRepository.findAll();
    }

    @Transactional
    public EmissionFactor updateEmissionFactor(Long id, double gramsCo2PerKm) {
        EmissionFactor factor = emissionFactorRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Factor no encontrado"));
        factor.setGramsCo2PerKm(gramsCo2PerKm);
        return emissionFactorRepository.save(factor);
    }

    @Transactional
    public EmissionFactor createEmissionFactor(EmissionFactorRequest request) {
        if (emissionFactorRepository.findAll().stream().anyMatch(f -> f.getTransportMode() == request.transportMode())) {
            throw new IllegalArgumentException("Ya existe un factor para ese medio de transporte");
        }
        return emissionFactorRepository.save(toEmissionFactor(new EmissionFactor(), request));
    }

    @Transactional
    public EmissionFactor updateEmissionFactor(Long id, EmissionFactorRequest request) {
        EmissionFactor factor = emissionFactorRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Factor no encontrado"));
        return emissionFactorRepository.save(toEmissionFactor(factor, request));
    }

    @Transactional
    public void deleteEmissionFactor(Long id) {
        if (!emissionFactorRepository.existsById(id)) {
            throw new IllegalArgumentException("Factor no encontrado");
        }
        emissionFactorRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<Badge> getBadges() {
        return badgeRepository.findAll();
    }

    @Transactional
    public Badge createBadge(BadgeRequest request) {
        if (badgeRepository.findByCode(request.code().trim()).isPresent()) {
            throw new IllegalArgumentException("Ya existe una insignia con ese codigo");
        }
        return badgeRepository.save(toBadge(new Badge(), request));
    }

    @Transactional
    public Badge updateBadge(Long id, BadgeRequest request) {
        Badge badge = badgeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Insignia no encontrada"));
        badgeRepository.findByCode(request.code().trim())
                .filter(existing -> !existing.getId().equals(id))
                .ifPresent(existing -> { throw new IllegalArgumentException("Ya existe una insignia con ese codigo"); });
        return badgeRepository.save(toBadge(badge, request));
    }

    @Transactional
    public void deleteBadge(Long id) {
        if (!badgeRepository.existsById(id)) {
            throw new IllegalArgumentException("Insignia no encontrada");
        }
        userBadgeRepository.deleteByBadgeId(id);
        badgeRepository.deleteById(id);
    }

    private EmissionFactor toEmissionFactor(EmissionFactor factor, EmissionFactorRequest request) {
        factor.setTransportMode(request.transportMode());
        factor.setGramsCo2PerKm(request.gramsCo2PerKm());
        factor.setDescription(request.description().trim());
        factor.setUpdatedAt(LocalDateTime.now());
        return factor;
    }

    private Badge toBadge(Badge badge, BadgeRequest request) {
        badge.setCode(request.code().trim());
        badge.setTitle(request.title().trim());
        badge.setDescription(request.description());
        badge.setIconUrl(request.iconUrl());
        badge.setIconEmoji(request.iconEmoji());
        badge.setRequiredPoints(request.requiredPoints());
        badge.setRequiredCo2SavedKg(request.requiredCo2SavedKg());
        badge.setRequiredStreakDays(request.requiredStreakDays());
        badge.setRequiredTrips(request.requiredTrips());
        return badge;
    }
}
