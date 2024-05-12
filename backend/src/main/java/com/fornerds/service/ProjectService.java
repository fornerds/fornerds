package com.fornerds.service;

import com.fornerds.entity.Project;
import com.fornerds.repository.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ProjectService {
    private final ProjectRepository projectRepository;
    
    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }
    
    public Project createProject(Project project) {
        // 프로젝트 생성 로직 구현
        return project;
    }
    
    public Project getProjectById(Long id) {
        // 프로젝트 조회 로직 구현
        return null;
    }
    
    public List<Project> searchProjects(String keyword) {
        // 프로젝트 검색 로직 구현
        return List.of();
    }
    
    public Project updateProject(Project project) {
        // 프로젝트 정보 수정 로직 구현
        return project;
    }
    
    public void deleteProject(Long id) {
        // 프로젝트 삭제 로직 구현
    }
    
    // 추가적인 로직 구현
}
