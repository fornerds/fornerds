package com.fornerds.domain.quest.repository;

import com.fornerds.domain.project.entity.Project;
import com.fornerds.domain.quest.entity.Difficulty;
import com.fornerds.domain.quest.entity.Position;
import com.fornerds.domain.quest.entity.Quest;
import com.fornerds.domain.quest.entity.QuestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface QuestRepository extends JpaRepository<Quest, Long> {
    List<Quest> findByProject(Project project);
    List<Quest> findByProjectAndStatus(Project project, QuestStatus status);
    List<Quest> findByTitleContaining(String keyword);
    List<Quest> findByDifficulty(Difficulty difficulty);
    List<Quest> findByDeadlineAfter(LocalDateTime currentDate);
    List<Quest> findByRewardExpGreaterThan(Integer exp);
    List<Quest> findByRewardCashGreaterThan(Integer cash);
    List<Quest> findByEstimatedDurationLessThan(Integer duration);
    List<Quest> findByProjectId(Long projectId);
    List<Quest> findByProjectAndDifficulty(Project project, Difficulty difficulty);
    List<Quest> findByProjectAndPosition(Project project, Position position);
}
