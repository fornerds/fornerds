package com.fornerds.domain.user.repository;

import com.fornerds.domain.user.entity.Role;
import com.fornerds.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByNickname(String nickname);
    List<User> findByRole(Role role);
    List<User> findByLevelGreaterThanEqual(Integer level);
    List<User> findByCountry(String country);
    List<User> findByLanguage(String language);
    boolean existsByEmail(String email);
}
