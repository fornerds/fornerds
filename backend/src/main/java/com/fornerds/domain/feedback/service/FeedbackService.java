package com.fornerds.domain.feedback.service;

import com.fornerds.domain.feedback.dto.FeedbackDto;
import com.fornerds.domain.feedback.entity.Feedback;
import com.fornerds.domain.feedback.repository.FeedbackRepository;
import com.fornerds.domain.solution.entity.Solution;
import com.fornerds.global.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class FeedbackService {
    private final FeedbackRepository feedbackRepository;

    public FeedbackService(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    public FeedbackDto createFeedback(FeedbackDto feedbackDto, Solution solution) {
        Feedback feedback = new Feedback();
        feedback.setContent(feedbackDto.getContent());
        feedback.setSolution(solution);
        Feedback savedFeedback = feedbackRepository.save(feedback);
        return FeedbackDto.fromEntity(savedFeedback);
    }

    public FeedbackDto getFeedbackById(Long id) {
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Feedback not found with id: " + id));
        return FeedbackDto.fromEntity(feedback);
    }

    public List<FeedbackDto> getFeedbacksBySolutionId(Long solutionId) {
        List<Feedback> feedbacks = feedbackRepository.findBySolutionId(solutionId);
        return feedbacks.stream()
                .map(FeedbackDto::fromEntity)
                .collect(Collectors.toList());
    }

    public FeedbackDto updateFeedback(Long id, FeedbackDto feedbackDto) {
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Feedback not found with id: " + id));
        feedback.setContent(feedbackDto.getContent());
        Feedback updatedFeedback = feedbackRepository.save(feedback);
        return FeedbackDto.fromEntity(updatedFeedback);
    }

    public void deleteFeedback(Long id) {
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Feedback not found with id: " + id));
        feedbackRepository.delete(feedback);
    }
}