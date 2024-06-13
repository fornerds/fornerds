package com.fornerds.domain.quest.repository;

import com.fornerds.domain.quest.entity.QuestPosition;
import com.fornerds.domain.quest.entity.Position;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestPositionRepository extends JpaRepository<QuestPosition, Long> {
    List<QuestPosition> findByQuestId(Long questId);
    List<QuestPosition> findByQuestIdAndPosition(Long questId, Position position);
    List<QuestPosition> findByPosition(Position position); // 추가된 메서드
}
