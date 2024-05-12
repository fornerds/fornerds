package com.fornerds.repository;

import com.fornerds.entity.Feedback;
import com.fornerds.entity.Solution;
import com.fornerds.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findBySolution(Solution solution);
    List<Feedback> findByUser(User user);
    // 추가적인 쿼리 메서드 정의
}
