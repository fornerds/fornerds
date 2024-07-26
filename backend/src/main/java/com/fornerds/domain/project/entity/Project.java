package com.fornerds.domain.project.entity;

import com.fornerds.domain.project.dto.ProjectDto;
import com.fornerds.domain.quest.entity.Quest;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "introduction", columnDefinition = "TEXT")
    private String introduction;

    private String keyLearnings;

    @Column(name = "requirements", columnDefinition = "TEXT")
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

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private Set<ProjectTechStack> projectTechStacks = new HashSet<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private Set<ProjectCategory> projectCategories = new HashSet<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private Set<ProjectDevLanguage> projectDevLanguages = new HashSet<>();

    public Project(Long id) {
        this.id = id;
    }

    public void update(ProjectDto projectDto) {
        this.title = projectDto.getTitle();
        this.status = projectDto.getStatus();
    }
}
