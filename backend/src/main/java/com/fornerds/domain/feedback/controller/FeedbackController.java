package com.fornerds.domain.feedback.controller;

import com.fornerds.domain.feedback.dto.FeedbackDto;
import com.fornerds.domain.feedback.service.FeedbackService;
import com.fornerds.domain.solution.entity.Solution;
import com.fornerds.domain.solution.service.SolutionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/feedbacks")
@Tag(name = "Feedback API", description = "피드백 관련 API")
public class FeedbackController {
    private final FeedbackService feedbackService;
    private final SolutionService solutionService;

    public FeedbackController(FeedbackService feedbackService, SolutionService solutionService) {
        this.feedbackService = feedbackService;
        this.solutionService = solutionService;
    }

    @PostMapping
    @Operation(summary = "피드백 생성", description = "새로운 피드백을 생성합니다.")
    @ApiResponse(responseCode = "201", description = "피드백 생성 성공")
    public ResponseEntity<FeedbackDto> createFeedback(@RequestBody @Parameter(description = "피드백 생성 요청 정보") FeedbackDto feedbackDto) {
        Solution solution = solutionService.getSolutionById(feedbackDto.getSolutionId());
        FeedbackDto createdFeedback = feedbackService.createFeedback(feedbackDto, solution);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdFeedback);
    }

    @GetMapping("/{id}")
    @Operation(summary = "피드백 조회", description = "특정 피드백의 정보를 조회합니다.")
    @ApiResponse(responseCode = "200", description = "피드백 조회 성공")
    public ResponseEntity<FeedbackDto> getFeedbackById(@PathVariable @Parameter(description = "피드백 ID") Long id) {
        FeedbackDto feedback = feedbackService.getFeedbackById(id);
        return ResponseEntity.ok(feedback);
    }

    @GetMapping("/solution/{solutionId}")
    @Operation(summary = "솔루션별 피드백 조회", description = "특정 솔루션에 대한 피드백 목록을 조회합니다.")
    @ApiResponse(responseCode = "200", description = "솔루션별 피드백 조회 성공")
    public ResponseEntity<List<FeedbackDto>> getFeedbacksBySolution(@PathVariable @Parameter(description = "솔루션 ID") Long solutionId) {
        List<FeedbackDto> feedbacks = feedbackService.getFeedbacksBySolutionId(solutionId);
        return ResponseEntity.ok(feedbacks);
    }

    @PutMapping("/{id}")
    @Operation(summary = "피드백 수정", description = "특정 피드백의 정보를 수정합니다.")
    @ApiResponse(responseCode = "200", description = "피드백 수정 성공")
    public ResponseEntity<FeedbackDto> updateFeedback(@PathVariable @Parameter(description = "피드백 ID") Long id, @RequestBody @Parameter(description = "피드백 수정 요청 정보") FeedbackDto feedbackDto) {
        FeedbackDto updatedFeedback = feedbackService.updateFeedback(id, feedbackDto);
        return ResponseEntity.ok(updatedFeedback);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "피드백 삭제", description = "특정 피드백을 삭제합니다.")
    @ApiResponse(responseCode = "204", description = "피드백 삭제 성공")
    public ResponseEntity<Void> deleteFeedback(@PathVariable @Parameter(description = "피드백 ID") Long id) {
        feedbackService.deleteFeedback(id);
        return ResponseEntity.noContent().build();
    }
}