package com.fornerds.domain.project.repository;

import com.fornerds.domain.project.entity.ProjectTechStack;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProjectDevLanguagesRepository extends JpaRepository<ProjectTechStack, String> {}


