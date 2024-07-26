package com.fornerds.domain.project.entity;

import com.fornerds.domain.model.TechStack;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "projectTechStack")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectTechStack {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", referencedColumnName = "id")
    private Project project;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "techStack_id", referencedColumnName = "id")
    private TechStack techStack;

}
