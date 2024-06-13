package com.fornerds.domain.quest.repository;

import com.fornerds.domain.quest.entity.Reward;
import com.fornerds.domain.quest.entity.RewardType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RewardRepository extends JpaRepository<Reward, Long> {
    Reward findByQuestIdAndRewardType(Long questId, RewardType rewardType);
}
