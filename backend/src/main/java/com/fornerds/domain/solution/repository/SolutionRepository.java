package com.fornerds.domain.solution.repository;

import com.fornerds.domain.quest.entity.Quest;
import com.fornerds.domain.solution.entity.Solution;
import com.fornerds.domain.solution.entity.SolutionStatus;
import com.fornerds.domain.user.entity.User;
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
}