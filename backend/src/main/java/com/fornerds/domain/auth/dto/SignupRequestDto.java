package com.fornerds.domain.auth.dto;

import com.fornerds.domain.user.entity.User;

public class SignupRequestDto {
    private String email;
    private String password;
    private String name;
    private String nickname;

    // getter, setter 메서드 생성

    public User toEntity() {
        User user = new User();
        user.setEmail(email);
        user.setName(name);
        user.setNickname(nickname);
        return user;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
}