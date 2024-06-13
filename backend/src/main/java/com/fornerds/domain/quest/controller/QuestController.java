package com.fornerds.domain.quest.controller;

import com.fornerds.domain.project.entity.Project;
import com.fornerds.domain.project.service.ProjectService;
import com.fornerds.domain.quest.dto.QuestDto;
import com.fornerds.domain.quest.dto.RewardDto;
import com.fornerds.domain.quest.dto.UserQuestDto;
import com.fornerds.domain.quest.entity.*;
import com.fornerds.domain.quest.service.QuestService;
import com.fornerds.domain.quest.service.RewardService;
import com.fornerds.domain.user.dto.UserDto;
import com.fornerds.domain.user.entity.User;
import com.fornerds.domain.user.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.Console;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/quests")
public class QuestController {
    private final QuestService questService;
    private final ProjectService projectService;
    private final UserService userService;
    private final RewardService rewardService;

    public QuestController(QuestService questService, ProjectService projectService, UserService userService, RewardService rewardService) {
        this.questService = questService;
        this.projectService = projectService;
        this.userService = userService;
        this.rewardService = rewardService;
    }

    @PostMapping
    public ResponseEntity<QuestDto> createQuest(@RequestBody QuestDto questDto) {
        Project project = projectService.getProjectById(questDto.getProjectId());
        Quest quest = questService.createQuest(questDto.toEntity(project));
        QuestDto responseDto = new QuestDto(quest);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuestDto> getQuestById(@PathVariable Long id) {
        Quest quest = questService.getQuestById(id);
        QuestDto responseDto = new QuestDto(quest);
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<QuestDto>> getQuestsByProject(@PathVariable Long projectId) {
        Project project = projectService.getProjectById(projectId);
        List<Quest> quests = questService.getQuestsByProject(project);
        List<QuestDto> responseDtos = quests.stream()
                .map(QuestDto::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseDtos);
    }

    @PutMapping("/{id}")
    public ResponseEntity<QuestDto> updateQuest(@PathVariable Long id, @RequestBody QuestDto questDto) {
        Quest quest = questService.getQuestById(id);
        quest.update(questDto);
        Quest updatedQuest = questService.updateQuest(quest);
        QuestDto responseDto = new QuestDto(updatedQuest);
        return ResponseEntity.ok(responseDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuest(@PathVariable Long id) {
        questService.deleteQuest(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/join")
    public ResponseEntity<UserQuestDto> joinQuest(@PathVariable Long id, @RequestBody UserDto userDto) {
        Quest quest = questService.getQuestById(id);
        User user = userDto.toEntity();
        user.setId(userService.getUserByEmail(userDto.getEmail()).getId());
        UserQuest userQuest = questService.joinQuest(quest, user);
        UserQuestDto responseDto = new UserQuestDto(userQuest);
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/project/{projectId}/difficulty/{difficulty}")
    public ResponseEntity<List<QuestDto>> getQuestsByDifficulty(@PathVariable Long projectId, @PathVariable Difficulty difficulty) {
        Project project = projectService.getProjectById(projectId);
        List<Quest> quests = questService.getQuestsByProjectAndDifficulty(project, difficulty);
        List<QuestDto> responseDtos = quests.stream()
                .map(QuestDto::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseDtos);
    }

    @GetMapping("/project/{projectId}/position/{position}")
    public ResponseEntity<List<QuestDto>> getQuestsByPosition(@PathVariable Long projectId, @PathVariable Position position) {
        Project project = projectService.getProjectById(projectId);
        List<Quest> quests = questService.getQuestsByProjectAndPosition(project, position);
        List<QuestDto> responseDtos = quests.stream()
                .map(QuestDto::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseDtos);
    }

    @PostMapping("/{id}/reward")
    public ResponseEntity<RewardDto> createReward(@PathVariable Long id, @RequestBody RewardDto rewardDto) {
        Quest quest = questService.getQuestById(rewardDto.getQuestId());

        // 동일한 보상 타입이 이미 존재하는지 확인
        Reward existingReward = rewardService.getRewardsByType(quest, rewardDto.getRewardType());
        if (existingReward != null) {
            // 동일한 보상 타입이 존재하면 에러 응답 반환
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new RewardDto(existingReward)); // 기존 보상 정보를 반환할 수도 있음
        }

        Reward reward = rewardDto.toEntity(quest);
        Reward createdReward = rewardService.createReward(reward);
        return ResponseEntity.status(HttpStatus.CREATED).body(new RewardDto(createdReward));
    }

    @GetMapping("/{id}/reward/{rewardId}")
    public ResponseEntity<RewardDto> getRewardById(@PathVariable Long id, @PathVariable Long rewardId) {
        Reward reward = rewardService.getRewardById(rewardId);
        return ResponseEntity.ok(new RewardDto(reward));
    }

    @PutMapping("/{id}/reward/{rewardId}")
    public ResponseEntity<RewardDto> updateReward(@PathVariable Long id, @PathVariable Long rewardId, @RequestBody RewardDto rewardDto) {
        Reward reward = rewardService.getRewardById(rewardId);
        reward.setRewardType(rewardDto.getRewardType());
        reward.setRewardAmount(rewardDto.getRewardAmount());
        Reward updatedReward = rewardService.updateReward(reward);
        return ResponseEntity.ok(new RewardDto(updatedReward));
    }

    @DeleteMapping("/{id}/reward/{rewardId}")
    public ResponseEntity<Void> deleteReward(@PathVariable Long id, @PathVariable Long rewardId) {
        rewardService.deleteReward(rewardId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/reward/exp")
    public ResponseEntity<UserDto> assignQuestCompletionExp(@PathVariable Long id, @RequestBody UserDto userDto) {
        Quest quest = questService.getQuestById(id);
        Reward reward = rewardService.getRewardsByType(quest, RewardType.EXP);
        User user = userService.getUserById(userDto.getId());
        UserDto responseDto = new UserDto(userService.updateUserRewardByRewardType(user, reward));
        return ResponseEntity.ok(responseDto);
    }

    @PostMapping("/{id}/reward/cash")
    public ResponseEntity<UserDto> assignQuestCompletionCash(@PathVariable Long id, @RequestBody UserDto userDto) {
        Quest quest = questService.getQuestById(id);
        Reward reward = rewardService.getRewardsByType(quest, RewardType.CASH);
        User user = userService.getUserById(userDto.getId());
        UserDto responseDto = new UserDto(userService.updateUserRewardByRewardType(user, reward));
        return ResponseEntity.ok(responseDto);
    }

    @PostMapping("/{id}/reward/point")
    public ResponseEntity<UserDto> assignQuestCompletionPoint(@PathVariable Long id, @RequestBody UserDto userDto) {
        Quest quest = questService.getQuestById(id);
        Reward reward = rewardService.getRewardsByType(quest, RewardType.POINT);
        User user = userService.getUserById(userDto.getId());
        UserDto responseDto = new UserDto(userService.updateUserRewardByRewardType(user, reward));
        return ResponseEntity.ok(responseDto);
    }
}
