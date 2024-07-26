package com.fornerds.domain.project.dto;

import com.fornerds.domain.project.entity.BookmarkProject;
import com.fornerds.domain.project.entity.Project;
import com.fornerds.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookmarkProjectDto {
    private Long id;
    private Long userId;
    private Long projectId;
    private LocalDateTime createdAt;

    public BookmarkProjectDto(BookmarkProject bookmarkProject) {
        this.id = bookmarkProject.getId();
        this.userId = bookmarkProject.getUser().getId();
        this.projectId = bookmarkProject.getProject().getId();
        this.createdAt = bookmarkProject.getCreatedAt();
    }


    public BookmarkProject toEntity(Long projectId, User user) {
        Project project = new Project();
        project.setId(projectId);
        return new BookmarkProject(this.id, this.createdAt, user, project);
    }
}
