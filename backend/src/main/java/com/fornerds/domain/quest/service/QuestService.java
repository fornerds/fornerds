package com.fornerds.domain.quest.service;

import com.fornerds.domain.project.entity.Project;
import com.fornerds.domain.quest.entity.Quest;
import com.fornerds.domain.quest.repository.QuestRepository;
import com.fornerds.global.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class QuestService {
    private final QuestRepository questRepository;

    public QuestService(QuestRepository questRepository) {
        this.questRepository = questRepository;
    }

    public Quest createQuest(Quest quest) {
        return questRepository.save(quest);
    }

    public Quest getQuestById(Long id) {
        return questRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Quest not found with id: " + id));
    }

    public List<Quest> getQuestsByProject(Project project) {
        return questRepository.findByProject(project);
    }

    public Quest updateQuest(Quest quest) {
        return questRepository.save(quest);
    }

    public void deleteQuest(Long id) {
        questRepository.deleteById(id);
    }
}
