package com.fornerds.domain.project.dto;

import com.fornerds.domain.project.entity.Difficulty;
import com.fornerds.domain.project.entity.Project;
import com.fornerds.domain.project.entity.ProjectStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

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
