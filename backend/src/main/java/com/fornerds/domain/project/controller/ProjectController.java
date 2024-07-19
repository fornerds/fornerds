package com.fornerds.domain.project.controller;

import com.fornerds.domain.project.dto.ProjectDto;
import com.fornerds.domain.project.entity.Project;
import com.fornerds.domain.project.service.ProjectService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
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

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping
    @Operation(summary = "프로젝트 생성", description = "새로운 프로젝트를 생성합니다.")
    @ApiResponse(responseCode = "201", description = "프로젝트 생성 성공")
    public ResponseEntity<ProjectDto> createProject(@RequestBody @Parameter(description = "프로젝트 생성 요청 정보") ProjectDto projectDto) {
        Project project = projectService.createProject(projectDto.toEntity());
        ProjectDto responseDto = new ProjectDto(project);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
    }

    @GetMapping("/{id}")
    @Operation(summary = "프로젝트 조회", description = "특정 프로젝트의 정보를 조회합니다.")
    @ApiResponse(responseCode = "200", description = "프로젝트 조회 성공")
    public ResponseEntity<ProjectDto> getProjectById(@PathVariable @Parameter(description = "프로젝트 ID") Long id) {
        Project project = projectService.getProjectById(id);
        ProjectDto responseDto = new ProjectDto(project);
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/search")
    @Operation(summary = "프로젝트 검색", description = "키워드를 사용하여 프로젝트를 검색합니다.")
    @ApiResponse(responseCode = "200", description = "프로젝트 검색 성공")
    public ResponseEntity<List<ProjectDto>> searchProjects(@RequestParam @Parameter(description = "검색 키워드") String keyword) {
        List<Project> projects = projectService.searchProjects(keyword);
        List<ProjectDto> responseDtos = projects.stream()
                .map(ProjectDto::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseDtos);
    }

    @PutMapping("/{id}")
    @Operation(summary = "프로젝트 수정", description = "특정 프로젝트의 정보를 수정합니다.")
    @ApiResponse(responseCode = "200", description = "프로젝트 수정 성공")
    public ResponseEntity<ProjectDto> updateProject(@PathVariable @Parameter(description = "프로젝트 ID") Long id, @RequestBody @Parameter(description = "프로젝트 수정 요청 정보") ProjectDto projectDto) {
        Project project = projectService.getProjectById(id);
        project.update(projectDto);
        Project updatedProject = projectService.updateProject(project);
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
}
