package com.fornerds.repository;

import com.fornerds.entity.BookmarkQuest;
import com.fornerds.entity.Quest;
import com.fornerds.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookmarkQuestRepository extends JpaRepository<BookmarkQuest, Long> {
    List<BookmarkQuest> findByUser(User user);
    List<BookmarkQuest> findByQuest(Quest quest);
    boolean existsByUserAndQuest(User user, Quest quest);
    // 추가적인 쿼리 메서드 정의
}
