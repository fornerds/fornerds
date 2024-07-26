package com.fornerds.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "techStack")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TechStack {

    @Id
    private String id;

    @Column(unique = true, nullable = false)
    private String name;

}

