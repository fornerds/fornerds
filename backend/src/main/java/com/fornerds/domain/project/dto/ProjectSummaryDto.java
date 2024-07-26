package com.fornerds.domain.project.dto;

import com.fornerds.domain.project.entity.Difficulty;
import com.fornerds.domain.project.entity.ProjectStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectSummaryDto {
    private Long id;
    private String title;
    private ProjectStatus status;
    private String description;
    private LocalDateTime deadline;
    private String estimatedDuration;
    private Difficulty difficulty;
    private String scale;
    private Integer budget;
    private Integer developerCount;
    private Integer viewCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Integer questCount; // 퀘스트 수
    private Integer totalRewardExp; // 통합 경험치
    private Integer bookmarkCount; // 북마크 수
    private List<String> techStackNames; // 기술 스택 리스트

    public ProjectSummaryDto(Object[] objects) {
        this.id = (Long) objects[0];
        this.title = (String) objects[1];
        this.status = ProjectStatus.valueOf((String) objects[2]);
        this.description = (String) objects[3];
        this.deadline = (LocalDateTime) objects[4];
        this.estimatedDuration = (String) objects[5];
        this.difficulty = Difficulty.valueOf((String) objects[6]);
        this.scale = (String) objects[7];
        this.budget = (Integer) objects[8];
        this.developerCount = (Integer) objects[9];
        this.viewCount = (Integer) objects[10];
        this.createdAt = (LocalDateTime) objects[11];
        this.updatedAt = (LocalDateTime) objects[12];
        this.questCount = (Integer) objects[13];
        this.totalRewardExp = (Integer) objects[14];
        this.bookmarkCount = (Integer) objects[15];
        // 기술 스택 이름 목록을 처리하는 부분
        if (objects[16] instanceof String) {
            this.techStackNames = Arrays.asList(((String) objects[16]).split(","));
        } else {
            this.techStackNames = new ArrayList<>();
        }
    }
}