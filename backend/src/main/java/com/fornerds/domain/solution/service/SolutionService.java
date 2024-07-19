package com.fornerds.domain.solution.service;

import com.fornerds.domain.quest.entity.Quest;
import com.fornerds.domain.solution.dto.SolutionDto;
import com.fornerds.domain.solution.dto.SolutionFileDto;
import com.fornerds.domain.solution.entity.Solution;
import com.fornerds.domain.solution.repository.SolutionRepository;
import com.fornerds.global.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor // 생성자 자동 생성
public class SolutionService {
    private final SolutionRepository solutionRepository;
    private final SolutionFileService solutionFileService;

    // 생성자 제거

    public Solution createSolution(Solution solution) {
        return solutionRepository.save(solution);
    }

    public Solution getSolutionById(Long id) {
        return solutionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Solution not found with id: " + id));
    }

    public List<Solution> getSolutionsByQuest(Quest quest) {
        return solutionRepository.findByQuest(quest);
    }

    public Solution updateSolution(Solution solution) {
        return solutionRepository.save(solution);
    }

    public void deleteSolution(Long id) {
        solutionRepository.deleteById(id);
    }

    public void saveSolutionFiles(Solution solution, List<MultipartFile> files) {
        if (files != null && !files.isEmpty()) {
            List<SolutionFileDto> solutionFileDtos = solutionFileService.saveSolutionFiles(solution, files);
            solution.setFiles(solutionFileDtos.stream()
                    .map(fileDto -> fileDto.toEntity(solution)).collect(Collectors.toList()));
        }
    }
}