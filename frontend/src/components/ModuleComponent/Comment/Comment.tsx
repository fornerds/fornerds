import React, { useState } from 'react'
import styles from './Comment.module.css'
import { CommentInput } from '../CommentInput'


interface Reply {
  id: number
  content: string
  likeCount: number
  createdAt: string
  updatedAt: string | null
  deletedAt: string | null
  quest_id: number
  user_id: number
}

interface CommentProps {
  id: number
  content: string
  likeCount: number
  createdAt: string
  updatedAt: string | null
  deletedAt: string | null
  quest_id: number
  user_id: number
  reply: Reply[]
}

interface Props {
  comment: CommentProps
}

export function Comment({ comment }: Props) {
  const [showReplies, setShowReplies] = useState(false)

  const toggleReplies = () => {
    setShowReplies(!showReplies)
  }

  return (
    <div className={styles.discussion}>
      <div className={styles.comment}>
        <div className={styles.nameBox}>
          <div className={styles.character}></div>
          <div className={styles.name}> Name </div>
          <div className={styles.editBox}>
            <div className={styles.edit}>
              <div className={styles.editIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none">
                  <path d="M13.9808 2.80618C14.1843 2.56552 14.4359 2.36964 14.7197 2.231C15.0035 2.09236 15.3132 2.01403 15.6291 2.00097C15.9451 1.98792 16.2603 2.04045 16.5546 2.1552C16.849 2.26995 17.1161 2.44441 17.3389 2.66747C17.5617 2.89052 17.7353 3.15727 17.8487 3.45071C17.9621 3.74416 18.0127 4.05786 17.9973 4.37183C17.982 4.6858 17.901 4.99314 17.7595 5.27427C17.6181 5.5554 17.4193 5.80416 17.1757 6.00468L6.39298 16.7996L2 17.999L3.19808 13.6011L13.9808 2.80618Z" stroke="#1890FF" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div className={styles.editText}>Edit</div>
            </div>
            <div className={styles.edit}>
              <div className={styles.editIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none">
                  <path d="M12.2837 7.5L11.9952 15M8.00481 15L7.71635 7.5M16.023 4.82547C16.308 4.86851 16.592 4.91456 16.875 4.96358M16.023 4.82547L15.1332 16.3938C15.058 17.3707 14.2434 18.125 13.2637 18.125H6.73631C5.75655 18.125 4.94198 17.3707 4.86683 16.3938L3.97696 4.82547M16.023 4.82547C15.0677 4.6812 14.1013 4.57071 13.125 4.49527M3.125 4.96358C3.40798 4.91456 3.69198 4.86851 3.97696 4.82547M3.97696 4.82547C4.93231 4.6812 5.89874 4.57071 6.875 4.49527M13.125 4.49527V3.73182C13.125 2.74902 12.3661 1.92853 11.3838 1.8971C10.9244 1.8824 10.463 1.875 10 1.875C9.53696 1.875 9.07565 1.8824 8.61618 1.8971C7.63388 1.92853 6.875 2.74902 6.875 3.73182V4.49527M13.125 4.49527C12.0938 4.41558 11.0516 4.375 10 4.375C8.94836 4.375 7.9062 4.41558 6.875 4.49527" stroke="#1890FF" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div className={styles.editText}>Delete</div>
            </div>
          </div>
        </div>
        <div className={styles.text}>{comment.content}</div>
        <div className={styles.downBox}>
          <div className={styles.interactions}>
            <div className={styles.replyBox}>
              <div
                className={styles.reply}
                onClick={toggleReplies}
                role="button"
                tabIndex={0}
              >
                Reply ({comment.reply.length})
              </div>
            </div>
            <div className={styles.likeBox}></div>
            <div className={styles.likes}>{comment.likeCount}</div>F
          </div>
          <div className={styles.date}>{comment.createdAt}</div>
        </div>
      </div>
      {showReplies && (
        <div className={styles.reply}>
          {comment.reply.map((reply) => (
            <div className={styles.comment}>
              <div className={styles.avatar}></div>
              <div className={styles.content}>
                <div className={styles.name}>Name</div>
                <div className={styles.text}>{reply.content}</div>
                <div className={styles.footer}>
                  <div className={styles.likes}>{reply.likeCount}</div>
                  <div className={styles.date}>{reply.createdAt}</div>
                </div>
              </div>
            </div>
          ))}
          <CommentInput />
        </div>
      )}
    </div>

  )
}
