package com.ecocommute.services;

import com.ecocommute.dto.GoogleLoginRequestDTO;
import com.ecocommute.dto.LoginRequestDTO;
import com.ecocommute.dto.RegisterRequestDTO;
import com.ecocommute.entities.Role;
import com.ecocommute.entities.User;
import com.ecocommute.entities.UserStats;
import com.ecocommute.repositories.UserBadgeRepository;
import com.ecocommute.repositories.UserRepository;
import com.ecocommute.repositories.UserStatsRepository;
import com.ecocommute.security.GoogleTokenVerifierService;
import com.ecocommute.security.JwtTokenUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final UserStatsRepository userStatsRepository;
    private final UserBadgeRepository userBadgeRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenUtil jwtTokenUtil;
    private final GoogleTokenVerifierService googleTokenVerifierService;

    public AuthService(UserRepository userRepository,
                       UserStatsRepository userStatsRepository,
                       UserBadgeRepository userBadgeRepository,
                       PasswordEncoder passwordEncoder,
                       JwtTokenUtil jwtTokenUtil,
                       GoogleTokenVerifierService googleTokenVerifierService) {
        this.userRepository = userRepository;
        this.userStatsRepository = userStatsRepository;
        this.userBadgeRepository = userBadgeRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenUtil = jwtTokenUtil;
        this.googleTokenVerifierService = googleTokenVerifierService;
    }

    @Transactional
    public Map<String, Object> register(RegisterRequestDTO request) {
        String email = request.email();
        String password = request.password();
        String fullName = request.fullName();

        if (userRepository.existsByEmail(email.toLowerCase().trim())) {
            throw new IllegalArgumentException("El correo ya se encuentra registrado");
        }

        User user = new User();
        user.setEmail(email.toLowerCase().trim());
        user.setPassword(passwordEncoder.encode(password));
        user.setFullName(fullName.trim());
        user.setRole(Role.ROLE_USER);
        user.setAuthProvider("LOCAL");
        user.setAvatarUrl("https://api.dicebear.com/7.x/bottts/svg?seed=" + user.getEmail());
        if (request.hasBicycle() != null) user.setHasBicycle(request.hasBicycle());
        if (request.maxWalkingMinutes() != null) user.setMaxWalkingMinutes(request.maxWalkingMinutes());

        user = userRepository.save(user);

        UserStats stats = new UserStats(user);
        userStatsRepository.save(stats);

        String token = jwtTokenUtil.generateToken(user);
        return toAuthResponse(user, token);
    }

    @Transactional(readOnly = true)
    public Map<String, Object> login(LoginRequestDTO request) {
        String email = request.email();
        String password = request.password();

        User user = userRepository.findByEmail(email.toLowerCase().trim())
                .orElseThrow(() -> new IllegalArgumentException("Credenciales inválidas"));

        if (!user.isActive()) {
            throw new IllegalStateException("Esta cuenta ha sido suspendida");
        }

        if (user.getPassword() == null || !passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("Credenciales inválidas");
        }

        String token = jwtTokenUtil.generateToken(user);
        return toAuthResponse(user, token);
    }

    @Transactional
    public Map<String, Object> googleLogin(GoogleLoginRequestDTO request) {
        String idToken = request.idToken();

        GoogleTokenVerifierService.GoogleUserInfo googleUser = googleTokenVerifierService.verifyToken(idToken);
        if (googleUser == null) {
            throw new IllegalArgumentException("Token de Google inválido o expirado");
        }

        User user = userRepository.findByGoogleSub(googleUser.sub())
                .or(() -> userRepository.findByEmail(googleUser.email().toLowerCase()))
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setEmail(googleUser.email().toLowerCase());
                    newUser.setFullName(googleUser.name() != null ? googleUser.name() : "Usuario Google");
                    newUser.setGoogleSub(googleUser.sub());
                    newUser.setAuthProvider("GOOGLE");
                    newUser.setAvatarUrl(googleUser.pictureUrl() != null ? googleUser.pictureUrl() : "https://api.dicebear.com/7.x/bottts/svg?seed=" + googleUser.email());
                    newUser.setRole(Role.ROLE_USER);
                    User saved = userRepository.save(newUser);

                    UserStats stats = new UserStats(saved);
                    userStatsRepository.save(stats);
                    return saved;
                });

        if (!user.isActive()) {
            throw new IllegalStateException("Esta cuenta ha sido suspendida");
        }

        if (user.getGoogleSub() == null) {
            user.setGoogleSub(googleUser.sub());
        }
        if (googleUser.pictureUrl() != null) {
            user.setAvatarUrl(googleUser.pictureUrl());
        }
        user = userRepository.save(user);

        String token = jwtTokenUtil.generateToken(user);
        return toAuthResponse(user, token);
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getProfile(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        UserStats stats = userStatsRepository.findByUserId(userId)
                .orElseGet(() -> new UserStats(user));

        List<Map<String, Object>> badges = userBadgeRepository.findByUserId(userId).stream()
                .map(ub -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("id", ub.getBadge().getId());
                    map.put("code", ub.getBadge().getCode());
                    map.put("title", ub.getBadge().getTitle());
                    map.put("description", ub.getBadge().getDescription());
                    map.put("iconEmoji", ub.getBadge().getIconEmoji());
                    map.put("awardedAt", ub.getAwardedAt().toString());
                    return map;
                })
                .toList();

        Map<String, Object> profile = new HashMap<>();
        profile.put("id", user.getId());
        profile.put("email", user.getEmail());
        profile.put("fullName", user.getFullName());
        profile.put("avatarUrl", user.getAvatarUrl());
        profile.put("role", user.getRole());
        profile.put("currentPoints", user.getCurrentPoints());
        profile.put("currentLevel", user.getCurrentLevel());
        profile.put("streakDays", user.getStreakDays());
        profile.put("hasBicycle", user.isHasBicycle());
        profile.put("maxWalkingMinutes", user.getMaxWalkingMinutes());
        profile.put("totalCo2SavedKg", stats.getTotalCo2SavedKg());
        profile.put("totalDistanceKm", stats.getTotalDistanceKm());
        profile.put("totalTrips", stats.getTotalTrips());
        profile.put("totalCaloriesBurned", stats.getTotalCaloriesBurned());
        profile.put("treesEquivalent", stats.getTreesEquivalent());
        profile.put("badges", badges);
        return profile;
    }

    private Map<String, Object> toAuthResponse(User user, String token) {
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("tokenType", "Bearer");
        response.put("id", user.getId());
        response.put("email", user.getEmail());
        response.put("fullName", user.getFullName());
        response.put("avatarUrl", user.getAvatarUrl());
        response.put("role", user.getRole());
        response.put("currentPoints", user.getCurrentPoints());
        response.put("currentLevel", user.getCurrentLevel());
        response.put("streakDays", user.getStreakDays());
        return response;
    }
}
