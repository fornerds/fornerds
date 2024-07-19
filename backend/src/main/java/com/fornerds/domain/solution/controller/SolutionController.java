package com.fornerds.domain.solution.controller;

import com.fornerds.domain.quest.entity.Quest;
import com.fornerds.domain.quest.service.QuestService;
import com.fornerds.domain.solution.dto.SolutionDto;
import com.fornerds.domain.solution.entity.Solution;
import com.fornerds.domain.solution.service.SolutionService;
import com.fornerds.domain.user.entity.User;
import com.fornerds.domain.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/solutions")
@Tag(name = "Solution API", description = "솔루션 관련 API")
@RequiredArgsConstructor // 생성자 자동 생성
public class SolutionController {

    private final SolutionService solutionService;
    private final QuestService questService;
    private final UserService userService;

    @PostMapping
    @Operation(summary = "솔루션 제출", description = "퀘스트에 대한 솔루션을 제출합니다.")
    @ApiResponse(responseCode = "201", description = "솔루션 제출 성공")
    public ResponseEntity<SolutionDto> createSolution(
            @RequestPart(value = "solution") @Parameter(description = "솔루션 정보") SolutionDto solutionDto,
            @RequestPart(value = "files", required = false) @Parameter(description = "솔루션 파일") List<MultipartFile> files) {

        Quest quest = questService.getQuestById(solutionDto.getQuestId());
        User user = userService.getUserById(solutionDto.getUserId());
        Solution solution = solutionService.createSolution(solutionDto.toEntity(quest, user));
        solutionService.saveSolutionFiles(solution, files);

        SolutionDto responseDto = SolutionDto.fromEntity(solution);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
    }

    // 생성자 제거

    @GetMapping("/{id}")
    @Operation(summary = "솔루션 조회", description = "특정 솔루션의 정보를 조회합니다.")
    @ApiResponse(responseCode = "200", description = "솔루션 조회 성공")
    public ResponseEntity<SolutionDto> getSolutionById(@PathVariable @Parameter(description = "솔루션 ID") Long id) {
        Solution solution = solutionService.getSolutionById(id);
        SolutionDto responseDto = new SolutionDto(solution);
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/quest/{questId}")
    @Operation(summary = "퀘스트별 솔루션 조회", description = "특정 퀘스트에 대한 솔루션 목록을 조회합니다.")
    @ApiResponse(responseCode = "200", description = "퀘스트별 솔루션 조회 성공")
    public ResponseEntity<List<SolutionDto>> getSolutionsByQuest(@PathVariable @Parameter(description = "퀘스트 ID") Long questId) {
        Quest quest = questService.getQuestById(questId);
        List<Solution> solutions = solutionService.getSolutionsByQuest(quest);
        List<SolutionDto> responseDtos = solutions.stream()
                .map(SolutionDto::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseDtos);
    }

    @PutMapping("/{id}")
    @Operation(summary = "솔루션 수정", description = "특정 솔루션의 정보를 수정합니다.")
    @ApiResponse(responseCode = "200", description = "솔루션 수정 성공")
    public ResponseEntity<SolutionDto> updateSolution(
            @PathVariable @Parameter(description = "솔루션 ID") Long id,
            @RequestBody @Parameter(description = "솔루션 수정 정보") SolutionDto solutionDto) {
        Solution solution = solutionService.getSolutionById(id);
        solution.update(solutionDto);
        Solution updatedSolution = solutionService.updateSolution(solution);
        SolutionDto responseDto = new SolutionDto(updatedSolution);
        return ResponseEntity.ok(responseDto);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "솔루션 삭제", description = "특정 솔루션을 삭제합니다.")
    @ApiResponse(responseCode = "204", description = "솔루션 삭제 성공")
    public ResponseEntity<Void> deleteSolution(@PathVariable @Parameter(description = "솔루션 ID") Long id) {
        solutionService.deleteSolution(id);
        return ResponseEntity.noContent().build();
    }
}