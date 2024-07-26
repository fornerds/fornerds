package com.fornerds.domain.project.controller;

import com.fornerds.domain.project.dto.BookmarkProjectDto;
import com.fornerds.domain.project.dto.ProjectDto;
import com.fornerds.domain.project.dto.ProjectSummaryDto;
import com.fornerds.domain.user.dto.UserProjectDto;
import com.fornerds.domain.project.entity.BookmarkProject;
import com.fornerds.domain.project.entity.Project;
import com.fornerds.domain.project.service.ProjectService;
import com.fornerds.domain.user.entity.User;
import com.fornerds.domain.user.entity.UserProject;
import com.fornerds.domain.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/projects")
@Tag(name = "Project API", description = "프로젝트 관련 API")
public class ProjectController {
    private final ProjectService projectService;
    private final UserService userService;

    public ProjectController(ProjectService projectService, UserService userService) {
        this.projectService = projectService;
        this.userService = userService;
    }

    @PostMapping
    @Operation(summary = "프로젝트 생성", description = "새로운 프로젝트를 생성합니다.")
    @ApiResponse(responseCode = "201", description = "프로젝트 생성 성공")
    public ResponseEntity<ProjectDto> createProject(@RequestBody @Parameter(description = "프로젝트 생성 요청 정보") ProjectDto projectDto) {
        Project project = projectService.createProject(projectDto.toEntity());
        ProjectDto responseDto = new ProjectDto(project);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
    }

    @GetMapping("/admin")
    @Operation(summary = "모든 프로젝트 조회", description = "모든 프로젝트의 정보를 조회합니다.")
    @ApiResponse(responseCode = "200", description = "모든 프로젝트 조회 성공")
    public ResponseEntity<List<ProjectDto>> getAllProjects() {
        List<Project> projects = projectService.getAllProjects();
        List<ProjectDto> projectDtos = projects.stream()
                .map(ProjectDto::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(projectDtos);
    }

    @GetMapping("/{id}")
    @Operation(summary = "프로젝트 조회", description = "특정 프로젝트의 정보를 조회합니다.")
    @ApiResponse(responseCode = "200", description = "프로젝트 조회 성공")
    public ResponseEntity<ProjectDto> getPublicProjectById(@PathVariable @Parameter(description = "프로젝트 ID") Long id) {
        Object[] project = projectService.getPublicProjectById(id);
        ProjectDto responseDto = new ProjectDto(project);
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/admin/{id}")
    @Operation(summary = "프로젝트 조회", description = "특정 프로젝트의 정보를 조회합니다.")
    @ApiResponse(responseCode = "200", description = "프로젝트 조회 성공")
    public ResponseEntity<ProjectDto> getProjectById(@PathVariable @Parameter(description = "프로젝트 ID") Long id) {
        Project project = projectService.getProjectById(id);
        ProjectDto responseDto = new ProjectDto(project);
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/search")
    @Operation(summary = "프로젝트 검색", description = "다양한 조건을 사용하여 프로젝트를 검색합니다.")
    @ApiResponse(responseCode = "200", description = "프로젝트 검색 성공")
    public ResponseEntity<List<ProjectSummaryDto>> searchProjects(
            @RequestParam(name = "title", required = false) @Parameter(description = "프로젝트 제목") String title,
            @RequestParam(name = "category", required = false) @Parameter(description = "프로젝트 카테고리") String category,
            @RequestParam(name = "devLanguage", required = false) @Parameter(description = "개발 언어") String devLanguage,
            @RequestParam(name = "techStack", required = false) @Parameter(description = "기술 스택") List<String> techStack,
            @RequestParam(name = "sortBy", required = false) @Parameter(description = "정렬 기준") String sortBy,
            @RequestParam(name = "difficulty", required = false) @Parameter(description = "난이도") String difficulty,
            @RequestParam(name = "scale", required = false) @Parameter(description = "프로젝트 규모") String scale,
            @RequestParam(name = "status", required = false) @Parameter(description = "프로젝트 상태") String status,
            @RequestParam(name = "minBudget", required = false) @Parameter(description = "최소 예산") Integer minBudget,
            @RequestParam(name = "maxBudget", required = false) @Parameter(description = "최대 예산") Integer maxBudget,
            Pageable pageable) {

        Page<Object[]> projectPage = projectService.searchProjects(title, category, devLanguage, techStack, sortBy, difficulty, pageable, scale, status, minBudget, maxBudget);
        List<ProjectSummaryDto> responseDtos = projectPage.getContent().stream()
                .map(ProjectSummaryDto::new)
                .collect(Collectors.toList());

        return ResponseEntity.ok(responseDtos);
    }

    @PutMapping("/{id}")
    @Operation(summary = "프로젝트 수정", description = "특정 프로젝트의 정보를 수정합니다.")
    @ApiResponse(responseCode = "200", description = "프로젝트 수정 성공")
    public ResponseEntity<ProjectDto> updateProject(@PathVariable @Parameter(description = "프로젝트 ID") Long id, @RequestBody @Parameter(description = "프로젝트 수정 요청 정보") ProjectDto projectDto) {
        Project updatedProject = projectService.updateProject(id, projectDto);
        ProjectDto responseDto = new ProjectDto(updatedProject);
        return ResponseEntity.ok(responseDto);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "프로젝트 삭제", description = "특정 프로젝트를 삭제합니다.")
    @ApiResponse(responseCode = "204", description = "프로젝트 삭제 성공")
    public ResponseEntity<Void> deleteProject(@PathVariable @Parameter(description = "프로젝트 ID") Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{projectId}/join")
    @Operation(summary = "프로젝트 참여", description = "프로젝트에 참여합니다.")
    @ApiResponse(responseCode = "201", description = "프로젝트 참여 성공")
    public ResponseEntity<UserProjectDto> joinProject(@PathVariable @Parameter(description = "프로젝트 ID") Long projectId,
                                                      @RequestBody @Parameter(description = "토론 생성 요청 정보") UserProjectDto userProjectDTO) {
        User user = userService.getUserById(userProjectDTO.getUserId());
        UserProject userProject = projectService.joinProject(userProjectDTO.toEntity(projectId, user));
        UserProjectDto responseDto = new UserProjectDto(userProject);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
    }

    @PostMapping("/{projectId}/bookmark")
    @Operation(summary = "프로젝트 북마크", description = "프로젝트를 북마크합니다.")
    @ApiResponse(responseCode = "201", description = "프로젝트 북마크 성공")
    public ResponseEntity<BookmarkProjectDto> bookmarkProject(@PathVariable @Parameter(description = "프로젝트 ID") Long projectId,
                                                              @RequestBody @Parameter(description = "토론 생성 요청 정보") BookmarkProjectDto bookmarkProjectDTO) {
        User user = userService.getUserById(bookmarkProjectDTO.getUserId());
        BookmarkProject bookmarkProject = projectService.bookmarkProject(bookmarkProjectDTO.toEntity(projectId, user));
        BookmarkProjectDto responseDto = new BookmarkProjectDto(bookmarkProject);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
    }
    
}
