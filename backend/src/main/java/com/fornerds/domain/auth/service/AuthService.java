package com.fornerds.domain.auth.service;

import com.fornerds.domain.auth.dto.SignupRequestDto;
import com.fornerds.domain.user.entity.Role;
import com.fornerds.domain.user.entity.User;
import com.fornerds.domain.user.repository.UserRepository;
import com.fornerds.global.exception.ApiException;
import com.fornerds.global.util.JwtUtils;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    public User signup(SignupRequestDto signupRequestDto) {
        if (userRepository.existsByEmail(signupRequestDto.getEmail())) {
            throw new ApiException("USER_ALREADY_EXISTS", "User already exists with the provided email", HttpStatus.BAD_REQUEST);
        }

        User user = signupRequestDto.toEntity();
        user.setPassword(passwordEncoder.encode(signupRequestDto.getPassword()));

        String nickname = signupRequestDto.getNickname();
        if (nickname == null || nickname.isEmpty()) {
            nickname = extractNicknameFromEmail(signupRequestDto.getEmail());
        }
        user.setNickname(nickname);

        user.setRole(Role.USER);

        return userRepository.save(user);
    }

    private String extractNicknameFromEmail(String email) {
        int atIndex = email.indexOf("@");
        if (atIndex != -1) {
            return email.substring(0, atIndex);
        }
        return email;
    }

    public User authenticateUser(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException("USER_NOT_FOUND", "User not found with email: " + email, HttpStatus.NOT_FOUND));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new ApiException("INVALID_PASSWORD", "Invalid password", HttpStatus.UNAUTHORIZED);
        }

        return user;
    }

    public String generateAccessToken(String username) {
        return jwtUtils.generateAccessToken(username);
    }

    public String generateRefreshToken(String username) {
        return jwtUtils.generateRefreshToken(username);
    }

    public boolean validateToken(String token) {
        return jwtUtils.validateToken(token);
    }

    public String getUsernameFromToken(String token) {
        return jwtUtils.getUsernameFromToken(token);
    }
}