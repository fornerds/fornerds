package com.fornerds.domain.solution.entity;

import com.fornerds.domain.quest.entity.Quest;
import com.fornerds.domain.solution.dto.SolutionDto;
import com.fornerds.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "solution")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Solution {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String repositoryUrl;

    @Enumerated(EnumType.STRING)
    private SolutionStatus status;

    @Column(name = "feedback", columnDefinition = "TEXT")
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

    @OneToMany(mappedBy = "solution", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SolutionFile> files;

    public void update(SolutionDto solutionDto) {
        this.repositoryUrl = solutionDto.getRepositoryUrl();
        // 필요한 필드 업데이트
    }
}