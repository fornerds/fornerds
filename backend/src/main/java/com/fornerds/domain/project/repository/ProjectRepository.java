package com.fornerds.domain.project.repository;

import com.fornerds.domain.project.entity.Difficulty;
import com.fornerds.domain.project.entity.Project;
import com.fornerds.domain.project.entity.ProjectStatus;
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
}
