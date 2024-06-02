package com.fornerds.domain.solution.entity;

import com.fornerds.domain.quest.entity.Quest;
import com.fornerds.domain.solution.dto.SolutionDto;
import com.fornerds.domain.user.entity.User;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "solution")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Solution {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String repositoryUrl;

    @Lob
    private byte[] file;

    @Enumerated(EnumType.STRING)
    private SolutionStatus status;

    @Lob
    private String feedback;

    private Integer memoryUsage;

    private Integer executionTime;

    private Integer likeCount;

    private Integer viewCount;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    private LocalDateTime deletedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quest_id")
    private Quest quest;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public void update(SolutionDto solutionDto) {
        this.repositoryUrl = solutionDto.getRepositoryUrl();
        this.file = solutionDto.getFile();
        // 필요한 필드 업데이트
    }
}