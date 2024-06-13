package com.fornerds.domain.quest.dto;

import com.fornerds.domain.quest.entity.Quest;
import com.fornerds.domain.quest.entity.Reward;
import com.fornerds.domain.quest.entity.RewardType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RewardDto {
    private Long id;
    private RewardType rewardType;
    private Integer rewardAmount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Long questId; // Quest ID만 포함

    public RewardDto(Reward reward) {
        this.id = reward.getId();
        this.rewardType = reward.getRewardType();
        this.rewardAmount = reward.getRewardAmount();
        this.createdAt = reward.getCreatedAt();
        this.updatedAt = reward.getUpdatedAt();
        this.questId = reward.getQuest() != null ? reward.getQuest().getId() : null;
    }

    public Reward toEntity(Quest quest){
        Reward reward = new Reward();
        reward.setId(id);
        reward.setRewardType(rewardType);
        reward.setRewardAmount(rewardAmount);
        reward.setCreatedAt(createdAt);
        reward.setUpdatedAt(updatedAt);
        reward.setQuest(quest);
        return reward;
    }
}
