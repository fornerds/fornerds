import React, { useState } from 'react'
import styles from './Discussion.module.css'
import { Comment } from '../../../../../../../components/ModuleComponent/Comment'
import { CommentInput } from '../../../../../../../components/ModuleComponent/CommentInput'

const dummyComments = [
  {
    id: 1,
    content: 'Lorem ipsum dolor sit amet consectetur. Amet nulla auctor semper a varius. Aenean blandit lectus arcu faucibus. Convallis tortor nullam tincidunt turpis accumsan. In risus ac ullamcorper cum ornare volutpat sed..',
    likeCount: 235,
    createdAt: '2024-01-24',
    updatedAt: null,
    deletedAt: null,
    quest_id: 1,
    user_id: 1,
    reply: [
      {
        id: 101,
        content: 'Reply to comment 1',
        likeCount: 50,
        createdAt: '2024-01-24',
        updatedAt: null,
        deletedAt: null,
        quest_id: 1,
        user_id: 2
      },
      {
        id: 102,
        content: 'Another reply to comment 1',
        likeCount: 20,
        createdAt: '2024-01-25',
        updatedAt: null,
        deletedAt: null,
        quest_id: 1,
        user_id: 3
      }
    ]
  },
  {
    id: 2,
    content: 'Another comment example.',
    likeCount: 150,
    createdAt: '2024-01-25',
    updatedAt: null,
    deletedAt: null,
    quest_id: 2,
    user_id: 3,
    reply: []
  },
  {
    id: 3,
    content: 'Third comment with some replies.',
    likeCount: 120,
    createdAt: '2024-01-26',
    updatedAt: null,
    deletedAt: null,
    quest_id: 3,
    user_id: 4,
    reply: [
      {
        id: 103,
        content: 'Reply to comment 3',
        likeCount: 30,
        createdAt: '2024-01-27',
        updatedAt: null,
        deletedAt: null,
        quest_id: 3,
        user_id: 5
      }
    ]
  },
  {
    id: 4,
    content: 'Fourth comment example.',
    likeCount: 80,
    createdAt: '2024-01-28',
    updatedAt: null,
    deletedAt: null,
    quest_id: 4,
    user_id: 6,
    reply: []
  },
  {
    id: 5,
    content: 'Fifth comment without replies.',
    likeCount: 95,
    createdAt: '2024-01-29',
    updatedAt: null,
    deletedAt: null,
    quest_id: 5,
    user_id: 7,
    reply: []
  },
  {
    id: 6,
    content: 'Sixth comment example.',
    likeCount: 110,
    createdAt: '2024-01-30',
    updatedAt: null,
    deletedAt: null,
    quest_id: 6,
    user_id: 8,
    reply: []
  },
  {
    id: 7,
    content: 'Seventh comment with replies.',
    likeCount: 130,
    createdAt: '2024-01-31',
    updatedAt: null,
    deletedAt: null,
    quest_id: 7,
    user_id: 9,
    reply: [
      {
        id: 104,
        content: 'Reply to comment 7',
        likeCount: 40,
        createdAt: '2024-02-01',
        updatedAt: null,
        deletedAt: null,
        quest_id: 7,
        user_id: 10
      },
      {
        id: 105,
        content: 'Another reply to comment 7',
        likeCount: 25,
        createdAt: '2024-02-02',
        updatedAt: null,
        deletedAt: null,
        quest_id: 7,
        user_id: 11
      }
    ]
  }
]

export function Discussion() {
  const [comments, setComments] = useState(dummyComments)

  return (
    <div className={styles.contents_box}>
      <div className={styles.left_box}>
        <div className={styles.discussion_box}>
          <CommentInput />
          <div className={styles.comments}>
            {comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </div>
          <div className={styles.load_more}></div>
        </div>
      </div>
      <div className={styles.right_box}>
        <div className={styles.popular_discussion}>
          <p>Popular discussion</p> </div>
        <div className={styles.popularCommentsList}>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  )
}
