package com.fornerds.domain.user.entity;

import com.fornerds.domain.user.dto.UserDto;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Entity
@Table(name = "`users`")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
public class User implements OAuth2User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "nickname", nullable = false, unique = true)
    private String nickname;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "language")
    private String language;

    @Column(name = "country")
    private String country;

    @Column(name = "profile_image")
    private String profileImage;

    @Column(name = "bio", columnDefinition = "TEXT")
    private String bio;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Role role;

    @Column(name = "level")
    private Integer level;

    @Column(name = "exp")
    private Integer exp;

    @Column(name = "point")
    private Integer point;

    @Column(name = "cash")
    private Integer cash;

    @Column(name = "is_public", nullable = false) // Not Null 제약조건 명시
    private boolean isPublic;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    // 모든 생성자에서 isPublic 필드 초기화
    public User(String email, String password, String name, String nickname, String profileImage, Role role, boolean isPublic) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.role = role;
        this.isPublic = isPublic;
    }

    public User(String email, String password, List<GrantedAuthority> authorities) {
        this(email, password, "", "", "", Role.USER, false); // isPublic을 false로 초기화
    }

    public User(String email, String password, String name, Role role) {
        this(email, password, name, "", "", role, false); // isPublic을 false로 초기화
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return id.equals(user.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
