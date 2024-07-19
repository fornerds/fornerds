package com.fornerds.domain.solution.repository;

import com.fornerds.domain.solution.entity.Solution;
import com.fornerds.domain.solution.entity.SolutionFile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SolutionFileRepository extends JpaRepository<SolutionFile, Long> {
    List<SolutionFile> findBySolution(Solution solution);
}