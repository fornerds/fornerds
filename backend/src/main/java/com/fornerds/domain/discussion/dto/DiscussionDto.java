package com.fornerds.domain.discussion.dto;

import com.fornerds.domain.discussion.entity.Discussion;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DiscussionDto {
    private Long id;
    private String content;
    private Integer likeCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime deletedAt;
    private Long questId;
    private Long userId;
    private List<DiscussionCommentDto> discussionComments;

    public DiscussionDto(Discussion discussion) {
        this.id = discussion.getId();
        this.content = discussion.getContent();
        this.likeCount = discussion.getLikeCount();
        this.createdAt = discussion.getCreatedAt();
        this.updatedAt = discussion.getUpdatedAt();
        this.deletedAt = discussion.getDeletedAt();
        this.questId = discussion.getQuest().getId();
        this.userId = discussion.getUser().getId();
        this.discussionComments = discussion.getDiscussionComments().stream()
                .map(DiscussionCommentDto::new)
                .collect(Collectors.toList());
    }

    public Discussion toEntity() {
        Discussion discussion = new Discussion();
        discussion.setContent(this.content);
        discussion.setLikeCount(this.likeCount);
        discussion.setCreatedAt(this.createdAt);
        discussion.setUpdatedAt(this.updatedAt);
        discussion.setDeletedAt(this.deletedAt);
        return discussion;
    }
}
