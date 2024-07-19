package com.fornerds.domain.discussion.controller;

import com.fornerds.domain.discussion.dto.DiscussionCommentDto;
import com.fornerds.domain.discussion.dto.DiscussionDto;
import com.fornerds.domain.discussion.entity.Discussion;
import com.fornerds.domain.discussion.entity.DiscussionComment;
import com.fornerds.domain.discussion.service.DiscussionService;
import com.fornerds.domain.project.service.ProjectService;
import com.fornerds.domain.quest.entity.Quest;
import com.fornerds.domain.quest.service.QuestService;
import com.fornerds.domain.user.entity.User;
import com.fornerds.domain.user.service.UserService;
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
@RequestMapping("/api/discussions")
@Tag(name = "Discussion API", description = "토론 관련 API")
public class DiscussionController {
    private final QuestService questService;
    private final ProjectService projectService;
    private final DiscussionService discussionService;
    private final UserService userService;

    public DiscussionController(QuestService questService, ProjectService projectService, DiscussionService discussionService, UserService userService) {
        this.questService = questService;
        this.projectService = projectService;
        this.discussionService = discussionService;
        this.userService = userService;
    }

    @PostMapping
    @Operation(summary = "토론 생성", description = "새로운 토론을 생성합니다.")
    @ApiResponse(responseCode = "201", description = "토론 생성 성공")
    public ResponseEntity<DiscussionDto> createDiscussion(@RequestBody @Parameter(description = "토론 생성 요청 정보") DiscussionDto discussionDto) {
        User user = userService.getUserById(discussionDto.getUserId());
        Quest quest = questService.getQuestById(discussionDto.getQuestId());
        Discussion discussion = discussionService.createDiscussion(discussionDto.toEntity(quest, user));
        DiscussionDto responseDto = new DiscussionDto(discussion);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
    }

    @GetMapping("/quest/{questId}")
    @Operation(summary = "퀘스트별 토론 조회", description = "특정 퀘스트에 대한 토론 목록을 조회합니다.")
    @ApiResponse(responseCode = "200", description = "토론 목록 조회 성공")
    public ResponseEntity<List<DiscussionDto>> getDiscussionByQuest(@PathVariable @Parameter(description = "퀘스트 ID") Long questId) {
        Quest quest = questService.getQuestById(questId);
        List<Discussion> discussions = discussionService.getDiscussionsByQuest(quest);
        List<DiscussionDto> responseDto = discussions.stream()
                .map(DiscussionDto::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/{id}")
    @Operation(summary = "토론 상세 조회", description = "특정 토론의 상세 정보를 조회합니다.")
    @ApiResponse(responseCode = "200", description = "토론 상세 조회 성공")
    public ResponseEntity<DiscussionDto> getDiscussionById(@PathVariable @Parameter(description = "토론 ID") Long id) {
        Discussion discussion = discussionService.getDiscussionById(id);
        DiscussionDto responseDto = new DiscussionDto(discussion);
        return ResponseEntity.ok(responseDto);
    }

    @PutMapping("/{id}")
    @Operation(summary = "토론 수정", description = "특정 토론의 정보를 수정합니다.")
    @ApiResponse(responseCode = "200", description = "토론 수정 성공")
    public ResponseEntity<DiscussionDto> updateDiscussion(@PathVariable @Parameter(description = "토론 ID") Long id, @RequestBody @Parameter(description = "토론 수정 요청 정보") DiscussionDto discussionDto) {
        Discussion discussion = discussionService.getDiscussionById(id);
        discussion.update(discussionDto);
        Discussion updatedDiscussion = discussionService.updateDiscussion(discussion);
        DiscussionDto responseDto = new DiscussionDto(updatedDiscussion);
        return ResponseEntity.ok(responseDto);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "토론 삭제", description = "특정 토론을 삭제합니다.")
    @ApiResponse(responseCode = "204", description = "토론 삭제 성공")
    public ResponseEntity<Void> deleteDiscussion(@PathVariable @Parameter(description = "토론 ID") Long id) {
        discussionService.deleteDiscussion(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/discussionComment")
    @Operation(summary = "토론 댓글 생성", description = "토론에 새로운 댓글을 생성합니다.")
    @ApiResponse(responseCode = "201", description = "토론 댓글 생성 성공")
    public ResponseEntity<DiscussionCommentDto> createDiscussionComment(@RequestBody @Parameter(description = "토론 댓글 생성 요청 정보") DiscussionCommentDto discussionCommentDto) {
        User user = userService.getUserById(discussionCommentDto.getUserId());
        Discussion discussion = discussionService.getDiscussionById(discussionCommentDto.getDiscussionId());
        DiscussionComment discussionComment = discussionService.createDiscussionComment(discussionCommentDto.toEntity(discussion, user));
        DiscussionCommentDto responseDto = new DiscussionCommentDto(discussionComment);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
    }

    @GetMapping("/discussionComment/{id}")
    @Operation(summary = "토론 댓글 조회", description = "특정 토론 댓글의 정보를 조회합니다.")
    @ApiResponse(responseCode = "200", description = "토론 댓글 조회 성공")
    public ResponseEntity<DiscussionCommentDto> getDiscussionCommentById(@PathVariable @Parameter(description = "토론 댓글 ID") Long id) {
        DiscussionComment discussionComment = discussionService.getDiscussionCommentById(id);
        DiscussionCommentDto responseDto = new DiscussionCommentDto(discussionComment);
        return ResponseEntity.ok(responseDto);
    }

    @PutMapping("/discussionComment/{id}")
    @Operation(summary = "토론 댓글 수정", description = "특정 토론 댓글의 정보를 수정합니다.")
    @ApiResponse(responseCode = "200", description = "토론 댓글 수정 성공")
    public ResponseEntity<DiscussionCommentDto> updateDiscussionComment(@PathVariable @Parameter(description = "토론 댓글 ID") Long id, @RequestBody @Parameter(description = "토론 댓글 수정 요청 정보") DiscussionCommentDto discussionCommentDto) {
        DiscussionComment discussionComment = discussionService.getDiscussionCommentById(id);
        discussionComment.update(discussionCommentDto);
        DiscussionComment updatedDiscussion = discussionService.updateDiscussionComment(discussionComment);
        DiscussionCommentDto responseDto = new DiscussionCommentDto(updatedDiscussion);
        return ResponseEntity.ok(responseDto);
    }

    @DeleteMapping("/discussionComment/{id}")
    @Operation(summary = "토론 댓글 삭제", description = "특정 토론 댓글을 삭제합니다.")
    @ApiResponse(responseCode = "204", description = "토론 댓글 삭제 성공")
    public ResponseEntity<Void> deleteDiscussionComment(@PathVariable @Parameter(description = "토론 댓글 ID") Long id) {
        discussionService.deleteDiscussionComment(id);
        return ResponseEntity.noContent().build();
    }

}