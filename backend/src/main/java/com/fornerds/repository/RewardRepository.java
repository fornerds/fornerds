package com.fornerds.repository;

import com.fornerds.entity.Quest;
import com.fornerds.entity.Reward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RewardRepository extends JpaRepository<Reward, Long> {
    List<Reward> findByQuest(Quest quest);
    // 추가적인 쿼리 메서드 정의
}