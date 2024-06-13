package com.fornerds.domain.quest.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "quest_position")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuestPosition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quest_id")
    private Quest quest;

    @Enumerated(EnumType.STRING)
    private Position position;
}
