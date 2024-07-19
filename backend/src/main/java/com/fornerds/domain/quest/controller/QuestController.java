package com.fornerds.domain.quest.controller;

import com.fornerds.domain.project.entity.Project;
import com.fornerds.domain.project.service.ProjectService;
import com.fornerds.domain.quest.dto.QuestDto;
import com.fornerds.domain.quest.dto.RewardDto;
import com.fornerds.domain.quest.dto.UserQuestDto;
import com.fornerds.domain.quest.entity.*;
import com.fornerds.domain.quest.service.QuestService;
import com.fornerds.domain.quest.service.RewardService;
import com.fornerds.domain.solution.dto.SolutionDto;
import com.fornerds.domain.solution.entity.Solution;
import com.fornerds.domain.solution.service.SolutionService;
import com.fornerds.domain.user.dto.UserDto;
import com.fornerds.domain.user.entity.User;
import com.fornerds.domain.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.Console;
import java.util.List;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/quests")
@Tag(name = "Quest API", description = "퀘스트 관련 API")
@Slf4j
public class QuestController {
    private final QuestService questService;
    private final ProjectService projectService;
    private final UserService userService;
    private final RewardService rewardService;
    private final SolutionService solutionService;

    public QuestController(QuestService questService, ProjectService projectService, UserService userService, RewardService rewardService, SolutionService solutionService) {
        this.questService = questService;
        this.projectService = projectService;
        this.userService = userService;
        this.rewardService = rewardService;
        this.solutionService = solutionService;
    }

    @PostMapping
    @Operation(summary = "퀘스트 생성", description = "새로운 퀘스트를 생성합니다.")
    @ApiResponse(responseCode = "201", description = "퀘스트 생성 성공")
    public ResponseEntity<QuestDto> createQuest(@RequestBody @Parameter(description = "퀘스트 생성 요청 정보") QuestDto questDto) {
        Project project = projectService.getProjectById(questDto.getProjectId());
        Quest quest = questService.createQuest(questDto.toEntity(project));
        QuestDto responseDto = new QuestDto(quest);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
    }

