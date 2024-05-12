package com.fornerds.service;

import com.fornerds.entity.Project;
import com.fornerds.entity.Quest;
import com.fornerds.repository.QuestRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class QuestService {
    private final QuestRepository questRepository;
    
    public QuestService(QuestRepository questRepository) {
        this.questRepository = questRepository;
    }
    
    public Quest createQuest(Quest quest) {
        // 퀘스트 생성 로직 구현
        return quest;
    }
    
    public Quest getQuestById(Long id) {
        // 퀘스트 조회 로직 구현
        return null;
    }
    
    public List<Quest> getQuestsByProject(Project project) {
        // 특정 프로젝트의 퀘스트 목록 조회 로직 구현
        return List.of();
    }
    
    public Quest updateQuest(Quest quest) {
        // 퀘스트 정보 수정 로직 구현
        return quest;
    }
    
    public void deleteQuest(Long id) {
        // 퀘스트 삭제 로직 구현
    }
    
    // 추가적인 로직 구현
}
