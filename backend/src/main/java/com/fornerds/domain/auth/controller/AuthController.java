package com.fornerds.domain.auth.controller;

import com.fornerds.domain.auth.dto.AuthResponse;
import com.fornerds.domain.auth.dto.LoginRequest;
import com.fornerds.domain.auth.dto.RefreshTokenRequest;
import com.fornerds.domain.auth.service.AuthService;
import com.fornerds.domain.auth.dto.SignupRequestDto;
import com.fornerds.domain.user.dto.UserDto;
import com.fornerds.domain.user.entity.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication API", description = "인증 관련 API")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    @Operation(summary = "회원가입", description = "새로운 사용자를 등록합니다.")
    @ApiResponse(responseCode = "200", description = "회원가입 성공")
    public ResponseEntity<UserDto> signup(@RequestBody @Parameter(description = "회원가입 요청 정보") SignupRequestDto signupRequestDto) {
        User user = authService.signup(signupRequestDto);
        UserDto responseUserDto = new UserDto(user);
        return ResponseEntity.ok(responseUserDto);
    }

    @PostMapping("/login")
    @Operation(summary = "로그인", description = "사용자 로그인을 처리합니다.")
    @ApiResponse(responseCode = "200", description = "로그인 성공")
    @ApiResponse(responseCode = "401", description = "인증 실패")
    public ResponseEntity<AuthResponse> login(@RequestBody @Parameter(description = "로그인 요청 정보") LoginRequest loginRequest, HttpSession session) {
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
    @Operation(summary = "토큰 갱신", description = "리프레시 토큰을 사용하여 새로운 액세스 토큰을 발급받습니다.")
    @ApiResponse(responseCode = "200", description = "토큰 갱신 성공")
    @ApiResponse(responseCode = "401", description = "인증 실패")
    public ResponseEntity<AuthResponse> refreshToken(@RequestBody @Parameter(description = "리프레시 토큰 요청 정보") RefreshTokenRequest refreshTokenRequest) {
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