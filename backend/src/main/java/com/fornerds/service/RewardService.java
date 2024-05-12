package com.fornerds.service;

import com.fornerds.entity.Quest;
import com.fornerds.entity.Reward;
import com.fornerds.repository.RewardRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class RewardService {
    private final RewardRepository rewardRepository;
    
    public RewardService(RewardRepository rewardRepository) {
        this.rewardRepository = rewardRepository;
    }
    
    public Reward createReward(Reward reward) {
        // 보상 생성 로직 구현
        return reward;
    }
    
    public Reward getRewardById(Long id) {
        // 보상 조회 로직 구현
        return null;
    }
    
    public List<Reward> getRewardsByQuest(Quest quest) {
        // 특정 퀘스트의 보상 목록 조회 로직 구현
        return null;
    }
    
    public Reward updateReward(Reward reward) {
        // 보상 정보 수정 로직 구현
        return reward;
    }
    
    public void deleteReward(Long id) {
        // 보상 삭제 로직 구현
    }
    
    // 추가적인 로직 구현
}
