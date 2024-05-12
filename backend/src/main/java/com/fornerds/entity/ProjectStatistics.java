package com.fornerds.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "project_statistics")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectStatistics {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate startDate;

    private LocalDate endDate;

    private Integer totalDevelopers;

    private Float completionRate;

    private Float averageDifficulty;

    private Integer averageDuration;

    private String intervalUnit;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;
}