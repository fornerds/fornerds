-- 유저 생성
INSERT INTO users (email, password, name, nickname, phone_number, language, country, profile_image, bio, role, level, exp, point, cash, is_public, created_at, updated_at) VALUES
('user1@example.com', '$2a$10$fh.k.4qWVPAt.G754zY3u.I.g0f6xKGy3j15QFx5Z/bF/M3sH55i.', '사용자1', 'user1', '010-1111-1111', 'Korean', 'South Korea', 'https://example.com/profile1.png', '안녕하세요! 사용자1입니다.', 'USER', 1, 0, 0, 0, true, NOW(), NOW()),
('user2@example.com', '$2a$10$fh.k.4qWVPAt.G754zY3u.I.g0f6xKGy3j15QFx5Z/bF/M3sH55i.', '사용자2', 'user2', '010-2222-2222', 'English', 'United States', 'https://example.com/profile2.png', 'Hi, I am user2!', 'USER', 2, 100, 10, 0, true, NOW(), NOW()),
('user3@example.com', '$2a$10$fh.k.4qWVPAt.G754zY3u.I.g0f6xKGy3j15QFx5Z/bF/M3sH55i.', '사용자3', 'user3', '010-3333-3333', 'Japanese', 'Japan', 'https://example.com/profile3.png', 'こんにちは！ユーザー3です。', 'USER', 3, 500, 50, 100, true, NOW(), NOW()),
('user4@example.com', '$2a$10$fh.k.4qWVPAt.G754zY3u.I.g0f6xKGy3j15QFx5Z/bF/M3sH55i.', '사용자4', 'user4', '010-4444-4444', 'Chinese', 'China', 'https://example.com/profile4.png', '你好！我是用户4。', 'USER', 4, 1000, 100, 500, true, NOW(), NOW()),
('user5@example.com', '$2a$10$fh.k.4qWVPAt.G754zY3u.I.g0f6xKGy3j15QFx5Z/bF/M3sH55i.', '사용자5', 'user5', '010-5555-5555', 'Spanish', 'Spain', 'https://example.com/profile5.png', '¡Hola! Soy usuario5.', 'USER', 5, 2000, 200, 1000, true, NOW(), NOW()),
('user6@example.com', '$2a$10$fh.k.4qWVPAt.G754zY3u.I.g0f6xKGy3j15QFx5Z/bF/M3sH55i.', '사용자6', 'user6', '010-6666-6666', 'French', 'France', 'https://example.com/profile6.png', 'Bonjour ! Je suis utilisateur6.', 'USER', 1, 50, 5, 0, true, NOW(), NOW()),
('user7@example.com', '$2a$10$fh.k.4qWVPAt.G754zY3u.I.g0f6xKGy3j15QFx5Z/bF/M3sH55i.', '사용자7', 'user7', '010-7777-7777', 'German', 'Germany', 'https://example.com/profile7.png', 'Hallo! Ich bin Benutzer7.', 'USER', 2, 200, 20, 50, true, NOW(), NOW()),
('user8@example.com', '$2a$10$fh.k.4qWVPAt.G754zY3u.I.g0f6xKGy3j15QFx5Z/bF/M3sH55i.', '사용자8', 'user8', '010-8888-8888', 'Russian', 'Russia', 'https://example.com/profile8.png', 'Привет! Я пользователь8.', 'USER', 3, 700, 70, 200, true, NOW(), NOW()),
('user9@example.com', '$2a$10$fh.k.4qWVPAt.G754zY3u.I.g0f6xKGy3j15QFx5Z/bF/M3sH55i.', '사용자9', 'user9', '010-9999-9999', 'Portuguese', 'Brazil', 'https://example.com/profile9.png', 'Olá! Eu sou o usuário9.', 'USER', 4, 1500, 150, 700, true, NOW(), NOW()),
('user10@example.com', '$2a$10$fh.k.4qWVPAt.G754zY3u.I.g0f6xKGy3j15QFx5Z/bF/M3sH55i.', '사용자10', 'user10', '010-0000-0000', 'Arabic', 'Saudi Arabia', 'https://example.com/profile10.png', 'مرحبا! أنا المستخدم10.', 'USER', 5, 3000, 300, 1500, true, NOW(), NOW());

