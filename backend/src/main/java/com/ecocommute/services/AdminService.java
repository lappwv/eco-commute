package com.ecocommute.services;

import com.ecocommute.dto.AdminKpisDTO;
import com.ecocommute.dto.AdminUserUpdateRequestDTO;
import com.ecocommute.dto.BadgeRequestDTO;
import com.ecocommute.dto.ChallengeRequestDTO;
import com.ecocommute.dto.EmissionFactorRequestDTO;
import com.ecocommute.dto.RewardRequestDTO;
import com.ecocommute.entities.*;
import com.ecocommute.repositories.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.time.LocalDateTime;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final UserStatsRepository userStatsRepository;
    private final TripRepository tripRepository;
    private final EmissionFactorRepository emissionFactorRepository;
    private final BadgeRepository badgeRepository;
    private final UserBadgeRepository userBadgeRepository;
    private final RewardRepository rewardRepository;
    private final RedemptionRepository redemptionRepository;
    private final ChallengeRepository challengeRepository;

    public AdminService(UserRepository userRepository,
                        UserStatsRepository userStatsRepository,
                        TripRepository tripRepository,
                        EmissionFactorRepository emissionFactorRepository,
                        BadgeRepository badgeRepository,
                        UserBadgeRepository userBadgeRepository,
                        RewardRepository rewardRepository,
                        RedemptionRepository redemptionRepository,
                        ChallengeRepository challengeRepository) {
        this.userRepository = userRepository;
        this.userStatsRepository = userStatsRepository;
        this.tripRepository = tripRepository;
        this.emissionFactorRepository = emissionFactorRepository;
        this.badgeRepository = badgeRepository;
        this.userBadgeRepository = userBadgeRepository;
        this.rewardRepository = rewardRepository;
        this.redemptionRepository = redemptionRepository;
        this.challengeRepository = challengeRepository;
    }

    @Transactional(readOnly = true)
    public AdminKpisDTO getAdminKpis() {
        long totalUsers = userRepository.count();
        long totalTrips = tripRepository.count();
        double totalCo2 = userStatsRepository.sumTotalCo2SavedKg();
        long suspiciousCount = tripRepository.findBySuspiciousTrueOrderByCompletedAtDesc(PageRequest.of(0, 1)).getTotalElements();

        return new AdminKpisDTO(totalUsers, totalTrips, totalCo2, suspiciousCount);
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
    public User updateUser(String userId, AdminUserUpdateRequestDTO request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));
        user.setFullName(request.fullName().trim());
        if (request.district() != null && !request.district().isBlank()) {
            user.setDistrict(request.district().trim());
        }
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
        redemptionRepository.deleteByUserId(userId);
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
    public EmissionFactor createEmissionFactor(EmissionFactorRequestDTO request) {
        if (emissionFactorRepository.findAll().stream().anyMatch(f -> f.getTransportMode() == request.transportMode())) {
            throw new IllegalArgumentException("Ya existe un factor para ese medio de transporte");
        }
        return emissionFactorRepository.save(toEmissionFactor(new EmissionFactor(), request));
    }

    @Transactional
    public EmissionFactor updateEmissionFactor(Long id, EmissionFactorRequestDTO request) {
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
    public Badge createBadge(BadgeRequestDTO request) {
        if (badgeRepository.findByCode(request.code().trim()).isPresent()) {
            throw new IllegalArgumentException("Ya existe una insignia con ese codigo");
        }
        return badgeRepository.save(toBadge(new Badge(), request));
    }

    @Transactional
    public Badge updateBadge(Long id, BadgeRequestDTO request) {
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

    @Transactional(readOnly = true)
    public List<Reward> getRewards() {
        return rewardRepository.findAll();
    }

    @Transactional
    public Reward createReward(RewardRequestDTO request) {
        if (rewardRepository.findByCode(request.code().trim()).isPresent()) {
            throw new IllegalArgumentException("Ya existe una recompensa con ese codigo");
        }
        return rewardRepository.save(toReward(new Reward(), request));
    }

    @Transactional
    public Reward updateReward(Long id, RewardRequestDTO request) {
        Reward reward = rewardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Recompensa no encontrada"));
        rewardRepository.findByCode(request.code().trim())
                .filter(existing -> !existing.getId().equals(id))
                .ifPresent(existing -> { throw new IllegalArgumentException("Ya existe una recompensa con ese codigo"); });
        return rewardRepository.save(toReward(reward, request));
    }

    @Transactional
    public void deleteReward(Long id) {
        if (!rewardRepository.existsById(id)) {
            throw new IllegalArgumentException("Recompensa no encontrada");
        }
        redemptionRepository.deleteByRewardId(id);
        rewardRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<Challenge> getChallenges() {
        return challengeRepository.findAll();
    }

    @Transactional
    public Challenge createChallenge(ChallengeRequestDTO request) {
        validateChallengePeriod(request);
        return challengeRepository.save(toChallenge(new Challenge(), request));
    }

    @Transactional
    public Challenge updateChallenge(Long id, ChallengeRequestDTO request) {
        Challenge challenge = challengeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Reto no encontrado"));
        validateChallengePeriod(request);
        return challengeRepository.save(toChallenge(challenge, request));
    }

    @Transactional
    public void deleteChallenge(Long id) {
        if (!challengeRepository.existsById(id)) {
            throw new IllegalArgumentException("Reto no encontrado");
        }
        challengeRepository.deleteById(id);
    }

    private void validateChallengePeriod(ChallengeRequestDTO request) {
        if (request.periodEnd().isBefore(request.periodStart())) {
            throw new IllegalArgumentException("El fin del periodo no puede ser anterior al inicio");
        }
    }

    private Reward toReward(Reward reward, RewardRequestDTO request) {
        reward.setCode(request.code().trim());
        reward.setTitle(request.title().trim());
        reward.setDescription(request.description());
        reward.setPointsCost(request.pointsCost());
        reward.setIconEmoji(request.iconEmoji());
        reward.setIconUrl(request.iconUrl());
        reward.setActive(request.active());
        return reward;
    }

    private Challenge toChallenge(Challenge challenge, ChallengeRequestDTO request) {
        challenge.setTitle(request.title().trim());
        challenge.setDescription(request.description());
        challenge.setGoalValue(request.goalValue());
        challenge.setGoalUnit(request.goalUnit());
        challenge.setPeriodStart(request.periodStart());
        challenge.setPeriodEnd(request.periodEnd());
        challenge.setActive(request.active());
        return challenge;
    }

    private EmissionFactor toEmissionFactor(EmissionFactor factor, EmissionFactorRequestDTO request) {
        factor.setTransportMode(request.transportMode());
        factor.setGramsCo2PerKm(request.gramsCo2PerKm());
        factor.setDescription(request.description().trim());
        factor.setUpdatedAt(LocalDateTime.now());
        return factor;
    }

    private Badge toBadge(Badge badge, BadgeRequestDTO request) {
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
