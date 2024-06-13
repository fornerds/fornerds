package com.fornerds.domain.quest.service;

import com.fornerds.domain.quest.entity.Quest;
import com.fornerds.domain.quest.entity.Reward;
import com.fornerds.domain.quest.entity.RewardType;
import com.fornerds.domain.quest.repository.RewardRepository;
import com.fornerds.global.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class RewardService {
    private final RewardRepository rewardRepository;

    public RewardService(RewardRepository rewardRepository) {
        this.rewardRepository = rewardRepository;
    }

    public Reward createReward(Reward reward) {
        // 동일한 보상 타입이 이미 존재하는지 확인
        Reward existingReward = rewardRepository.findByQuestIdAndRewardType(reward.getQuest().getId(), reward.getRewardType());
        if (existingReward != null) {
            throw new IllegalArgumentException("Reward of type " + reward.getRewardType() + " already exists for this quest.");
        }
        return rewardRepository.save(reward);
    }

    public Reward getRewardById(Long id) {
        return rewardRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reward not found with id: " + id));
    }

    public Reward updateReward(Reward reward) {
        if (!rewardRepository.existsById(reward.getId())) {
            throw new ResourceNotFoundException("Reward not found with id: " + reward.getId());
        }
        return rewardRepository.save(reward);
    }

    public void deleteReward(Long id) {
        if (!rewardRepository.existsById(id)) {
            throw new ResourceNotFoundException("Reward not found with id: " + id);
        }
        rewardRepository.deleteById(id);
    }

    public List<Reward> getAllRewards() {
        return rewardRepository.findAll();
    }

    public Reward getRewardsByType(Quest quest, RewardType type) {
        return rewardRepository.findByQuestIdAndRewardType(quest.getId(), type);
    }
}
