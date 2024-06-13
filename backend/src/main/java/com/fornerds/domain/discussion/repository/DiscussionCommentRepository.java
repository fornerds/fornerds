package com.fornerds.domain.discussion.repository;

import com.fornerds.domain.discussion.entity.Discussion;
import com.fornerds.domain.discussion.entity.DiscussionComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiscussionCommentRepository extends JpaRepository<DiscussionComment, Long> {
    List<DiscussionComment> findByDiscussion(Discussion discussion);
    List<DiscussionComment> findByParentComment(DiscussionComment parentComment);
}
