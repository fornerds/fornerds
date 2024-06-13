package com.fornerds.domain.quest.dto;

import com.fornerds.domain.project.entity.Project;
import com.fornerds.domain.quest.entity.Difficulty;
import com.fornerds.domain.quest.entity.Quest;
import com.fornerds.domain.quest.entity.QuestStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class QuestDto {
    private Long id;
    private String title;
    private QuestStatus status;
    private String description;
    private String convention;
    private String requirements;
    private String goal;
    private String inputExample;
    private String outputExample;
    private String exampleExplanation;
    private String apiUrl;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private LocalDateTime deadline;
    private Difficulty difficulty;
    private Integer budget;
    private Integer developerCount;
    private String scale;
    private Integer rewardCash;
    private Integer rewardExp;
    private Integer rewardPoint;
    private boolean isPublic;
    private Integer viewCount;
    private Integer likeCount;
    private String keyLearnings;
    private Integer estimatedDuration;
    private Long projectId; // Project ID만 포함

    public QuestDto(Quest quest) {
        this.id = quest.getId();
        this.title = quest.getTitle();
        this.status = quest.getStatus();
        this.description = quest.getDescription();
        this.convention = quest.getConvention();
        this.requirements = quest.getRequirements();
        this.goal = quest.getGoal();
        this.inputExample = quest.getInputExample();
        this.outputExample = quest.getOutputExample();
        this.exampleExplanation = quest.getExampleExplanation();
        this.apiUrl = quest.getApiUrl();
        this.startDate = quest.getStartDate();
        this.endDate = quest.getEndDate();
        this.deadline = quest.getDeadline();
        this.difficulty = quest.getDifficulty();
        this.budget = quest.getBudget();
        this.developerCount = quest.getDeveloperCount();
        this.scale = quest.getScale();
        this.rewardCash = quest.getRewardCash();
        this.rewardExp = quest.getRewardExp();
        this.rewardPoint = quest.getRewardPoint();
        this.isPublic = quest.isPublic();
        this.viewCount = quest.getViewCount();
        this.likeCount = quest.getLikeCount();
        this.keyLearnings = quest.getKeyLearnings();
        this.estimatedDuration = quest.getEstimatedDuration();
        this.projectId = quest.getProject().getId();
    }

    public Quest toEntity(Project project) {
        Quest quest = new Quest();
        quest.setTitle(title);
        quest.setStatus(status);
        quest.setDescription(description);
        quest.setConvention(convention);
        quest.setRequirements(requirements);
        quest.setGoal(goal);
        quest.setInputExample(inputExample);
        quest.setOutputExample(outputExample);
        quest.setExampleExplanation(exampleExplanation);
        quest.setApiUrl(apiUrl);
        quest.setStartDate(startDate);
        quest.setEndDate(endDate);
        quest.setDeadline(deadline);
        quest.setDifficulty(difficulty);
        quest.setBudget(budget);
        quest.setDeveloperCount(developerCount);
        quest.setScale(scale);
        quest.setRewardCash(rewardCash);
        quest.setRewardExp(rewardExp);
        quest.setRewardPoint(rewardPoint);
        quest.setPublic(isPublic);
        quest.setViewCount(viewCount);
        quest.setLikeCount(likeCount);
        quest.setKeyLearnings(keyLearnings);
        quest.setEstimatedDuration(estimatedDuration);
        quest.setProject(project);
        return quest;
    }
}

