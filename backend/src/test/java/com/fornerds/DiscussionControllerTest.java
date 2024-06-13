package com.fornerds;

import com.fornerds.domain.discussion.dto.DiscussionDto;
import com.fornerds.domain.discussion.entity.Discussion;
import com.fornerds.domain.discussion.service.DiscussionService;
import com.fornerds.domain.project.entity.Project;
import com.fornerds.domain.project.entity.ProjectStatus;
import com.fornerds.domain.project.service.ProjectService;
import com.fornerds.domain.quest.dto.QuestDto;
import com.fornerds.domain.quest.entity.Quest;
import com.fornerds.domain.quest.entity.QuestStatus;
import com.fornerds.domain.quest.service.QuestService;
import com.fornerds.domain.user.entity.User;
import com.fornerds.domain.user.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class DiscussionControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Mock
    private DiscussionService discussionService;

    @Mock
    private QuestService questService;

    @Mock
    private UserService userService;

    @Mock
    private ProjectService projectService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private Quest quest;
    private User user;
    private Project project;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        user = new User();
        user.setId(20L); // 임시 사용자 설정

        project = new Project();
        project.setTitle("Test Project");
        project.setStatus(ProjectStatus.IN_PROGRESS);
        project.setDescription("Test Description");
        project.setIntroduction("Test Introduction");
        project.setKeyLearnings("Test Key Learnings");
        project.setRequirements("Test Requirements");
        project.setDeadline(LocalDateTime.now().plusDays(30));
        project.setEstimatedDuration("1 Month");
        project.setDifficulty(com.fornerds.domain.project.entity.Difficulty.MEDIUM);
        project.setScale("Small");
        project.setBudget(1000);
        project.setDeveloperCount(5);
        project.setPublic(true);
        project.setViewCount(0);
        project.setRemainingQuests(5);

        when(projectService.createProject(any(Project.class))).thenReturn(project);

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

        quest = questDto.toEntity();

        when(questService.createQuest(any(Quest.class))).thenReturn(quest);
        when(userService.getUserById(16L)).thenReturn(user); // Mock UserService 응답 설정
    }

    @Test
    void testCreateDiscussion() {
        DiscussionDto discussionDto = new DiscussionDto();
        discussionDto.setContent("Test Discussion");
        discussionDto.setQuestId(quest.getId());
        discussionDto.setUserId(user.getId());

        Discussion discussion = discussionDto.toEntity();
        when(discussionService.createDiscussion(any(Discussion.class))).thenReturn(discussion);

        ResponseEntity<DiscussionDto> responseEntity = restTemplate.postForEntity("http://localhost:" + port + "/api/discussions", discussionDto, DiscussionDto.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(responseEntity.getBody()).isNotNull();
        assertThat(responseEntity.getBody().getContent()).isEqualTo("Test Discussion");
    }

    @Test
    void testGetDiscussionById() {
        DiscussionDto discussionDto = new DiscussionDto();
        discussionDto.setContent("Test Discussion");
        discussionDto.setQuestId(quest.getId());
        discussionDto.setUserId(user.getId());
        Discussion discussion = discussionDto.toEntity();

        when(discussionService.getDiscussionById(anyLong())).thenReturn(discussion);

        ResponseEntity<DiscussionDto> responseEntity = restTemplate.getForEntity("http://localhost:" + port + "/api/discussions/" + discussion.getId(), DiscussionDto.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody()).isNotNull();
        assertThat(responseEntity.getBody().getContent()).isEqualTo("Test Discussion");
    }
}
