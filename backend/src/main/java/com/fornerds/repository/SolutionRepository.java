package com.fornerds.repository;

import com.fornerds.entity.Quest;
import com.fornerds.entity.Solution;
import com.fornerds.entity.SolutionStatus;
import com.fornerds.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SolutionRepository extends JpaRepository<Solution, Long> {
    List<Solution> findByQuest(Quest quest);
    List<Solution> findByQuestAndStatus(Quest quest, SolutionStatus status);
    List<Solution> findByUser(User user);
    List<Solution> findByUserAndStatus(User user, SolutionStatus status);
    List<Solution> findByMemoryUsageLessThan(Integer memory);
    List<Solution> findByExecutionTimeLessThan(Integer time);
    // 추가적인 쿼리 메서드 정의
}
