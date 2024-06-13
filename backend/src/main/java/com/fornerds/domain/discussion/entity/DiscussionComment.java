package com.fornerds.domain.discussion.entity;

import com.fornerds.domain.discussion.dto.DiscussionCommentDto;
import com.fornerds.domain.discussion.dto.DiscussionDto;
import com.fornerds.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "discussion_comment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DiscussionComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    private String content;

    private Integer likeCount;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    private LocalDateTime deletedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "discussion_id")
    private Discussion discussion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_discussion_comment_id")
    private DiscussionComment parentComment;

    @OneToMany(mappedBy = "parentComment", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DiscussionComment> childComments = new ArrayList<>();

    public void update(DiscussionCommentDto discussionCommentDto) {
        this.content = discussionCommentDto.getContent();
    }
}
