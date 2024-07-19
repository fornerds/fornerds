package com.fornerds.domain.user.controller;

import com.fornerds.domain.auth.dto.SignupRequestDto;
import com.fornerds.domain.user.dto.UserDto;
import com.fornerds.domain.user.entity.User;
import com.fornerds.domain.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@Tag(name = "User API", description = "사용자 관련 API")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @PostMapping
    @Operation(summary = "사용자 생성", description = "새로운 사용자를 생성합니다.")
    @ApiResponse(responseCode = "201", description = "사용자 생성 성공")
    public ResponseEntity<UserDto> createUser(@RequestBody @Parameter(description = "사용자 정보") UserDto userDto) {
        User user = userService.createUser(userDto.toEntity());
        UserDto responseDto = new UserDto(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
    }

    @GetMapping("/{id}")
    @Operation(summary = "사용자 조회", description = "특정 사용자의 정보를 조회합니다.")
    @ApiResponse(responseCode = "200", description = "사용자 조회 성공")
    public ResponseEntity<UserDto> getUserById(@PathVariable @Parameter(description = "사용자 ID") Long id) {
        User user = userService.getUserById(id);
        UserDto responseDto = new UserDto(user);
        return ResponseEntity.ok(responseDto);
    }

    @PutMapping("/{id}")
    @Operation(summary = "사용자 수정", description = "특정 사용자의 정보를 수정합니다.")
    @ApiResponse(responseCode = "200", description = "사용자 수정 성공")
    public ResponseEntity<UserDto> updateUser(
            @PathVariable @Parameter(description = "사용자 ID") Long id,
            @RequestBody @Parameter(description = "사용자 수정 정보") UserDto userDto) {
        User user = userService.getUserById(id);
        user.update(userDto);
        User updatedUser = userService.updateUser(user);
        UserDto responseDto = new UserDto(updatedUser);
        return ResponseEntity.ok(responseDto);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "사용자 삭제", description = "특정 사용자를 삭제합니다.")
    @ApiResponse(responseCode = "204", description = "사용자 삭제 성공")
    public ResponseEntity<Void> deleteUser(@PathVariable @Parameter(description = "사용자 ID") Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}

