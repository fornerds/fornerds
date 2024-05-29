package com.fornerds.domain.solution.controller;

import com.fornerds.domain.quest.entity.Quest;
import com.fornerds.domain.quest.service.QuestService;
import com.fornerds.domain.solution.dto.SolutionDto;
import com.fornerds.domain.solution.entity.Solution;
import com.fornerds.domain.solution.service.SolutionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/solutions")
public class SolutionController {
    private final SolutionService solutionService;
    private final QuestService questService;

    public SolutionController(SolutionService solutionService, QuestService questService) {
        this.solutionService = solutionService;
        this.questService = questService;
    }

    @PostMapping
    public ResponseEntity<SolutionDto> createSolution(@RequestBody SolutionDto solutionDto) {
        Solution solution = solutionService.createSolution(solutionDto.toEntity());
        SolutionDto responseDto = new SolutionDto(solution);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SolutionDto> getSolutionById(@PathVariable Long id) {
        Solution solution = solutionService.getSolutionById(id);
        SolutionDto responseDto = new SolutionDto(solution);
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/quest/{questId}")
    public ResponseEntity<List<SolutionDto>> getSolutionsByQuest(@PathVariable Long questId) {
        Quest quest = questService.getQuestById(questId);
        List<Solution> solutions = solutionService.getSolutionsByQuest(quest);
        List<SolutionDto> responseDtos = solutions.stream()
                .map(SolutionDto::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseDtos);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SolutionDto> updateSolution(@PathVariable Long id, @RequestBody SolutionDto solutionDto) {
        Solution solution = solutionService.getSolutionById(id);
        solution.update(solutionDto);
        Solution updatedSolution = solutionService.updateSolution(solution);
        SolutionDto responseDto = new SolutionDto(updatedSolution);
        return ResponseEntity.ok(responseDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSolution(@PathVariable Long id) {
        solutionService.deleteSolution(id);
        return ResponseEntity.noContent().build();
    }
}