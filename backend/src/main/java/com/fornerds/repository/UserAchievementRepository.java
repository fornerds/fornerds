package com.fornerds.repository;

import com.fornerds.entity.Achievement;
import com.fornerds.entity.User;
import com.fornerds.entity.UserAchievement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserAchievementRepository extends JpaRepository<UserAchievement, Long> {
    List<UserAchievement> findByUser(User user);
    boolean existsByUserAndAchievement(User user, Achievement achievement);
    // 추가적인 쿼리 메서드 정의
}