-- 프로젝트 생성
INSERT INTO project (title, status, description, introduction, key_learnings, requirements, deadline, estimated_duration, difficulty, scale, budget, developer_count, is_public, view_count, remaining_quests, created_at, updated_at) VALUES
('프로젝트1', 'IN_PROGRESS', '프로젝트1에 대한 설명입니다.', '프로젝트1 소개', '프로젝트1에서 배우는 것', '프로젝트1 요구사항', '2024-01-01', '2주', 'EASY', '소규모', 100000, 3, true, 100, 5, NOW(), NOW()),
('프로젝트2', 'COMPLETED', '프로젝트2에 대한 설명입니다.', '프로젝트2 소개', '프로젝트2에서 배우는 것', '프로젝트2 요구사항', '2023-12-01', '1주', 'MEDIUM', '중규모', 500000, 5, true, 200, 0, NOW(), NOW()),
('프로젝트3', 'IN_PROGRESS', '프로젝트3에 대한 설명입니다.', '프로젝트3 소개', '프로젝트3에서 배우는 것', '프로젝트3 요구사항', '2024-02-01', '3주', 'HARD', '대규모', 1000000, 7, true, 300, 10, NOW(), NOW()),
('프로젝트4', 'IN_PROGRESS', '프로젝트4에 대한 설명입니다.', '프로젝트4 소개', '프로젝트4에서 배우는 것', '프로젝트4 요구사항', '2024-03-01', '4주', 'EASY', '소규모', 200000, 2, true, 50, 2, NOW(), NOW()),
('프로젝트5', 'COMPLETED', '프로젝트5에 대한 설명입니다.', '프로젝트5 소개', '프로젝트5에서 배우는 것', '프로젝트5 요구사항', '2023-11-01', '2주', 'MEDIUM', '중규모', 700000, 6, true, 150, 0, NOW(), NOW()),
('프로젝트6', 'IN_PROGRESS', '프로젝트6에 대한 설명입니다.', '프로젝트6 소개', '프로젝트6에서 배우는 것', '프로젝트6 요구사항', '2024-04-01', '1주', 'HARD', '대규모', 1500000, 8, true, 250, 15, NOW(), NOW()),
('프로젝트7', 'IN_PROGRESS', '프로젝트7에 대한 설명입니다.', '프로젝트7 소개', '프로젝트7에서 배우는 것', '프로젝트7 요구사항', '2024-05-01', '3주', 'EASY', '소규모', 300000, 4, true, 80, 7, NOW(), NOW()),
('프로젝트8', 'COMPLETED', '프로젝트8에 대한 설명입니다.', '프로젝트8 소개', '프로젝트8에서 배우는 것', '프로젝트8 요구사항', '2023-10-01', '2주', 'MEDIUM', '중규모', 900000, 3, true, 120, 0, NOW(), NOW()),
('프로젝트9', 'IN_PROGRESS', '프로젝트9에 대한 설명입니다.', '프로젝트9 소개', '프로젝트9에서 배우는 것', '프로젝트9 요구사항', '2024-06-01', '4주', 'HARD', '대규모', 2000000, 9, true, 350, 20, NOW(), NOW()),
('프로젝트10', 'IN_PROGRESS', '프로젝트10에 대한 설명입니다.', '프로젝트10 소개', '프로젝트10에서 배우는 것', '프로젝트10 요구사항', '2024-07-01', '2주', 'EASY', '소규모', 400000, 5, true, 90, 12, NOW(), NOW());

