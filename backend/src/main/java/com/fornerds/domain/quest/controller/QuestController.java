package com.fornerds.domain.quest.controller;

import com.fornerds.domain.project.entity.Project;
import com.fornerds.domain.project.service.ProjectService;
import com.fornerds.domain.quest.dto.QuestDto;
import com.fornerds.domain.quest.entity.Quest;
import com.fornerds.domain.quest.service.QuestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/quests")
public class QuestController {
    private final QuestService questService;
    private final ProjectService projectService;

    public QuestController(QuestService questService, ProjectService projectService) {
        this.questService = questService;
        this.projectService = projectService;
    }

    @PostMapping
    public ResponseEntity<QuestDto> createQuest(@RequestBody QuestDto questDto) {
        Quest quest = questService.createQuest(questDto.toEntity());
        QuestDto responseDto = new QuestDto(quest);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuestDto> getQuestById(@PathVariable Long id) {
        Quest quest = questService.getQuestById(id);
        QuestDto responseDto = new QuestDto(quest);
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<QuestDto>> getQuestsByProject(@PathVariable Long projectId) {
        Project project = projectService.getProjectById(projectId);
        List<Quest> quests = questService.getQuestsByProject(project);
        List<QuestDto> responseDtos = quests.stream()
                .map(QuestDto::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseDtos);
    }

    @PutMapping("/{id}")
    public ResponseEntity<QuestDto> updateQuest(@PathVariable Long id, @RequestBody QuestDto questDto) {
        Quest quest = questService.getQuestById(id);
        quest.update(questDto);
        Quest updatedQuest = questService.updateQuest(quest);
        QuestDto responseDto = new QuestDto(updatedQuest);
        return ResponseEntity.ok(responseDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuest(@PathVariable Long id) {
        questService.deleteQuest(id);
        return ResponseEntity.noContent().build();
    }
}
