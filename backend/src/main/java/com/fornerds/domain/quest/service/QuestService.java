package com.fornerds.domain.quest.service;

import com.fornerds.domain.project.entity.Project;
import com.fornerds.domain.quest.dto.UserQuestDto;
import com.fornerds.domain.quest.entity.*;
import com.fornerds.domain.quest.repository.QuestPositionRepository;
import com.fornerds.domain.quest.repository.QuestRepository;
import com.fornerds.domain.quest.repository.RewardRepository;
import com.fornerds.domain.quest.repository.UserQuestRepository;
import com.fornerds.domain.user.entity.User;
import com.fornerds.global.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class QuestService {
    private final QuestRepository questRepository;
    private final UserQuestRepository userQuestRepository;
    private final QuestPositionRepository questPositionRepository;

    public QuestService(QuestRepository questRepository, UserQuestRepository userQuestRepository, QuestPositionRepository questPositionRepository) {
        this.questRepository = questRepository;
        this.userQuestRepository = userQuestRepository;
        this.questPositionRepository = questPositionRepository;
    }

    public Quest createQuest(Quest quest) {
        return questRepository.save(quest);
    }

    public Quest getQuestById(Long id) {
        return questRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Quest not found with id: " + id));
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

    public UserQuest joinQuest(Quest quest, User user) {
        UserQuest existingUserQuest = userQuestRepository.findByQuestIdAndUserId(quest.getId(), user.getId());
        if (existingUserQuest != null) return existingUserQuest;
        UserQuest userQuest = UserQuestDto.toEntity(user, quest);
        return userQuestRepository.save(userQuest);
    }

    public List<Quest> getQuestsByProjectAndDifficulty(Project project, Difficulty difficulty) {
        return questRepository.findByProjectAndDifficulty(project, difficulty);
    }

    public List<Quest> getQuestsByProjectAndPosition(Project project, Position position) {
        return questRepository.findByProjectAndPosition(project, position);
    }

    public List<Quest> findQuestsByProjectIdAndPosition(Long projectId, Position position) {
        List<Quest> quests = questRepository.findByProjectId(projectId);
        List<QuestPosition> questPositions = questPositionRepository.findByPosition(position);
        List<Long> questIdsWithPosition = questPositions.stream().map(QuestPosition::getQuest).map(Quest::getId).collect(Collectors.toList());
        return quests.stream().filter(quest -> questIdsWithPosition.contains(quest.getId())).collect(Collectors.toList());
    }

}
