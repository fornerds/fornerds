package com.fornerds.domain.discussion.service;

import com.fornerds.domain.discussion.entity.Discussion;
import com.fornerds.domain.discussion.entity.DiscussionComment;
import com.fornerds.domain.discussion.repository.DiscussionCommentRepository;
import com.fornerds.domain.discussion.repository.DiscussionRepository;
import com.fornerds.domain.quest.entity.Quest;
import com.fornerds.global.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class DiscussionService {
    private final DiscussionRepository discussionRepository;
    private final DiscussionCommentRepository discussionCommentRepository;

    public DiscussionService(DiscussionRepository discussionRepository, DiscussionCommentRepository discussionCommentRepository) {
        this.discussionRepository = discussionRepository;
        this.discussionCommentRepository = discussionCommentRepository;
    }

    public Discussion createDiscussion(Discussion discussion) {
        return discussionRepository.save(discussion);
    }

    public Discussion getDiscussionById(Long id) {
        return discussionRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Discussion not found with id: " + id));
    }

    public List<Discussion> getDiscussionsByQuest(Quest quest) {
        return discussionRepository.findByQuest(quest);
    }

    public Discussion updateDiscussion(Discussion discussion) {
        return discussionRepository.save(discussion);
    }

    public void deleteDiscussion(Long id) {
        discussionRepository.deleteById(id);
    }

    public DiscussionComment createDiscussionComment(DiscussionComment discussionComment) {
        return discussionCommentRepository.save(discussionComment);
    }

    public DiscussionComment getDiscussionCommentById(Long id) {
        return discussionCommentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("DiscussionComment not found with id: " + id));
    }

    public DiscussionComment updateDiscussionComment(DiscussionComment discussionComment) {
        return discussionCommentRepository.save(discussionComment);
    }

    public void deleteDiscussionComment(Long id) {
        discussionCommentRepository.deleteById(id);
    }
}
