package com.ecocommute.services;

import com.ecocommute.entities.Redemption;
import com.ecocommute.entities.Reward;
import com.ecocommute.entities.User;
import com.ecocommute.repositories.RedemptionRepository;
import com.ecocommute.repositories.RewardRepository;
import com.ecocommute.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RewardServiceTest {

    @Mock
    private RewardRepository rewardRepository;

    @Mock
    private RedemptionRepository redemptionRepository;

    @Mock
    private UserRepository userRepository;

    private RewardService rewardService;

    private User user;
    private Reward reward;

    @BeforeEach
    void setUp() {
        rewardService = new RewardService(rewardRepository, redemptionRepository, userRepository);

        user = new User();
        user.setId("user-1");
        user.setCurrentPoints(200);

        reward = new Reward("COFFEE_50", "Cafe de cortesia", "Cafe gratis", 50, "coffee");
        reward.setId(1L);
    }

    @Test
    @DisplayName("El canje descuenta puntos y registra la transaccion")
    void redeemDeductsPointsAndRegistersRedemption() {
        when(userRepository.findById("user-1")).thenReturn(Optional.of(user));
        when(rewardRepository.findById(1L)).thenReturn(Optional.of(reward));
        when(redemptionRepository.save(any(Redemption.class))).thenAnswer(inv -> inv.getArgument(0));

        Redemption redemption = rewardService.redeem("user-1", 1L);

        assertEquals(150, user.getCurrentPoints());
        assertEquals(50, redemption.getPointsUsed());
        assertEquals("COFFEE_50", redemption.getReward().getCode());
        verify(userRepository).save(user);
        verify(redemptionRepository).save(any(Redemption.class));
    }

    @Test
    @DisplayName("No permite canjear si no hay suficientes puntos")
    void redeemRejectsInsufficientPoints() {
        user.setCurrentPoints(10);
        when(userRepository.findById("user-1")).thenReturn(Optional.of(user));
        when(rewardRepository.findById(1L)).thenReturn(Optional.of(reward));

        IllegalArgumentException error = assertThrows(IllegalArgumentException.class,
                () -> rewardService.redeem("user-1", 1L));

        assertTrue(error.getMessage().contains("suficientes puntos"));
        assertEquals(10, user.getCurrentPoints());
        verify(redemptionRepository, never()).save(any(Redemption.class));
    }

    @Test
    @DisplayName("No permite canjear una recompensa inactiva")
    void redeemRejectsInactiveReward() {
        reward.setActive(false);
        when(userRepository.findById("user-1")).thenReturn(Optional.of(user));
        when(rewardRepository.findById(1L)).thenReturn(Optional.of(reward));

        IllegalArgumentException error = assertThrows(IllegalArgumentException.class,
                () -> rewardService.redeem("user-1", 1L));

        assertTrue(error.getMessage().contains("no esta activa"));
        assertEquals(200, user.getCurrentPoints());
        verify(redemptionRepository, never()).save(any(Redemption.class));
    }

    @Test
    @DisplayName("Falla si la recompensa no existe")
    void redeemFailsWhenRewardDoesNotExist() {
        when(userRepository.findById("user-1")).thenReturn(Optional.of(user));
        when(rewardRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class, () -> rewardService.redeem("user-1", 99L));
        verify(redemptionRepository, never()).save(any(Redemption.class));
    }

    @Test
    @DisplayName("El catalogo solo incluye recompensas activas")
    void getActiveRewardsReturnsOnlyActiveOnes() {
        when(rewardRepository.findByActiveTrueOrderByPointsCostAsc()).thenReturn(List.of(reward));

        List<Reward> rewards = rewardService.getActiveRewards();

        assertEquals(1, rewards.size());
        assertEquals("COFFEE_50", rewards.get(0).getCode());
    }

    @Test
    @DisplayName("El historial de canjes usa el usuario autenticado")
    void getHistoryUsesAuthenticatedUser() {
        when(redemptionRepository.findByUserIdOrderByCreatedAtDesc("user-1")).thenReturn(List.of());

        assertTrue(rewardService.getHistory("user-1").isEmpty());
        verify(redemptionRepository).findByUserIdOrderByCreatedAtDesc("user-1");
        verify(redemptionRepository, never()).findByUserIdOrderByCreatedAtDesc("other-user");
    }
}
