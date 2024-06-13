package com.fornerds.domain.discussion.repository;

import com.fornerds.domain.discussion.entity.Discussion;
import com.fornerds.domain.quest.entity.Quest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiscussionRepository extends JpaRepository<Discussion, Long> {
    List<Discussion> findByQuest(Quest quest);
}
