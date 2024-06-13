package com.fornerds;

import com.fornerds.domain.project.entity.Difficulty;
import com.fornerds.domain.project.entity.Project;
import com.fornerds.domain.project.entity.ProjectStatus;
import com.fornerds.domain.project.service.ProjectService;
import com.fornerds.domain.quest.dto.QuestDto;
import com.fornerds.domain.quest.entity.Quest;
import com.fornerds.domain.quest.entity.QuestStatus;
import com.fornerds.domain.quest.service.QuestService;
import com.fornerds.domain.user.dto.UserDto;
import com.fornerds.domain.user.entity.User;
import com.fornerds.domain.user.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class QuestControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private QuestService questService;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private UserService userService;

    private User user;
    private Project project;

    @BeforeEach
    void setUp() {
        Project projectEntity = new Project();
        projectEntity.setTitle("Test Project");
        projectEntity.setStatus(ProjectStatus.IN_PROGRESS);
        projectEntity.setDescription("Test Description");
        projectEntity.setIntroduction("Test Introduction");
        projectEntity.setKeyLearnings("Test Key Learnings");
        projectEntity.setRequirements("Test Requirements");
        projectEntity.setDeadline(LocalDateTime.now().plusDays(30));
        projectEntity.setEstimatedDuration("1 Month");
        projectEntity.setDifficulty(Difficulty.MEDIUM);
        projectEntity.setScale("Small");
        projectEntity.setBudget(1000);
        projectEntity.setDeveloperCount(5);
        projectEntity.setPublic(true);
        projectEntity.setViewCount(0);
        projectEntity.setRemainingQuests(5);
        project = projectService.createProject(projectEntity);
    }

    @Test
    void testCreateQuest() {
        QuestDto questDto = new QuestDto();
        questDto.setTitle("Test Quest");
        questDto.setStatus(QuestStatus.IN_PROGRESS);
        questDto.setDescription("Test Quest Description");
        questDto.setConvention("Test Convention");
        questDto.setRequirements("Test Requirements");
        questDto.setGoal("Test Goal");
        questDto.setInputExample("Test Input");
        questDto.setOutputExample("Test Output");
        questDto.setExampleExplanation("Test Explanation");
        questDto.setApiUrl("Test API");
        questDto.setStartDate(LocalDateTime.now());
        questDto.setEndDate(LocalDateTime.now().plusDays(7));
        questDto.setDeadline(LocalDateTime.now().plusDays(30));
        questDto.setDifficulty(com.fornerds.domain.quest.entity.Difficulty.MEDIUM);
        questDto.setBudget(1000);
        questDto.setDeveloperCount(5);
        questDto.setScale("Small");
        questDto.setRewardCash(100);
        questDto.setRewardExp(100);
        questDto.setRewardPoint(100);
        questDto.setPublic(true);
        questDto.setViewCount(0);
        questDto.setLikeCount(0);
        questDto.setKeyLearnings("Test Key Learnings");
        questDto.setEstimatedDuration(10);
        questDto.setProject(project);

        Quest quest = questService.createQuest(questDto.toEntity());

        ResponseEntity<QuestDto> responseEntity = restTemplate.postForEntity("http://localhost:" + port + "/api/quests", questDto, QuestDto.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(responseEntity.getBody()).isNotNull();
        assertThat(responseEntity.getBody().getTitle()).isEqualTo("Test Quest");
    }

    @Test
    void testGetQuestById() {
        QuestDto questDto = new QuestDto();
        questDto.setTitle("Test Quest");
        questDto.setStatus(QuestStatus.IN_PROGRESS);
        questDto.setDescription("Test Quest Description");
        questDto.setConvention("Test Convention");
        questDto.setRequirements("Test Requirements");
        questDto.setGoal("Test Goal");
        questDto.setInputExample("Test Input");
        questDto.setOutputExample("Test Output");
        questDto.setExampleExplanation("Test Explanation");
        questDto.setApiUrl("Test API");
        questDto.setStartDate(LocalDateTime.now());
        questDto.setEndDate(LocalDateTime.now().plusDays(7));
        questDto.setDeadline(LocalDateTime.now().plusDays(30));
        questDto.setDifficulty(com.fornerds.domain.quest.entity.Difficulty.MEDIUM);
        questDto.setBudget(1000);
        questDto.setDeveloperCount(5);
        questDto.setScale("Small");
        questDto.setRewardCash(100);
        questDto.setRewardExp(100);
        questDto.setRewardPoint(100);
        questDto.setPublic(true);
        questDto.setViewCount(0);
        questDto.setLikeCount(0);
        questDto.setKeyLearnings("Test Key Learnings");
        questDto.setEstimatedDuration(10);
        questDto.setProject(project);

        Quest quest = questService.createQuest(questDto.toEntity());

        ResponseEntity<QuestDto> responseEntity = restTemplate.getForEntity("http://localhost:" + port + "/api/quests/" + quest.getId(), QuestDto.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody()).isNotNull();
        assertThat(responseEntity.getBody().getTitle()).isEqualTo("Test Quest");
    }
}
