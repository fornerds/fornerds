package com.fornerds.domain.project.entity;

import com.fornerds.domain.model.DevLanguage;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "projectDevLanguage")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDevLanguage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", referencedColumnName = "id")
    private Project project;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "devLanguage_id", referencedColumnName = "id")
    private DevLanguage devLanguage;

}
