package com.fornerds.domain.solution.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "solution_file")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SolutionFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String path;
    private String fileName;
    private Long fileSize;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "solution_id")
    private Solution solution;
}