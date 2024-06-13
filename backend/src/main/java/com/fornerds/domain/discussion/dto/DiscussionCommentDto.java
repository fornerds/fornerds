package com.fornerds.domain.discussion.dto;

import com.fornerds.domain.discussion.entity.DiscussionComment;
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
public class DiscussionCommentDto {
    private Long id;
    private String content;
    private Integer likeCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime deletedAt;
    private Long discussionId;
    private Long userId;
    private Long parentCommentId;
    private List<DiscussionCommentDto> childComments;

    public DiscussionCommentDto(DiscussionComment discussionComment) {
        this.id = discussionComment.getId();
        this.content = discussionComment.getContent();
        this.likeCount = discussionComment.getLikeCount();
        this.createdAt = discussionComment.getCreatedAt();
        this.updatedAt = discussionComment.getUpdatedAt();
        this.deletedAt = discussionComment.getDeletedAt();
        this.discussionId = discussionComment.getDiscussion().getId();
        this.userId = discussionComment.getUser().getId();
        this.parentCommentId = discussionComment.getParentComment() != null
                ? discussionComment.getParentComment().getId() : null;
        this.childComments = discussionComment.getChildComments().stream()
                .map(DiscussionCommentDto::new)
                .collect(Collectors.toList());
    }

    public DiscussionComment toEntity() {
        DiscussionComment discussionComment = new DiscussionComment();
        discussionComment.setContent(this.content);
        discussionComment.setLikeCount(this.likeCount);
        discussionComment.setCreatedAt(this.createdAt);
        discussionComment.setUpdatedAt(this.updatedAt);
        discussionComment.setDeletedAt(this.deletedAt);
        return discussionComment;
    }
}
