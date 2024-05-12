package com.fornerds.repository;

import com.fornerds.entity.BookmarkSolution;
import com.fornerds.entity.Solution;
import com.fornerds.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookmarkSolutionRepository extends JpaRepository<BookmarkSolution, Long> {
    List<BookmarkSolution> findByUser(User user);
    List<BookmarkSolution> findBySolution(Solution solution);
    boolean existsByUserAndSolution(User user, Solution solution);
    // 추가적인 쿼리 메서드 정의
}