    @GetMapping("/{id}")
    @Operation(summary = "퀘스트 조회", description = "특정 퀘스트의 정보를 조회합니다.")
    @ApiResponse(responseCode = "200", description = "퀘스트 조회 성공")
    public ResponseEntity<QuestDto> getQuestById(@PathVariable @Parameter(description = "퀘스트 ID") Long id) {
        Quest quest = questService.getQuestById(id);
        QuestDto responseDto = new QuestDto(quest);
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/project/{projectId}")
    @Operation(summary = "프로젝트별 퀘스트 조회", description = "특정 프로젝트에 속한 퀘스트 목록을 조회합니다.")
    @ApiResponse(responseCode = "200", description = "프로젝트별 퀘스트 조회 성공")
    public ResponseEntity<List<QuestDto>> getQuestsByProject(@PathVariable @Parameter(description = "프로젝트 ID") Long projectId) {
        Project project = projectService.getProjectById(projectId);
        List<Quest> quests = questService.getQuestsByProject(project);
        List<QuestDto> responseDtos = quests.stream()
                .map(QuestDto::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseDtos);
    }

    @PutMapping("/{id}")
    @Operation(summary = "퀘스트 수정", description = "특정 퀘스트의 정보를 수정합니다.")
    @ApiResponse(responseCode = "200", description = "퀘스트 수정 성공")
    public ResponseEntity<QuestDto> updateQuest(@PathVariable @Parameter(description = "퀘스트 ID") Long id, @RequestBody @Parameter(description = "퀘스트 수정 요청 정보") QuestDto questDto) {
        Quest quest = questService.getQuestById(id);
        quest.update(questDto);
        Quest updatedQuest = questService.updateQuest(quest);
        QuestDto responseDto = new QuestDto(updatedQuest);
        return ResponseEntity.ok(responseDto);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "퀘스트 삭제", description = "특정 퀘스트를 삭제합니다.")
    @ApiResponse(responseCode = "204", description = "퀘스트 삭제 성공")
    public ResponseEntity<Void> deleteQuest(@PathVariable @Parameter(description = "퀘스트 ID") Long id) {
        questService.deleteQuest(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/join")
    @Operation(summary = "퀘스트 참여", description = "사용자가 특정 퀘스트에 참여합니다.")
    @ApiResponse(responseCode = "200", description = "퀘스트 참여 성공")
    public ResponseEntity<UserQuestDto> joinQuest(@PathVariable @Parameter(description = "퀘스트 ID") Long id, @RequestBody @Parameter(description = "사용자 정보") UserDto userDto) {
        Quest quest = questService.getQuestById(id);
        User user = userDto.toEntity();
        user.setId(userService.getUserByEmail(userDto.getEmail()).getId());
        UserQuest userQuest = questService.joinQuest(quest, user);
        UserQuestDto responseDto = new UserQuestDto(userQuest);
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/project/{projectId}/difficulty/{difficulty}")
    @Operation(summary = "프로젝트별 난이도 퀘스트 조회", description = "특정 프로젝트에서 특정 난이도의 퀘스트 목록을 조회합니다.")
    @ApiResponse(responseCode = "200", description = "프로젝트별 난이도 퀘스트 조회 성공")
    public ResponseEntity<List<QuestDto>> getQuestsByDifficulty(
            @PathVariable @Parameter(description = "프로젝트 ID") Long projectId,
            @PathVariable @Parameter(description = "퀘스트 난이도") Difficulty difficulty) {
        Project project = projectService.getProjectById(projectId);
        List<Quest> quests = questService.getQuestsByProjectAndDifficulty(project, difficulty);
        List<QuestDto> responseDtos = quests.stream()
                .map(QuestDto::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseDtos);
    }

    @GetMapping("/project/{projectId}/position/{position}")
    @Operation(summary = "프로젝트별 포지션 퀘스트 조회", description = "특정 프로젝트에서 특정 포지션의 퀘스트 목록을 조회합니다.")
    @ApiResponse(responseCode = "200", description = "프로젝트별 포지션 퀘스트 조회 성공")
    public ResponseEntity<List<QuestDto>> getQuestsByPosition(
            @PathVariable @Parameter(description = "프로젝트 ID") Long projectId,
            @PathVariable @Parameter(description = "퀘스트 포지션") Position position) {
        Project project = projectService.getProjectById(projectId);
        List<Quest> quests = questService.getQuestsByProjectAndPosition(project, position);
        List<QuestDto> responseDtos = quests.stream()
                .map(QuestDto::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseDtos);
    }

    @PostMapping("/{id}/reward")
    @Operation(summary = "보상 생성", description = "특정 퀘스트에 보상을 생성합니다.")
    @ApiResponse(responseCode = "201", description = "보상 생성 성공")
    public ResponseEntity<RewardDto> createReward(
            @PathVariable @Parameter(description = "퀘스트 ID") Long id,
            @RequestBody @Parameter(description = "보상 정보") RewardDto rewardDto) {
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
    @Operation(summary = "보상 조회", description = "특정 퀘스트의 특정 보상 정보를 조회합니다.")
    @ApiResponse(responseCode = "200", description = "보상 조회 성공")
    public ResponseEntity<RewardDto> getRewardById(
            @PathVariable @Parameter(description = "퀘스트 ID") Long id,
            @PathVariable @Parameter(description = "보상 ID") Long rewardId) {
        Reward reward = rewardService.getRewardById(rewardId);
        return ResponseEntity.ok(new RewardDto(reward));
    }

    @PutMapping("/{id}/reward/{rewardId}")
    @Operation(summary = "보상 수정", description = "특정 퀘스트의 특정 보상 정보를 수정합니다.")
    @ApiResponse(responseCode = "200", description = "보상 수정 성공")
    public ResponseEntity<RewardDto> updateReward(
            @PathVariable @Parameter(description = "퀘스트 ID") Long id,
            @PathVariable @Parameter(description = "보상 ID") Long rewardId,
            @RequestBody @Parameter(description = "보상 수정 정보") RewardDto rewardDto) {
        Reward reward = rewardService.getRewardById(rewardId);
        reward.setRewardType(rewardDto.getRewardType());
        reward.setRewardAmount(rewardDto.getRewardAmount());
        Reward updatedReward = rewardService.updateReward(reward);
        return ResponseEntity.ok(new RewardDto(updatedReward));
    }

    @DeleteMapping("/{id}/reward/{rewardId}")
    @Operation(summary = "보상 삭제", description = "특정 퀘스트의 특정 보상을 삭제합니다.")
    @ApiResponse(responseCode = "204", description = "보상 삭제 성공")
    public ResponseEntity<Void> deleteReward(
            @PathVariable @Parameter(description = "퀘스트 ID") Long id,
            @PathVariable @Parameter(description = "보상 ID") Long rewardId) {
        rewardService.deleteReward(rewardId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/reward/exp")
    @Operation(summary = "경험치 보상 지급", description = "특정 퀘스트 완료에 대한 경험치 보상을 사용자에게 지급합니다.")
    @ApiResponse(responseCode = "200", description = "경험치 보상 지급 성공")
    public ResponseEntity<UserDto> assignQuestCompletionExp(
            @PathVariable @Parameter(description = "퀘스트 ID") Long id,
            @RequestBody @Parameter(description = "사용자 정보") UserDto userDto) {
        Quest quest = questService.getQuestById(id);
        Reward reward = rewardService.getRewardsByType(quest, RewardType.EXP);
        User user = userService.getUserById(userDto.getId());
        UserDto responseDto = new UserDto(userService.updateUserRewardByRewardType(user, reward));
        return ResponseEntity.ok(responseDto);
    }

    @PostMapping("/{id}/reward/cash")
    @Operation(summary = "현금 보상 지급", description = "특정 퀘스트 완료에 대한 현금 보상을 사용자에게 지급합니다.")
    @ApiResponse(responseCode = "200", description = "현금 보상 지급 성공")
    public ResponseEntity<UserDto> assignQuestCompletionCash(
            @PathVariable @Parameter(description = "퀘스트 ID") Long id,
            @RequestBody @Parameter(description = "사용자 정보") UserDto userDto) {
        Quest quest = questService.getQuestById(id);
        Reward reward = rewardService.getRewardsByType(quest, RewardType.CASH);
        User user = userService.getUserById(userDto.getId());
        UserDto responseDto = new UserDto(userService.updateUserRewardByRewardType(user, reward));
        return ResponseEntity.ok(responseDto);
    }

    @PostMapping("/{id}/reward/point")
    @Operation(summary = "포인트 보상 지급", description = "특정 퀘스트 완료에 대한 포인트 보상을 사용자에게 지급합니다.")
    @ApiResponse(responseCode = "200", description = "포인트 보상 지급 성공")
    public ResponseEntity<UserDto> assignQuestCompletionPoint(
            @PathVariable @Parameter(description = "퀘스트 ID") Long id,
            @RequestBody @Parameter(description = "사용자 정보") UserDto userDto) {
        Quest quest = questService.getQuestById(id);
        Reward reward = rewardService.getRewardsByType(quest, RewardType.POINT);
        User user = userService.getUserById(userDto.getId());
        UserDto responseDto = new UserDto(userService.updateUserRewardByRewardType(user, reward));
        return ResponseEntity.ok(responseDto);
    }

    @PostMapping("/{id}/solutions")
    @Operation(summary = "솔루션 제출", description = "특정 퀘스트에 대한 솔루션을 제출합니다.")
    @ApiResponse(responseCode = "201", description = "솔루션 제출 성공")
    public ResponseEntity<SolutionDto> submitSolution(
            @PathVariable @Parameter(description = "퀘스트 ID") Long id,
            @AuthenticationPrincipal User user,
            @RequestBody @Parameter(description = "솔루션 정보") SolutionDto solutionDto) {
        Quest quest = questService.getQuestById(id);

        log.debug("Before getUserById: user = {}", user); // user 객체 확인

        user = userService.getUserById(user.getId()); // user 객체를 영속 상태로 만듦

        log.debug("After getUserById: user = {}", user); // user 객체 확인

        Solution solution = solutionDto.toEntity(quest, user);
        Solution submittedSolution = solutionService.createSolution(solution);
        SolutionDto responseDto = SolutionDto.fromEntity(submittedSolution);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
    }
}
