package com.fornerds.repository;

import com.fornerds.entity.Discussion;
import com.fornerds.entity.Quest;
import com.fornerds.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiscussionRepository extends JpaRepository<Discussion, Long> {
    List<Discussion> findByQuest(Quest quest);
    List<Discussion> findByUser(User user);
    List<Discussion> findByQuestAndLikeCountGreaterThan(Quest quest, Integer likeCount);
    // 추가적인 쿼리 메서드 정의
}
