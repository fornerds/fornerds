package com.fornerds.domain.auth.controller;

import com.fornerds.domain.auth.dto.AuthResponse;
import com.fornerds.domain.auth.dto.LoginRequest;
import com.fornerds.domain.auth.dto.RefreshTokenRequest;
import com.fornerds.domain.auth.service.AuthService;
import com.fornerds.domain.auth.dto.SignupRequestDto;
import com.fornerds.domain.user.dto.UserDto;
import com.fornerds.domain.user.entity.User;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<UserDto> signup(@RequestBody SignupRequestDto signupRequestDto) {
        User user = authService.signup(signupRequestDto);
        UserDto responseUserDto = new UserDto(user);
        return ResponseEntity.ok(responseUserDto);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest, HttpSession session) {
        User user = authService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String accessToken = authService.generateAccessToken(user.getEmail());
        String refreshToken = authService.generateRefreshToken(user.getEmail());

        session.setAttribute("accessToken", accessToken);

        AuthResponse authResponse = new AuthResponse(accessToken, refreshToken);
        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refreshToken(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        String refreshToken = refreshTokenRequest.getRefreshToken();

        if (authService.validateToken(refreshToken)) {
            String username = authService.getUsernameFromToken(refreshToken);
            String newAccessToken = authService.generateAccessToken(username);
            String newRefreshToken = authService.generateRefreshToken(username);

            AuthResponse authResponse = new AuthResponse(newAccessToken, newRefreshToken);
            return ResponseEntity.ok(authResponse);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}