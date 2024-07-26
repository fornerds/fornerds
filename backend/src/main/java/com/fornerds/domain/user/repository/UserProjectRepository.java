package com.fornerds.domain.user.repository;

import com.fornerds.domain.user.entity.UserProject;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProjectRepository extends JpaRepository<UserProject, String> {

}
