package com.fornerds.repository;

import com.fornerds.entity.Comment;
import com.fornerds.entity.Solution;
import com.fornerds.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findBySolution(Solution solution);
    List<Comment> findByUser(User user);
    List<Comment> findBySolutionAndLikeCountGreaterThan(Solution solution, Integer likeCount);
    // 추가적인 쿼리 메서드 정의
}
