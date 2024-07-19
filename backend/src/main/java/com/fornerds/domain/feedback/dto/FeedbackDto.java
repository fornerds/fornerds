package com.fornerds.domain.feedback.dto;

import com.fornerds.domain.feedback.entity.Feedback;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackDto {
    private Long id;
    private String content;
    private Long solutionId;

    public static FeedbackDto fromEntity(Feedback feedback) {
        return new FeedbackDto(
                feedback.getId(),
                feedback.getContent(),
                feedback.getSolution().getId()
        );
    }
}