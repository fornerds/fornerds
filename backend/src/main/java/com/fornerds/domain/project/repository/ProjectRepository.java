package com.fornerds.domain.project.repository;

import com.fornerds.domain.project.entity.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    @Query("SELECT p, " +
            "(SELECT COUNT(q) FROM Quest q WHERE q.project.id = p.id) AS questCount, " +
            "(SELECT COUNT(b) FROM BookmarkProject b WHERE b.project.id = p.id) AS bookmarkCount, " +
            "(SELECT SUM(q.rewardExp) FROM Quest q WHERE q.project.id = p.id) AS totalRewardExp, " +
            "ts.name " +
            "FROM Project p " +
            "LEFT JOIN p.projectTechStacks pts " +
            "LEFT JOIN pts.techStack ts " +
            "WHERE p.id = :id AND p.isPublic = true")
    List<Object[]> findPublicProjectById(@Param("id") Long id);

    @Query("SELECT p, " +
            "(SELECT COUNT(q) FROM Quest q WHERE q.project.id = p.id) AS questCount, " +
            "(SELECT COUNT(b) FROM BookmarkProject b WHERE b.project.id = p.id) AS bookmarkCount, " +
            "(SELECT SUM(q.rewardExp) FROM Quest q WHERE q.project.id = p.id) AS totalRewardExp, " +
            "ts.name " +
            "FROM Project p " +
            "LEFT JOIN p.projectCategories pc " +
            "LEFT JOIN pc.category c " +
            "LEFT JOIN p.projectDevLanguages pdl " +
            "LEFT JOIN pdl.devLanguage dl " +
            "LEFT JOIN p.projectTechStacks pts " +
            "LEFT JOIN pts.techStack ts " +
            "WHERE (:title IS NULL OR p.title LIKE %:title%) " +
            "AND (:categoryId IS NULL OR c.id = :categoryId) " +
            "AND (:devLanguageId IS NULL OR dl.id = :devLanguageId) " +
            "AND (:techStackIdList IS NULL OR ts.id IN :techStackIdList) " +
            "AND (:difficulty IS NULL OR p.difficulty = :difficulty) " +
            "AND (:scale IS NULL OR p.scale = :scale) " +
            "AND (:status IS NULL OR p.status = :status) " +
            "AND (:minBudget IS NULL OR p.budget >= :minBudget) " +
            "AND (:maxBudget IS NULL OR p.budget <= :maxBudget) " +
            "ORDER BY " +
            "CASE WHEN :sortOption = '최신순' THEN p.createdAt END DESC, " +
            "CASE WHEN :sortOption = '오래된순' THEN p.createdAt END ASC, " +
            "CASE WHEN :sortOption = '인기순' THEN p.viewCount END DESC, " +
            "CASE WHEN :sortOption = '마감임박순' THEN p.deadline END ASC, " +
            "CASE WHEN :sortOption = '예산순' THEN p.budget END DESC, " +
            "CASE WHEN :sortOption = '역예산순' THEN p.budget END ASC, " +
            "p.id ASC")
    Page<Object[]> search(@Param("title") String title,
                                       @Param("categoryId") String categoryId,
                                       @Param("devLanguageId") String devLanguageId,
                                       @Param("techStackIdList") List<String> techStackIdList,
                                       @Param("difficulty") String difficulty,
                                       @Param("scale") String scale,
                                       @Param("status") String status,
                                       @Param("minBudget") Integer minBudget,
                                       @Param("maxBudget") Integer maxBudget,
                                       @Param("sortOption") String sortOption,
                                       Pageable pageable);

}
