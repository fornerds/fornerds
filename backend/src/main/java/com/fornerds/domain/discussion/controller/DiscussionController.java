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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/discussions")
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
    public ResponseEntity<DiscussionDto> createDiscussion(@RequestBody DiscussionDto discussionDto) {
        User user = userService.getUserById(discussionDto.getUserId());
        Quest quest = questService.getQuestById(discussionDto.getQuestId());
        Discussion discussion = discussionService.createDiscussion(discussionDto.toEntity(quest, user));
        DiscussionDto responseDto = new DiscussionDto(discussion);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
    }

    @GetMapping("/quest/{questId}")
    public ResponseEntity<List<DiscussionDto>> getDiscussionByQuest(@PathVariable Long questId) {
        Quest quest = questService.getQuestById(questId);
        List<Discussion> discussions = discussionService.getDiscussionsByQuest(quest);
        List<DiscussionDto> responseDto = discussions.stream()
                .map(DiscussionDto::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DiscussionDto> getDiscussionById(@PathVariable Long id) {
        Discussion discussion = discussionService.getDiscussionById(id);
        DiscussionDto responseDto = new DiscussionDto(discussion);
        return ResponseEntity.ok(responseDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DiscussionDto> updateDiscussion(@PathVariable Long id, @RequestBody DiscussionDto discussionDto) {
        Discussion discussion = discussionService.getDiscussionById(id);
        discussion.update(discussionDto);
        Discussion updatedDiscussion = discussionService.updateDiscussion(discussion);
        DiscussionDto responseDto = new DiscussionDto(updatedDiscussion);
        return ResponseEntity.ok(responseDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDiscussion(@PathVariable Long id) {
        discussionService.deleteDiscussion(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/discussionComment")
    public ResponseEntity<DiscussionCommentDto> createDiscussionComment(@RequestBody DiscussionCommentDto discussionCommentDto) {
        User user = userService.getUserById(discussionCommentDto.getUserId());
        Discussion discussion = discussionService.getDiscussionById(discussionCommentDto.getDiscussionId());
        DiscussionComment discussionComment = discussionService.createDiscussionComment(discussionCommentDto.toEntity(discussion, user));
        DiscussionCommentDto responseDto = new DiscussionCommentDto(discussionComment);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
    }

    @GetMapping("/discussionComment/{id}")
    public ResponseEntity<DiscussionCommentDto> getDiscussionCommentById(@PathVariable Long id) {
        DiscussionComment discussionComment = discussionService.getDiscussionCommentById(id);
        DiscussionCommentDto responseDto = new DiscussionCommentDto(discussionComment);
        return ResponseEntity.ok(responseDto);
    }

    @PutMapping("/discussionComment/{id}")
    public ResponseEntity<DiscussionCommentDto> updateDiscussionComment(@PathVariable Long id, @RequestBody DiscussionCommentDto discussionCommentDto) {
        DiscussionComment discussionComment = discussionService.getDiscussionCommentById(id);
        discussionComment.update(discussionCommentDto);
        DiscussionComment updatedDiscussion = discussionService.updateDiscussionComment(discussionComment);
        DiscussionCommentDto responseDto = new DiscussionCommentDto(updatedDiscussion);
        return ResponseEntity.ok(responseDto);
    }

    @DeleteMapping("/discussionComment/{id}")
    public ResponseEntity<Void> deleteDiscussionComment(@PathVariable Long id) {
        discussionService.deleteDiscussionComment(id);
        return ResponseEntity.noContent().build();
    }

}