-- 퀘스트 생성
INSERT INTO quest (title, status, description, convention, requirements, goal, input_example, output_example, example_explanation, api_url, start_date, end_date, deadline, difficulty, budget, developer_count, scale, reward_cash, reward_exp, reward_point, is_public, view_count, like_count, key_learnings, estimated_duration, project_id, position, created_at, updated_at)
VALUES
('퀘스트1', 'IN_PROGRESS', '퀘스트1 설명', '컨벤션1', '요구사항1', '목표1', '입력 예시1', '출력 예시1', '예시 설명1', 'https://api.example.com/v1/quest1', NOW(), '2024-01-15', '2024-01-15', 'EASY', 10000, 1, '소규모', 1000, 100, 10, true, 10, 5, '핵심 내용1', 1, 1, 'FrontEnd', NOW(), NOW()),
('퀘스트2', 'COMPLETED', '퀘스트2 설명', '컨벤션2', '요구사항2', '목표2', '입력 예시2', '출력 예시2', '예시 설명2', 'https://api.example.com/v1/quest2', '2023-12-15', '2023-12-31', '2023-12-31', 'MEDIUM', 20000, 2, '중규모', 2000, 200, 20, true, 20, 10, '핵심 내용2', 2, 2, 'BackEnd', NOW(), NOW()),
('퀘스트3', 'IN_PROGRESS', '퀘스트3 설명', '컨벤션3', '요구사항3', '목표3', '입력 예시3', '출력 예시3', '예시 설명3', 'https://api.example.com/v1/quest3', NOW(), '2024-02-15', '2024-02-15', 'HARD', 30000, 3, '대규모', 3000, 300, 30, true, 30, 15, '핵심 내용3', 3, 3, 'Designer', NOW(), NOW()),
('퀘스트4', 'IN_PROGRESS', '퀘스트4 설명', '컨벤션4', '요구사항4', '목표4', '입력 예시4', '출력 예시4', '예시 설명4', 'https://api.example.com/v1/quest4', NOW(), '2024-03-15', '2024-03-15', 'EASY', 15000, 1, '소규모', 1500, 150, 15, true, 15, 7, '핵심 내용4', 1, 4, 'etc', NOW(), NOW()),
('퀘스트5', 'COMPLETED', '퀘스트5 설명', '컨벤션5', '요구사항5', '목표5', '입력 예시5', '출력 예시5', '예시 설명5', 'https://api.example.com/v1/quest5', '2023-11-15', '2023-11-30', '2023-11-30', 'MEDIUM', 25000, 2, '중규모', 2500, 250, 25, true, 25, 12, '핵심 내용5', 2, 5, 'FrontEnd', NOW(), NOW()),
('퀘스트6', 'IN_PROGRESS', '퀘스트6 설명', '컨벤션6', '요구사항6', '목표6', '입력 예시6', '출력 예시6', '예시 설명6', 'https://api.example.com/v1/quest6', NOW(), '2024-04-15', '2024-04-15', 'HARD', 35000, 3, '대규모', 3500, 350, 35, true, 35, 17, '핵심 내용6', 3, 6, 'BackEnd', NOW(), NOW()),
('퀘스트7', 'IN_PROGRESS', '퀘스트7 설명', '컨벤션7', '요구사항7', '목표7', '입력 예시7', '출력 예시7', '예시 설명7', 'https://api.example.com/v1/quest7', NOW(), '2024-05-15', '2024-05-15', 'EASY', 20000, 1, '소규모', 2000, 200, 20, true, 20, 9, '핵심 내용7', 1, 7, 'Designer', NOW(), NOW()),
('퀘스트8', 'COMPLETED', '퀘스트8 설명', '컨벤션8', '요구사항8', '목표8', '입력 예시8', '출력 예시8', '예시 설명8', 'https://api.example.com/v1/quest8', '2023-10-15', '2023-10-31', '2023-10-31', 'MEDIUM', 30000, 2, '중규모', 3000, 300, 30, true, 30, 14, '핵심 내용8', 2, 8, 'etc', NOW(), NOW()),
('퀘스트9', 'IN_PROGRESS', '퀘스트9 설명', '컨벤션9', '요구사항9', '목표9', '입력 예시9', '출력 예시9', '예시 설명9', 'https://api.example.com/v1/quest9', NOW(), '2024-06-15', '2024-06-15', 'HARD', 40000, 3, '대규모', 4000, 400, 40, true, 40, 19, '핵심 내용9', 3, 9, 'FrontEnd', NOW(), NOW()),
('퀘스트10', 'IN_PROGRESS', '퀘스트10 설명', '컨벤션10', '요구사항10', '목표10', '입력 예시10', '출력 예시10', '예시 설명10', 'https://api.example.com/v1/quest10', NOW(), '2024-07-15', '2024-07-15', 'EASY', 25000, 1, '소규모', 2500, 250, 25, true, 25, 11, '핵심 내용10', 1, 10, 'BackEnd', NOW(), NOW());

