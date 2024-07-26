package com.fornerds.domain.user.dto;

import com.fornerds.domain.project.entity.Project;
import com.fornerds.domain.user.entity.User;
import com.fornerds.domain.user.entity.UserProject;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserProjectDto {
    private Long id;
    private Long userId;
    private Long projectId;

    public UserProjectDto(UserProject userProject) {
        this.id = userProject.getId();
        this.userId = userProject.getUser().getId();
        this.projectId = userProject.getProject().getId();
    }

    public UserProject toEntity(Long projectId, User user) {
        Project project = new Project();
        project.setId(projectId);
        return new UserProject(this.id, user, project);
    }
}
