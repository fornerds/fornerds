package com.fornerds.domain.quest.repository;

import com.fornerds.domain.quest.entity.UserQuest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserQuestRepository extends JpaRepository<UserQuest, Long> {
    UserQuest findByQuestIdAndUserId(Long questId, Long userId);
}
