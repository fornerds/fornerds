package com.fornerds.controller;

import com.fornerds.dto.QuestDto;
import com.fornerds.service.QuestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quests")
public class QuestController {
    private final QuestService questService;
    
    public QuestController(QuestService questService) {
        this.questService = questService;
    }
    
    @PostMapping
    public ResponseEntity<QuestDto> createQuest(@RequestBody QuestDto questDto) {
        // 퀘스트 생성 API 구현
        return null;
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<QuestDto> getQuestById(@PathVariable Long id) {
        // 퀘스트 조회 API 구현
        return null;
    }
    
    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<QuestDto>> getQuestsByProject(@PathVariable Long projectId) {
        // 특정 프로젝트의 퀘스트 목록 조회 API 구현
        return null;
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<QuestDto> updateQuest(@PathVariable Long id, @RequestBody QuestDto questDto) {
        // 퀘스트 정보 수정 API 구현
        return null;
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuest(@PathVariable Long id) {
        // 퀘스트 삭제 API 구현
        return null;
    }
    
    // 추가적인 API 구현
}