-- 솔루션 생성
INSERT INTO solution (repository_url, status, feedback, memory_usage, execution_time, like_count, view_count, created_at, updated_at, quest_id, user_id) VALUES
('https://github.com/user1/solution1', 'ACCEPTED', '잘했습니다!', 1024, 1000, 10, 100, NOW(), NOW(), 1, 1),
('https://github.com/user2/solution2', 'REJECTED', '개선이 필요합니다.', 2048, 2000, 5, 50, NOW(), NOW(), 2, 2),
('https://github.com/user3/solution3', 'SUBMITTED', NULL, NULL, NULL, 0, 10, NOW(), NOW(), 3, 3),
('https://github.com/user4/solution4', 'PENDING', NULL, NULL, NULL, 2, 20, NOW(), NOW(), 4, 4),
('https://github.com/user5/solution5', 'ACCEPTED', '훌륭합니다!', 512, 500, 15, 150, NOW(), NOW(), 5, 5),
('https://github.com/user6/solution6', 'REJECTED', '다시 시도해보세요.', 4096, 4000, 3, 30, NOW(), NOW(), 6, 6),
('https://github.com/user7/solution7', 'SUBMITTED', NULL, NULL, NULL, 1, 15, NOW(), NOW(), 7, 7),
('https://github.com/user8/solution8', 'PENDING', NULL, NULL, NULL, 7, 70, NOW(), NOW(), 8, 8),
('https://github.com/user9/solution9', 'ACCEPTED', '완벽합니다!', 256, 250, 20, 200, NOW(), NOW(), 9, 9),
('https://github.com/user10/solution10', 'REJECTED', '아쉽네요.', 8192, 8000, 1, 10, NOW(), NOW(), 10, 10);

-- 토론 생성
INSERT INTO discussion (content, like_count, created_at, updated_at, quest_id, user_id) VALUES
('토론1 내용', 10, NOW(), NOW(), 1, 1),
('토론2 내용', 5, NOW(), NOW(), 2, 2),
('토론3 내용', 15, NOW(), NOW(), 3, 3),
('토론4 내용', 20, NOW(), NOW(), 4, 4),
('토론5 내용', 8, NOW(), NOW(), 5, 5),
('토론6 내용', 3, NOW(), NOW(), 6, 6),
('토론7 내용', 12, NOW(), NOW(), 7, 7),
('토론8 내용', 18, NOW(), NOW(), 8, 8),
('토론9 내용', 25, NOW(), NOW(), 9, 9),
('토론10 내용', 6, NOW(), NOW(), 10, 10);

-- 토론 댓글 생성
INSERT INTO discussion_comment (content, like_count, created_at, updated_at, discussion_id, user_id, parent_discussion_comment_id) VALUES
('댓글1 내용', 5, NOW(), NOW(), 1, 2, NULL),
('댓글2 내용', 10, NOW(), NOW(), 2, 3, NULL),
('댓글3 내용', 3, NOW(), NOW(), 3, 4, NULL),
('댓글4 내용', 7, NOW(), NOW(), 4, 5, NULL),
('댓글5 내용', 12, NOW(), NOW(), 5, 6, NULL),
('댓글6 내용', 1, NOW(), NOW(), 6, 7, NULL),
('댓글7 내용', 9, NOW(), NOW(), 7, 8, NULL),
('댓글8 내용', 15, NOW(), NOW(), 8, 9, NULL),
('댓글9 내용', 4, NOW(), NOW(), 9, 10, NULL),
('댓글10 내용', 11, NOW(), NOW(), 10, 1, NULL),
('대댓글1 내용', 2, NOW(), NOW(), 1, 3, 1),
('대댓글2 내용', 4, NOW(), NOW(), 2, 4, 2),
('대댓글3 내용', 1, NOW(), NOW(), 3, 5, 3);

