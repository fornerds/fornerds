package com.fornerds.repository;

import com.fornerds.entity.BookmarkProject;
import com.fornerds.entity.Project;
import com.fornerds.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookmarkProjectRepository extends JpaRepository<BookmarkProject, Long> {
    List<BookmarkProject> findByUser(User user);
    List<BookmarkProject> findByProject(Project project);
    boolean existsByUserAndProject(User user, Project project);
    // 추가적인 쿼리 메서드 정의
}
