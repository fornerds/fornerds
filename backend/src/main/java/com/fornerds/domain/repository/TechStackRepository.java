package com.fornerds.domain.repository;

import com.fornerds.domain.model.TechStack;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TechStackRepository extends JpaRepository<TechStack, String> {
    Optional<TechStack> findByName(String name);
}