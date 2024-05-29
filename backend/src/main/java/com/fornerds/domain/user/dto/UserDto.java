package com.fornerds.domain.user.dto;

import com.fornerds.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String email;
    private String name;
    private String nickname;
    private String password;

    public UserDto(User user) {
        this.email = user.getEmail();
        this.name = user.getName();
    }

    public User toEntity() {
        User user = new User();
        user.setEmail(email);
        user.setName(name);
        user.setNickname(nickname);
        user.setPassword(password);
        return user;
    }
}
