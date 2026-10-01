package com.ecocommute.services;

import com.ecocommute.dto.*;
import com.ecocommute.entities.TransportMode;
import com.ecocommute.entities.Trip;
import com.ecocommute.entities.User;
import com.ecocommute.entities.UserStats;
import com.ecocommute.repositories.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class StatsService {

    private final UserRepository userRepository;
    private final UserStatsRepository userStatsRepository;
    private final TripRepository tripRepository;
    private final UserBadgeRepository userBadgeRepository;
    private final BadgeRepository badgeRepository;
    private final DashboardService dashboardService;

    public StatsService(UserRepository userRepository,
                        UserStatsRepository userStatsRepository,
                        TripRepository tripRepository,
                        UserBadgeRepository userBadgeRepository,
                        BadgeRepository badgeRepository,
                        DashboardService dashboardService) {
        this.userRepository = userRepository;
        this.userStatsRepository = userStatsRepository;
        this.tripRepository = tripRepository;
        this.userBadgeRepository = userBadgeRepository;
        this.badgeRepository = badgeRepository;
        this.dashboardService = dashboardService;
    }

    @Transactional(readOnly = true)
    public UserStatsDetailDTO getUserStats(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        UserStats stats = userStatsRepository.findByUserId(userId)
                .orElseGet(() -> new UserStats(user));

        List<Trip> trips = tripRepository.findByUserIdOrderByCompletedAtDesc(userId);
        Map<String, Long> tripsByMode = trips.stream()
                .collect(Collectors.groupingBy(t -> t.getTransportMode().name(), Collectors.counting()));

        int unlockedBadgesCount = userBadgeRepository.findByUserId(userId).size();
        int totalBadgesCount = (int) badgeRepository.count();

        return new UserStatsDetailDTO(
                user.getId(),
                user.getFullName(),
                stats.getTotalCo2SavedKg(),
                stats.getTotalDistanceKm(),
                stats.getTotalTrips(),
                stats.getTotalCaloriesBurned(),
                stats.getTreesEquivalent(),
                stats.getGasolineLitersSaved(),
                stats.getKwhEquivalent(),
                stats.getEcoScore(),
                user.getCurrentPoints(),
                user.getCurrentLevel(),
                user.getStreakDays(),
                unlockedBadgesCount,
                totalBadgesCount,
                tripsByMode,
                stats.getUpdatedAt()
        );
    }

    @Transactional(readOnly = true)
    public List<TransportModeStatsDTO> getTransportModeBreakdown(String userId) {
        List<Trip> trips = tripRepository.findByUserIdOrderByCompletedAtDesc(userId);
        Map<TransportMode, List<Trip>> grouped = trips.stream()
                .filter(t -> t.getTransportMode() != null)
                .collect(Collectors.groupingBy(Trip::getTransportMode));

        return grouped.entrySet().stream()
                .map(entry -> {
                    TransportMode mode = entry.getKey();
                    List<Trip> modeTrips = entry.getValue();
                    long count = modeTrips.size();
                    double distanceKm = Math.round(modeTrips.stream().mapToDouble(Trip::getDistanceKm).sum() * 100.0) / 100.0;
                    double co2SavedKg = Math.round((modeTrips.stream().mapToDouble(Trip::getCo2SavedGrams).sum() / 1000.0) * 100.0) / 100.0;
                    int calories = modeTrips.stream().mapToInt(Trip::getCaloriesBurned).sum();
                    return new TransportModeStatsDTO(mode, mode.getDisplayName(), count, distanceKm, co2SavedKg, calories);
                })
                .sorted(Comparator.comparing(TransportModeStatsDTO::tripsCount).reversed())
                .toList();
    }

    @Transactional(readOnly = true)
    public EcoCertificateDTO generateCertificate(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        UserStats stats = userStatsRepository.findByUserId(userId)
                .orElseGet(() -> new UserStats(user));

        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        List<BadgeAwardDTO> unlockedBadges = userBadgeRepository.findByUserId(userId).stream()
                .map(ub -> new BadgeAwardDTO(
                        ub.getBadge().getId(),
                        ub.getBadge().getCode(),
                        ub.getBadge().getTitle(),
                        ub.getBadge().getDescription(),
                        ub.getBadge().getIconEmoji(),
                        ub.getAwardedAt() != null ? ub.getAwardedAt().format(formatter) : null
                ))
                .toList();

        String certId = UUID.randomUUID().toString();
        String verificationCode = "ECO-CERT-" + certId.substring(0, 8).toUpperCase();
        String levelTitle = getLevelTitle(user.getCurrentLevel());

        String statement = String.format(
                "Certificado oficial de movilidad sostenible otorgado a %s por haber ahorrado %.2f kg de CO2 en Lima Metropolitana a lo largo de %d viajes limpios.",
                user.getFullName(), stats.getTotalCo2SavedKg(), stats.getTotalTrips()
        );

        return new EcoCertificateDTO(
                certId,
                verificationCode,
                LocalDateTime.now(),
                user.getFullName(),
                user.getEmail(),
                user.getDistrict() != null ? user.getDistrict() : "Lima Metropolitana",
                user.getCurrentLevel(),
                levelTitle,
                user.getCurrentPoints(),
                user.getStreakDays(),
                stats.getTotalCo2SavedKg(),
                stats.getTreesEquivalent(),
                stats.getGasolineLitersSaved(),
                stats.getKwhEquivalent(),
                stats.getTotalTrips(),
                stats.getTotalDistanceKm(),
                stats.getTotalCaloriesBurned(),
                stats.getEcoScore(),
                unlockedBadges,
                statement
        );
    }

    @Transactional(readOnly = true)
    public EcoImpactReportDTO generateImpactReport(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        UserStatsDetailDTO statsDetail = getUserStats(userId);
        List<TransportModeStatsDTO> breakdown = getTransportModeBreakdown(userId);

        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        List<BadgeAwardDTO> unlockedBadges = userBadgeRepository.findByUserId(userId).stream()
                .map(ub -> new BadgeAwardDTO(
                        ub.getBadge().getId(),
                        ub.getBadge().getCode(),
                        ub.getBadge().getTitle(),
                        ub.getBadge().getDescription(),
                        ub.getBadge().getIconEmoji(),
                        ub.getAwardedAt() != null ? ub.getAwardedAt().format(formatter) : null
                ))
                .toList();

        int totalAvailable = (int) badgeRepository.count();
        int totalEarned = unlockedBadges.size();
        double completionRate = totalAvailable > 0
                ? Math.round((totalEarned / (double) totalAvailable) * 1000.0) / 10.0
                : 0.0;

        String recommendation;
        if (statsDetail.totalTrips() == 0) {
            recommendation = "Aún no registras viajes sostenibles. Te sugerimos empezar con caminatas de 15 minutos o trayectos cortos en bicicleta para desbloquear tu medalla Primer Paso Verde.";
        } else if (statsDetail.totalDistanceKm() < 20.0) {
            recommendation = "¡Excelente comienzo! Mantén tu racha diaria activa para duplicar tu multiplicador de puntos verdes en tus próximos recorridos.";
        } else {
            recommendation = "¡Eres un referente ecológico urbano! Tu aporte equivale a haber plantado más de " + Math.max(1, (int) Math.round(statsDetail.treesEquivalent())) + " árboles maduros en la ciudad.";
        }

        return new EcoImpactReportDTO(
                user.getId(),
                user.getFullName(),
                user.getDistrict() != null ? user.getDistrict() : "Lima Metropolitana",
                LocalDateTime.now(),
                statsDetail,
                breakdown,
                totalEarned,
                totalAvailable,
                completionRate,
                unlockedBadges,
                recommendation
        );
    }

    private String getLevelTitle(int level) {
        return switch (level) {
            case 1 -> "Eco Novato";
            case 2 -> "Viajero Verde";
            case 3 -> "Explorador Sostenible";
            case 4 -> "Defensor del Clima";
            case 5 -> "Líder Cero Emisiones";
            default -> "Campeón Planetario";
        };
    }

    @Transactional(readOnly = true)
    public CommunityImpactDTO getCommunityImpact() {
        return dashboardService.getCommunityImpact();
    }
}
