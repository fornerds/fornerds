package com.fornerds.repository;

import com.fornerds.entity.Difficulty;
import com.fornerds.entity.Project;
import com.fornerds.entity.Quest;
import com.fornerds.entity.QuestStatus;
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
    // 추가적인 쿼리 메서드 정의
}
