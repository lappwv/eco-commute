package com.ecocommute.services;

import com.ecocommute.dto.AuthResponseDTO;
import com.ecocommute.dto.LoginRequestDTO;
import com.ecocommute.dto.RegisterRequestDTO;
import com.ecocommute.entities.Role;
import com.ecocommute.entities.User;
import com.ecocommute.repositories.UserBadgeRepository;
import com.ecocommute.repositories.UserRepository;
import com.ecocommute.repositories.UserStatsRepository;
import com.ecocommute.security.GoogleTokenVerifierService;
import com.ecocommute.security.JwtTokenUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserStatsRepository userStatsRepository;

    @Mock
    private UserBadgeRepository userBadgeRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtTokenUtil jwtTokenUtil;

    @Mock
    private GoogleTokenVerifierService googleTokenVerifierService;

    private AuthService authService;

    @BeforeEach
    void setUp() {
        authService = new AuthService(
                userRepository,
                userStatsRepository,
                userBadgeRepository,
                passwordEncoder,
                jwtTokenUtil,
                googleTokenVerifierService
        );
    }

    @Test
    @DisplayName("Debe registrar un nuevo usuario exitosamente")
    void testRegisterSuccess() {
        RegisterRequestDTO req = new RegisterRequestDTO(
                "test@ecocommute.org",
                "Secret123!",
                "Test User",
                true,
                20
        );

        when(userRepository.existsByEmail(anyString())).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("hashed_password");
        when(userRepository.save(any(User.class))).thenAnswer(inv -> {
            User u = inv.getArgument(0);
            u.setId("user-123");
            return u;
        });
        when(jwtTokenUtil.generateToken(any(User.class))).thenReturn("jwt.token.here");

        AuthResponseDTO response = authService.register(req);

        assertNotNull(response);
        assertEquals("jwt.token.here", response.token());
        assertEquals("test@ecocommute.org", response.email());
        verify(userRepository, times(1)).save(any(User.class));
        verify(userStatsRepository, times(1)).save(any());
    }

    @Test
    @DisplayName("Debe lanzar excepción si el email ya existe")
    void testRegisterDuplicateEmail() {
        RegisterRequestDTO req = new RegisterRequestDTO(
                "existing@ecocommute.org",
                "Secret123!",
                "Test User",
                true,
                20
        );

        when(userRepository.existsByEmail("existing@ecocommute.org")).thenReturn(true);

        assertThrows(IllegalArgumentException.class, () -> authService.register(req));
        verify(userRepository, never()).save(any());
    }

    @Test
    @DisplayName("Debe iniciar sesión exitosamente con credenciales válidas")
    void testLoginSuccess() {
        LoginRequestDTO req = new LoginRequestDTO("test@ecocommute.org", "Secret123!");

        User user = new User();
        user.setId("user-123");
        user.setEmail("test@ecocommute.org");
        user.setPassword("hashed_password");
        user.setRole(Role.ROLE_USER);

        when(userRepository.findByEmail("test@ecocommute.org")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("Secret123!", "hashed_password")).thenReturn(true);
        when(jwtTokenUtil.generateToken(user)).thenReturn("jwt.token.here");

        AuthResponseDTO response = authService.login(req);

        assertNotNull(response);
        assertEquals("jwt.token.here", response.token());
        assertEquals("user-123", response.id());
    }

    @Test
    @DisplayName("Debe fallar el inicio de sesión con contraseña incorrecta")
    void testLoginInvalidPassword() {
        LoginRequestDTO req = new LoginRequestDTO("test@ecocommute.org", "WrongPassword");

        User user = new User();
        user.setEmail("test@ecocommute.org");
        user.setPassword("hashed_password");

        when(userRepository.findByEmail("test@ecocommute.org")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("WrongPassword", "hashed_password")).thenReturn(false);

        assertThrows(IllegalArgumentException.class, () -> authService.login(req));
    }
}
