package com.fornerds.domain.solution.service;

import com.fornerds.domain.quest.entity.Quest;
import com.fornerds.domain.solution.entity.Solution;
import com.fornerds.domain.solution.repository.SolutionRepository;
import com.fornerds.global.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class SolutionService {
    private final SolutionRepository solutionRepository;

    public SolutionService(SolutionRepository solutionRepository) {
        this.solutionRepository = solutionRepository;
    }

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
}