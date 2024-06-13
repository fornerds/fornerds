package com.fornerds.domain.quest.dto;

import com.fornerds.domain.quest.entity.Quest;
import com.fornerds.domain.quest.entity.UserQuest;
import com.fornerds.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserQuestDto {
    private Long id;
    private Long userId;
    private Long questId;

    public UserQuestDto(UserQuest userQuest) {
        this.id = userQuest.getId();
        this.userId = userQuest.getUser().getId();
        this.questId = userQuest.getQuest().getId();
    }

    public static UserQuest toEntity(User user, Quest quest) {
        UserQuest userQuest = new UserQuest();
        userQuest.setUser(user);
        userQuest.setQuest(quest);
        return userQuest;
    }
}
