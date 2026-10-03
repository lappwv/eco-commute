package com.ecocommute.services;

import com.ecocommute.dto.AuthResponseDTO;
import com.ecocommute.dto.BadgeAwardDTO;
import com.ecocommute.dto.GoogleLoginRequestDTO;
import com.ecocommute.dto.LoginRequestDTO;
import com.ecocommute.dto.RegisterRequestDTO;
import com.ecocommute.dto.UserProfileDTO;
import com.ecocommute.entities.Role;
import com.ecocommute.entities.User;
import com.ecocommute.entities.UserStats;
import com.ecocommute.exception.InvalidCredentialsException;
import com.ecocommute.repositories.UserBadgeRepository;
import com.ecocommute.repositories.UserRepository;
import com.ecocommute.repositories.UserStatsRepository;
import com.ecocommute.security.GoogleTokenVerifierService;
import com.ecocommute.security.JwtTokenUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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
    public AuthResponseDTO register(RegisterRequestDTO request) {
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
    public AuthResponseDTO login(LoginRequestDTO request) {
        String email = request.email();
        String password = request.password();

        User user = userRepository.findByEmail(email.toLowerCase().trim())
                .orElseThrow(() -> new InvalidCredentialsException("Credenciales invalidas"));

        if (!user.isActive()) {
            throw new IllegalStateException("Esta cuenta ha sido suspendida");
        }

        if (user.getPassword() == null || !passwordEncoder.matches(password, user.getPassword())) {
            throw new InvalidCredentialsException("Credenciales invalidas");
        }

        String token = jwtTokenUtil.generateToken(user);
        return toAuthResponse(user, token);
    }

    @Transactional
    public AuthResponseDTO googleLogin(GoogleLoginRequestDTO request) {
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
    public UserProfileDTO getProfile(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        UserStats stats = userStatsRepository.findByUserId(userId)
                .orElseGet(() -> new UserStats(user));

        List<BadgeAwardDTO> badges = userBadgeRepository.findByUserId(userId).stream()
                .map(ub -> new BadgeAwardDTO(
                        ub.getBadge().getId(),
                        ub.getBadge().getCode(),
                        ub.getBadge().getTitle(),
                        ub.getBadge().getDescription(),
                        ub.getBadge().getIconEmoji(),
                        ub.getAwardedAt().toString()))
                .toList();

        return new UserProfileDTO(
                user.getId(),
                user.getEmail(),
                user.getFullName(),
                user.getAvatarUrl(),
                user.getRole(),
                user.getCurrentPoints(),
                user.getCurrentLevel(),
                user.getStreakDays(),
                user.isHasBicycle(),
                user.getMaxWalkingMinutes(),
                stats.getTotalCo2SavedKg(),
                stats.getTotalDistanceKm(),
                stats.getTotalTrips(),
                stats.getTotalCaloriesBurned(),
                stats.getTreesEquivalent(),
                badges);
    }

    private AuthResponseDTO toAuthResponse(User user, String token) {
        return new AuthResponseDTO(
                token,
                "Bearer",
                user.getId(),
                user.getEmail(),
                user.getFullName(),
                user.getAvatarUrl(),
                user.getRole(),
                user.getCurrentPoints(),
                user.getCurrentLevel(),
                user.getStreakDays());
    }
}
