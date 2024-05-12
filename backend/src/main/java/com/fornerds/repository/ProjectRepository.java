package com.fornerds.repository;

import com.fornerds.entity.Difficulty;
import com.fornerds.entity.Project;
import com.fornerds.entity.ProjectStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByTitleContaining(String keyword);
    List<Project> findByStatus(ProjectStatus status);
    List<Project> findByDifficulty(Difficulty difficulty);
    List<Project> findByDeadlineAfter(LocalDateTime currentDate);
    List<Project> findByBudgetBetween(Integer minBudget, Integer maxBudget);
    List<Project> findByDeveloperCountLessThan(Integer count);
    // 추가적인 쿼리 메서드 정의
}
