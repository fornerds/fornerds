package com.fornerds.domain.project.dto;

import com.fornerds.domain.project.entity.Difficulty;
import com.fornerds.domain.project.entity.Project;
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
public class ProjectDto {
    private Long id;
    private String title;
    private ProjectStatus status;
    private String description;
    private String introduction;
    private String keyLearnings;
    private String requirements;
    private LocalDateTime deadline;
    private String estimatedDuration;
    private Difficulty difficulty;
    private String scale;
    private Integer budget;
    private Integer developerCount;
    private boolean isPublic;
    private Integer viewCount;
    private Integer remainingQuests;
    private Integer questCount; // 퀘스트 수
    private Integer totalRewardExp; // 통합 경험치
    private Integer bookmarkCount; // 북마크 수
    private List<String> techStackNames; // 기술 스택 리스트

    public ProjectDto(Project project) {
        this.id = project.getId();
        this.title = project.getTitle();
        this.status = project.getStatus();
        this.description = project.getDescription();
        this.introduction = project.getIntroduction();
        this.keyLearnings = project.getKeyLearnings();
        this.requirements = project.getRequirements();
        this.deadline = project.getDeadline();
        this.estimatedDuration = project.getEstimatedDuration();
        this.difficulty = project.getDifficulty();
        this.scale = project.getScale();
        this.budget = project.getBudget();
        this.developerCount = project.getDeveloperCount();
        this.isPublic = project.isPublic();
        this.viewCount = project.getViewCount();
        this.remainingQuests = project.getRemainingQuests();
    }

    public ProjectDto(Object[] objects) {
        this.id = (Long) objects[0];
        this.title = (String) objects[1];
        this.status = ProjectStatus.valueOf((String) objects[2]);
        this.description = (String) objects[3];
        this.introduction = (String) objects[4];
        this.keyLearnings = (String) objects[5];
        this.requirements = (String) objects[6];
        this.deadline = (LocalDateTime) objects[7];
        this.estimatedDuration = (String) objects[8];
        this.difficulty = Difficulty.valueOf((String) objects[9]);
        this.scale = (String) objects[10];
        this.budget = (Integer) objects[11];
        this.developerCount = (Integer) objects[12];
        this.isPublic = (boolean) objects[13];
        this.viewCount = (Integer) objects[14];
        this.remainingQuests = (Integer) objects[15];
        this.questCount = (Integer) objects[16];
        this.totalRewardExp = (Integer) objects[17];
        this.bookmarkCount = (Integer) objects[18];
        // 기술 스택 이름 목록을 처리하는 부분
        if (objects[19] instanceof String) {
            this.techStackNames = Arrays.asList(((String) objects[19]).split(","));
        } else {
            this.techStackNames = new ArrayList<>();
        }
    }

    public Project toEntity() {
        Project project = new Project();
        project.setTitle(title);
        project.setStatus(status);
        project.setDescription(description);
        project.setIntroduction(introduction);
        project.setKeyLearnings(keyLearnings);
        project.setRequirements(requirements);
        project.setDeadline(deadline);
        project.setEstimatedDuration(estimatedDuration);
        project.setDifficulty(difficulty);
        project.setScale(scale);
        project.setBudget(budget);
        project.setDeveloperCount(developerCount);
        project.setPublic(isPublic);
        project.setViewCount(viewCount);
        project.setRemainingQuests(remainingQuests);

        return project;
    }
}
