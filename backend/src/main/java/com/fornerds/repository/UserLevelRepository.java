package com.fornerds.repository;

import com.fornerds.entity.User;
import com.fornerds.entity.UserLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserLevelRepository extends JpaRepository<UserLevel, Long> {
    Optional<UserLevel> findByUser(User user);
    List<UserLevel> findByLevelGreaterThanEqual(Integer level);
    // 추가적인 쿼리 메서드 정의
}
