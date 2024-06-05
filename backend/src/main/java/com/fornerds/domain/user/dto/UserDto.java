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

    public UserDto(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.name = user.getName();
        this.nickname = user.getNickname();
    }

    public User toEntity() {
        User user = new User();
        user.setEmail(email);
        user.setName(name);
        user.setNickname(nickname);
        return user;
    }
}
