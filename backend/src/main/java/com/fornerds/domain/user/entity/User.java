package com.fornerds.domain.user.entity;

import com.fornerds.domain.user.dto.UserDto;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "`users`")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User implements OAuth2User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String nickname;

    private String phoneNumber;

    private String language;

    private String country;

    private String profileImage;

    @Lob
    private String bio;

    @Enumerated(EnumType.STRING)
    private Role role;

    private Integer level;

    private Integer exp;

    private Integer point;

    private Integer cash;

    private boolean isPublic;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    private LocalDateTime deletedAt;

    // 기타 연관관계 매핑

    public User(String email, String password, String name, String nickname, String profileImage, Role role) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.role = role;
    }

    public User(String email, String password, List<GrantedAuthority> authorities) {
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public User(String email, String password, String name, Role role) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.role = role;
    }

    public List<GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + role.name()));
        return authorities;
    }

    public User update(String name, String profileImage) {
        this.name = name;
        this.profileImage = profileImage;
        return this;
    }

    public User update(UserDto userDto) {
        this.name = userDto.getName();
        this.nickname = userDto.getNickname();
        // 필요한 필드 업데이트
        return this;
    }

    public Map<String, Object> getAttributes() {
        // OAuth2User 인터페이스의 메소드 구현
        return null;
    }

    public String getName() {
        // OAuth2User 인터페이스의 메소드 구현
        return getEmail();
    }
}
