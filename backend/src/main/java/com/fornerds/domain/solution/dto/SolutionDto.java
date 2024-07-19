package com.fornerds.domain.solution.dto;

import com.fornerds.domain.quest.entity.Quest;
import com.fornerds.domain.solution.entity.Solution;
import com.fornerds.domain.solution.entity.SolutionStatus;
import com.fornerds.domain.user.entity.User;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SolutionDto {
    private Long id;
    private String repositoryUrl;
    private SolutionStatus status;
    private String feedback;
    private Integer memoryUsage;
    private Integer executionTime;
    private Integer likeCount;
    private Integer viewCount;

    private Long questId;
    private Long userId;

    private List<SolutionFileDto> files;

    @Builder
    public SolutionDto(Solution solution) {
        this.id = solution.getId();
        this.repositoryUrl = solution.getRepositoryUrl();
        this.status = solution.getStatus();
        this.feedback = solution.getFeedback();
        this.memoryUsage = solution.getMemoryUsage();
        this.executionTime = solution.getExecutionTime();
        this.likeCount = solution.getLikeCount();
        this.viewCount = solution.getViewCount();
        this.questId = solution.getQuest().getId(); // questId 설정
        this.userId = solution.getUser().getId(); // userId 설정
    }

    public Solution toEntity(Quest quest, User user) {
        return Solution.builder()
                .repositoryUrl(repositoryUrl)
                .status(status)
                .feedback(feedback)
                .memoryUsage(memoryUsage)
                .executionTime(executionTime)
                .likeCount(likeCount)
                .viewCount(viewCount)
                .quest(quest) // quest 설정
                .user(user) // user 설정
                .build();
    }

    public static SolutionDto fromEntity(Solution solution) {
        return SolutionDto.builder()
                .id(solution.getId())
                .repositoryUrl(solution.getRepositoryUrl())
                .status(solution.getStatus())
                .feedback(solution.getFeedback())
                .memoryUsage(solution.getMemoryUsage())
                .executionTime(solution.getExecutionTime())
                .likeCount(solution.getLikeCount())
                .viewCount(solution.getViewCount())
                .questId(solution.getQuest().getId())
                .userId(solution.getUser().getId())
                .files(solution.getFiles().stream().map(SolutionFileDto::fromEntity).collect(Collectors.toList()))
                .build();
    }
}