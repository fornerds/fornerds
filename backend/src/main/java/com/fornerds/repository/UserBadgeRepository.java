package com.fornerds.repository;

import com.fornerds.entity.Badge;
import com.fornerds.entity.User;
import com.fornerds.entity.UserBadge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserBadgeRepository extends JpaRepository<UserBadge, Long> {
    List<UserBadge> findByUser(User user);
    boolean existsByUserAndBadge(User user, Badge badge);
    // 추가적인 쿼리 메서드 정의
}