-- 피드백 생성
INSERT INTO feedback (content, created_at, updated_at, solution_id) VALUES
('피드백1 내용', NOW(), NOW(), 1),
('피드백2 내용', NOW(), NOW(), 2),
('피드백3 내용', NOW(), NOW(), 3),
('피드백4 내용', NOW(), NOW(), 4),
('피드백5 내용', NOW(), NOW(), 5),
('피드백6 내용', NOW(), NOW(), 6),
('피드백7 내용', NOW(), NOW(), 7),
('피드백8 내용', NOW(), NOW(), 8),
('피드백9 내용', NOW(), NOW(), 9),
('피드백10 내용', NOW(), NOW(), 10);

-- 보상 생성
INSERT INTO reward (reward_type, reward_amount, created_at, updated_at, quest_id) VALUES
('CASH', 1000, NOW(), NOW(), 1),
('EXP', 100, NOW(), NOW(), 1),
('POINT', 10, NOW(), NOW(), 1),
('CASH', 2000, NOW(), NOW(), 2),
('EXP', 200, NOW(), NOW(), 2),
('POINT', 20, NOW(), NOW(), 2),
('CASH', 3000, NOW(), NOW(), 3),
('EXP', 300, NOW(), NOW(), 3),
('POINT', 30, NOW(), NOW(), 3);

-- 유저 퀘스트 생성
INSERT INTO user_quest (user_id, quest_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10);

-- 퀘스트 포지션 생성
INSERT INTO quest_position (quest_id, position) VALUES
(1, 'FrontEnd'),
(2, 'BackEnd'),
(3, 'Designer'),
(4, 'etc'),
(5, 'FrontEnd'),
(6, 'BackEnd'),
(7, 'Designer'),
(8, 'etc'),
(9, 'FrontEnd'),
(10, 'BackEnd');

-- 프로젝트 통계 생성
INSERT INTO project_statistics (start_date, end_date, total_developers, completion_rate, average_difficulty, average_duration, interval_unit, project_id) VALUES
('2023-12-01', '2023-12-31', 10, 100.0, 2.5, 14, 'DAY', 1),
('2023-11-01', '2023-11-30', 8, 100.0, 2.0, 7, 'DAY', 2),
('2023-10-01', '2023-10-31', 12, 100.0, 3.0, 21, 'DAY', 3);

-- 솔루션 파일 생성
INSERT INTO solution_file (path, file_name, file_size, solution_id) VALUES
('/uploads/solutions/1/solution1.zip', 'solution1.zip', 1024, 1),
('/uploads/solutions/2/solution2.pdf', 'solution2.pdf', 2048, 2),
('/uploads/solutions/3/solution3.jpg', 'solution3.jpg', 512, 3);

-- 유저 레벨 생성
INSERT INTO user_level (level, exp, created_at, updated_at, user_id) VALUES
(1, 0, NOW(), NOW(), 1),
(2, 100, NOW(), NOW(), 2),
(3, 500, NOW(), NOW(), 3),
(4, 1000, NOW(), NOW(), 4),
(5, 2000, NOW(), NOW(), 5),
(1, 50, NOW(), NOW(), 6),
(2, 200, NOW(), NOW(), 7),
(3, 700, NOW(), NOW(), 8),
(4, 1500, NOW(), NOW(), 9),
(5, 3000, NOW(), NOW(), 10);