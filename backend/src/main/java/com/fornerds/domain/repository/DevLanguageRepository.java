package com.fornerds.domain.repository;

import com.fornerds.domain.model.DevLanguage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DevLanguageRepository extends JpaRepository<DevLanguage, String> {
    Optional<DevLanguage> findByName(String name);
}