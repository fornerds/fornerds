package com.fornerds;

import com.fornerds.domain.user.entity.Role;
import com.fornerds.domain.user.entity.User;
import com.fornerds.domain.user.repository.UserRepository;
import com.fornerds.domain.user.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class UserServiceTest {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        userRepository.save(new User("user11@example.com", "password1", "User One", "userone", null, Role.USER));
        userRepository.save(new User("user22@example.com", "password2", "User Two", "usertwo", null, Role.USER));
    }

    @Test
    void testCreateUser() {
        User user = new User("test@example.com", "password", "Test User", "testuser", null, Role.USER);
        User createdUser = userService.createUser(user);

        assertThat(createdUser).isNotNull();
        assertThat(createdUser.getEmail()).isEqualTo("test@example.com");
    }

    @Test
    void testGetUserById() {
        User user = userRepository.findByEmail("user11@example.com").orElseThrow();
        User foundUser = userService.getUserById(user.getId());

        assertThat(foundUser).isNotNull();
        assertThat(foundUser.getEmail()).isEqualTo("user11@example.com");
    }
}
