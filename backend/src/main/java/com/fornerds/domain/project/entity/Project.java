package com.fornerds.domain.project.entity;

import com.fornerds.domain.project.dto.ProjectDto;
import com.fornerds.domain.quest.entity.Quest;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "project")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Enumerated(EnumType.STRING)
    private ProjectStatus status;

    @Lob
    private String description;

    @Lob
    private String introduction;

    @Lob
    private String keyLearnings;

    @Lob
    private String requirements;

    private LocalDateTime deadline;

    private String estimatedDuration;

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    private String scale;

    private Integer budget;

    private Integer developerCount;

    private boolean isPublic;

    private Integer viewCount;

    private Integer remainingQuests;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    private LocalDateTime deletedAt;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Quest> quests = new ArrayList<>();

    public void update(ProjectDto projectDto) {
        this.title = projectDto.getTitle();
        this.status = projectDto.getStatus();
        // 필요한 필드 업데이트
    }

    // 기타 연관관계 매핑
}
