package com.fornerds.domain.quest.entity;

import com.fornerds.domain.project.entity.Project;
import com.fornerds.domain.quest.dto.QuestDto;
import com.fornerds.domain.solution.entity.Solution;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "quest")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Quest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Enumerated(EnumType.STRING)
    private QuestStatus status;

    @Lob
    private String description;

    @Lob
    private String convention;

    @Lob
    private String requirements;

    @Lob
    private String goal;

    @Lob
    private String inputExample;

    @Lob
    private String outputExample;

    @Lob
    private String exampleExplanation;

    private String apiUrl;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private LocalDateTime deadline;

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    private Integer budget;

    private Integer developerCount;

    private String scale;

    private Integer rewardCash;

    private Integer rewardExp;

    private Integer rewardPoint;

    private boolean isPublic;

    private Integer viewCount;

    private Integer likeCount;

    @Lob
    private String keyLearnings;

    private Integer estimatedDuration;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    private LocalDateTime deletedAt;

    public void update(QuestDto questDto) {
        this.title = questDto.getTitle();
        this.status = questDto.getStatus();
        // 필요한 필드 업데이트
    }
    // 기타 연관관계 매핑
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    @OneToMany(mappedBy = "quest", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Solution> solutions = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private Position position;
}
