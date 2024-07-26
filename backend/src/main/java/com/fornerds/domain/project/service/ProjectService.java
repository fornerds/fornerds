package com.fornerds.domain.project.service;

import com.fornerds.domain.project.dto.ProjectDto;
import com.fornerds.domain.project.entity.BookmarkProject;
import com.fornerds.domain.project.entity.Project;
import com.fornerds.domain.project.repository.BookmarkProjectRepository;
import com.fornerds.domain.user.entity.UserProject;
import com.fornerds.domain.project.repository.ProjectRepository;
import com.fornerds.domain.user.repository.UserProjectRepository;
import com.fornerds.domain.repository.CategoryRepository;
import com.fornerds.domain.repository.DevLanguageRepository;
import com.fornerds.domain.repository.TechStackRepository;
import com.fornerds.domain.model.*;
import com.fornerds.domain.user.repository.UserRepository;
import com.fornerds.global.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Autowired;

@Service
@Transactional
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final TechStackRepository techStackRepository;
    private final CategoryRepository categoryRepository;
    private final DevLanguageRepository devLanguageRepository;
    private final UserProjectRepository userProjectRepository;
    private final BookmarkProjectRepository bookmarkProjectRepository;

    @Autowired
    public ProjectService(ProjectRepository projectRepository, UserRepository userRepository, CategoryRepository categoryRepository,
                          TechStackRepository techStackRepository, DevLanguageRepository devLanguageRepository,
                          UserProjectRepository userProjectRepository, BookmarkProjectRepository bookmarkProjectRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.devLanguageRepository = devLanguageRepository;
        this.techStackRepository = techStackRepository;
        this.userProjectRepository = userProjectRepository;
        this.bookmarkProjectRepository = bookmarkProjectRepository;
    }

    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Object[] getPublicProjectById(Long id) {
        return new List[]{projectRepository.findPublicProjectById(id)};
    }

    public Project getProjectById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));
    }

    public Page<Object[]> searchProjects(String title, String categoryName, String devLanguageName, List<String> techStackNames,
                                         String sortBy, String difficulty, Pageable pageable, String scale, String status,
                                         Integer minBudget, Integer maxBudget) {
        String englishStatus = StatusConverter.convertToEnglish(status);
        // 카테고리 이름을 ID로 변환
        String categoryId = null;
        if (categoryName != null) {
            categoryId = categoryRepository.findByName(categoryName)
                    .map(Category::getId)
                    .orElse(null);
        }
        // 데브 언어 이름들을 ID로 변환
        String devLanguageId = null;
        if (devLanguageName != null) {
            devLanguageId = devLanguageRepository.findByName(devLanguageName)
                    .map(DevLanguage::getId)
                    .orElse(null);
        }
        // 기술 스택 이름들을 ID로 변환
        List<String> techStackIds = null;
        if (techStackNames != null && !techStackNames.isEmpty()) {
            techStackIds = techStackNames.stream()
                    .map(name -> techStackRepository.findByName(name)
                            .map(TechStack::getId)
                            .orElse(null))
                    .filter(Objects::nonNull)
                    .collect(Collectors.toList());
        }
        return projectRepository.search(title, categoryId, devLanguageId, techStackIds, difficulty,
                scale, englishStatus, minBudget, maxBudget, sortBy, pageable);
    }
    public static class StatusConverter {
        public static String convertToEnglish(String status) {
            if (status == null) return null;
            return switch (status) {
                case "진행중" -> "inProgress";
                case "완료" -> "completed";
                default -> status;
            };
        }
    }

    public Project updateProject(Long id, ProjectDto projectDto) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));

        project.setTitle(projectDto.getTitle());
        project.setStatus(projectDto.getStatus());
        project.setDescription(projectDto.getDescription());
        project.setIntroduction(projectDto.getIntroduction());
        project.setKeyLearnings(projectDto.getKeyLearnings());
        project.setRequirements(projectDto.getRequirements());
        project.setDeadline(projectDto.getDeadline());
        project.setEstimatedDuration(projectDto.getEstimatedDuration());
        project.setDifficulty(projectDto.getDifficulty());
        project.setScale(projectDto.getScale());
        project.setBudget(projectDto.getBudget());
        project.setDeveloperCount(projectDto.getDeveloperCount());
        project.setPublic(projectDto.isPublic());
        project.setViewCount(projectDto.getViewCount());
        project.setRemainingQuests(projectDto.getRemainingQuests());
        project.setUpdatedAt(LocalDateTime.now());
        return projectRepository.save(project);
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }

    public UserProject joinProject(UserProject userProject) {
        return userProjectRepository.save(userProject);
    }

    public BookmarkProject bookmarkProject(BookmarkProject bookmarkProject) {
        return bookmarkProjectRepository.save(bookmarkProject);
    }

}
