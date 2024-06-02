package com.fornerds.domain.solution.dto;

import com.fornerds.domain.solution.entity.Solution;
import com.fornerds.domain.solution.entity.SolutionStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SolutionDto {
    private Long id;
    private String repositoryUrl;
    private byte[] file;
    private SolutionStatus status;
    private String feedback;
    private Integer memoryUsage;
    private Integer executionTime;
    private Integer likeCount;
    private Integer viewCount;

    public SolutionDto(Solution solution) {
        this.id = solution.getId();
        this.repositoryUrl = solution.getRepositoryUrl();
        this.file = solution.getFile();
        this.status = solution.getStatus();
        this.feedback = solution.getFeedback();
        this.memoryUsage = solution.getMemoryUsage();
        this.executionTime = solution.getExecutionTime();
        this.likeCount = solution.getLikeCount();
        this.viewCount = solution.getViewCount();
    }

    public Solution toEntity() {
        Solution solution = new Solution();
        solution.setRepositoryUrl(repositoryUrl);
        solution.setFile(file);
        solution.setStatus(status);
        solution.setFeedback(feedback);
        solution.setMemoryUsage(memoryUsage);
        solution.setExecutionTime(executionTime);
        solution.setLikeCount(likeCount);
        solution.setViewCount(viewCount);
        return solution;
    }
}