import React, { useState } from 'react'
import styles from './Comment.module.css'
import { CommentInput } from '../CommentInput'
import { Input } from '../../AtomComponent'

interface Reply {
  id: number
  content: string
  likeCount: number
  createdAt: string
  updatedAt: string | null
  deletedAt: string | null
  quest_id: number
  user_id: string
}

export interface CommentProps {
  id: number
  content: string
  likeCount: number
  createdAt: string
  updatedAt: string | null
  deletedAt: string | null
  quest_id: number
  user_id: string
  replyData: Reply[]
}

interface UserProfile {
  id: string;
  email: string;
  password: string;
  name: string;
  nickname: string;
  phoneNumber: string;
  language: string;
  country: string;
  profileImage: string;
  bio: string;
  role: string;
  level: number;
  exp: number;
  point: number;
  cash: number;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface Props {
  commentData: CommentProps
  currentUser: UserProfile // 현재 로그인한 사용자의 정보를 prop으로 받음
  updateComment: (updatedComment: CommentProps) => void;
  deleteComment: (commentId: number) => void;
  hideEditDelete: Boolean
}

export function Comment({ 
  commentData, 
  currentUser, 
  updateComment, 
  deleteComment,
  hideEditDelete = false}: Props) {
  const [showReplies, setShowReplies] = useState(false) // 대댓글 표시 상태
  const [editingCommentId, setEditingCommentId] = useState<{ commentId: number | null; replyId: number | null }>({ commentId: null, replyId: null }); // 수정시 대상의 ID확인
  const [editedContent, setEditedContent] = useState<string>(''); // 댓글 수정 내용

  const toggleReplies = () => {
    setShowReplies(!showReplies)
  }

  // 현재 사용자가 comment 또는 reply의 작성자인지 확인하는 함수
  const isCurrentUser = (userId: string) => {
    return userId === currentUser.id
  }

  // Edit버튼 클릭시 동작
  const handleEditClick = (commentId: number, replyId: number | null = null) => {
    setEditingCommentId({ commentId, replyId });
    setEditedContent(replyId ? commentData.replyData.find(reply => reply.id === replyId)?.content || '' : commentData.content);
    console.log(`현재 commentID는 ${commentId}의 Edit버튼 클릭!`)
    console.log(`현재 replyID는 ${replyId}의 Edit버튼 클릭!`)
  };

  // Save버튼 클릭시 동작
  const handleSaveClick = () => {
    console.log(`Save 버튼 클릭!`)
    if (editingCommentId.replyId) {
      const updatedReplyData = commentData.replyData.map(reply =>
        reply.id === editingCommentId.replyId ? { ...reply, content: editedContent } : reply
      );
      updateComment({ ...commentData, replyData: updatedReplyData });
    } else {
      updateComment({ ...commentData, content: editedContent });
    }
    setEditingCommentId({ commentId: null, replyId: null });
  };

  // Delete버튼 클릭시 동작
  const handleDeleteClick = (commentId: number) => {
    console.log(`${commentId}의 Delete버튼 클릭!`)
    deleteComment(commentId);
  };

 const handleSubmitReply = (content: string) => {
    const newReply: Reply = {
      id: commentData.replyData.length + 1,
      content,
      likeCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: null,
      deletedAt: null,
      quest_id: commentData.quest_id,
      user_id: currentUser.id,
    };

    const updatedReplyData = [...commentData.replyData, newReply];
    updateComment({ ...commentData, replyData: updatedReplyData });
  };

  return (
    <div className={styles.discussion}>
      <div className={styles.comment}>
        <div className={styles.nameBox}>
          <div className={styles.character}>
            <img src={currentUser.profileImage} alt="User Profile" />
          </div>
          <div className={styles.name}> { } </div>
          {!hideEditDelete && isCurrentUser(commentData.user_id) && (
            <div className={styles.editBox}>
              <div className={styles.edit} onClick={() => handleEditClick(commentData.id)}>
                <div className={styles.editIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none">
                    <path d="M13.9808 2.80618C14.1843 2.56552 14.4359 2.36964 14.7197 2.231C15.0035 2.09236 15.3132 2.01403 15.6291 2.00097C15.9451 1.98792 16.2603 2.04045 16.5546 2.1552C16.849 2.26995 17.1161 2.44441 17.3389 2.66747C17.5617 2.89052 17.7353 3.15727 17.8487 3.45071C17.9621 3.74416 18.0127 4.05786 17.9973 4.37183C17.982 4.6858 17.901 4.99314 17.7595 5.27427C17.6181 5.5554 17.4193 5.80416 17.1757 6.00468L6.39298 16.7996L2 17.999L3.19808 13.6011L13.9808 2.80618Z" stroke="#1890FF" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
                <div className={styles.editText}>Edit</div>
              </div>
              <div className={styles.edit} onClick={() => handleDeleteClick(commentData.id)}>
                <div className={styles.editIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none">
                    <path d="M12.2837 7.5L11.9952 15M8.00481 15L7.71635 7.5M16.023 4.82547C16.308 4.86851 16.592 4.91456 16.875 4.96358M16.023 4.82547L15.1332 16.3938C15.058 17.3707 14.2434 18.125 13.2637 18.125H6.73631C5.75655 18.125 4.94198 17.3707 4.86683 16.3938L3.97696 4.82547M16.023 4.82547C15.0677 4.6812 14.1013 4.57071 13.125 4.49527M3.125 4.96358C3.40798 4.91456 3.69198 4.86851 3.97696 4.82547M3.97696 4.82547C4.93231 4.6812 5.89874 4.57071 6.875 4.49527M13.125 4.49527V3.73182C13.125 2.74902 12.3661 1.92853 11.3838 1.8971C10.9244 1.8824 10.463 1.875 10 1.875C9.53696 1.875 9.07565 1.8824 8.61618 1.8971C7.63388 1.92853 6.875 2.74902 6.875 3.73182V4.49527M13.125 4.49527C12.0938 4.41558 11.0516 4.375 10 4.375C8.94836 4.375 7.9062 4.41558 6.875 4.49527" stroke="#1890FF" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
                <div className={styles.editText}>Delete</div>
              </div>
            </div>
          )}
        </div>
        {editingCommentId.commentId === commentData.id && !editingCommentId.replyId ? (
          <div className={styles.comment}>
            <div className={styles.nameBox}>
              <div className={styles.character}>
                <img src={currentUser.profileImage} alt="User Profile" />
              </div>
              <div className={styles.inputBox}>
                <Input
                  className={styles.textarea}
                  type="text"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
                <div className={styles.saveButton} onClick={handleSaveClick}>
                  Save
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.text}>{commentData.content}</div>
        )}
        <div className={styles.downBox}>
          <div className={styles.interactions}>
            <div className={styles.replyBox}>
              <div className={styles.replyIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none">
                  <path d="M5.6 19.92L7.124 18.701L7.134 18.693C7.452 18.438 7.613 18.31 7.792 18.219C7.952 18.137 8.123 18.077 8.3 18.041C8.499 18 8.706 18 9.122 18H17.803C18.921 18 19.481 18 19.908 17.782C20.2843 17.5903 20.5903 17.2843 20.782 16.908C21 16.48 21 15.92 21 14.804V7.197C21 6.079 21 5.519 20.782 5.092C20.5899 4.71558 20.2836 4.40963 19.907 4.218C19.48 4 18.92 4 17.8 4H6.2C5.08 4 4.52 4 4.092 4.218C3.71565 4.40969 3.40969 4.71565 3.218 5.092C3 5.52 3 6.08 3 7.2V18.671C3 19.737 3 20.27 3.218 20.543C3.31174 20.6607 3.43083 20.7557 3.56641 20.821C3.70198 20.8863 3.85053 20.9201 4.001 20.92C4.351 20.92 4.767 20.586 5.6 19.92Z" stroke="white" stroke-opacity="0.65" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div className={styles.replyText}>
                <div
                  className={styles.reply}
                  onClick={toggleReplies}
                  role="button"
                  tabIndex={0}
                >
                  Reply ({commentData.replyData.length})
                </div>
              </div>
            </div>
            <div className={styles.likeBox}>
              <div className={styles.likeIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none">
                  <path d="M21 8.25C21 5.76472 18.9013 3.75 16.3125 3.75C14.3769 3.75 12.7153 4.87628 12 6.48342C11.2847 4.87628 9.62312 3.75 7.6875 3.75C5.09867 3.75 3 5.76472 3 8.25C3 15.4706 12 20.25 12 20.25C12 20.25 21 15.4706 21 8.25Z" stroke="white" stroke-opacity="0.65" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div className={styles.likeText}>{commentData.likeCount}</div>
            </div>
          </div>
          <div className={styles.date}>{commentData.createdAt}</div>
        </div>
      </div>
      {showReplies && (
        <div className={styles.replys}>
          {commentData.replyData.map((reply) => (
            <div className={styles.comment}>
              <div className={styles.nameBox}>
                <div className={styles.character}></div>
                <div className={styles.name}> Name </div>
                {!hideEditDelete && isCurrentUser(reply.user_id) && (
                  <div className={styles.editBox}>
                    <div className={styles.edit} onClick={() => handleEditClick(commentData.id, reply.id)}>
                      <div className={styles.editIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none">
                          <path d="M13.9808 2.80618C14.1843 2.56552 14.4359 2.36964 14.7197 2.231C15.0035 2.09236 15.3132 2.01403 15.6291 2.00097C15.9451 1.98792 16.2603 2.04045 16.5546 2.1552C16.849 2.26995 17.1161 2.44441 17.3389 2.66747C17.5617 2.89052 17.7353 3.15727 17.8487 3.45071C17.9621 3.74416 18.0127 4.05786 17.9973 4.37183C17.982 4.6858 17.901 4.99314 17.7595 5.27427C17.6181 5.5554 17.4193 5.80416 17.1757 6.00468L6.39298 16.7996L2 17.999L3.19808 13.6011L13.9808 2.80618Z" stroke="#1890FF" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                      </div>
                      <div className={styles.editText}>Edit</div>
                    </div>
                    <div className={styles.edit} onClick={() => handleDeleteClick(commentData.id)}>
                      <div className={styles.editIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none">
                          <path d="M12.2837 7.5L11.9952 15M8.00481 15L7.71635 7.5M16.023 4.82547C16.308 4.86851 16.592 4.91456 16.875 4.96358M16.023 4.82547L15.1332 16.3938C15.058 17.3707 14.2434 18.125 13.2637 18.125H6.73631C5.75655 18.125 4.94198 17.3707 4.86683 16.3938L3.97696 4.82547M16.023 4.82547C15.0677 4.6812 14.1013 4.57071 13.125 4.49527M3.125 4.96358C3.40798 4.91456 3.69198 4.86851 3.97696 4.82547M3.97696 4.82547C4.93231 4.6812 5.89874 4.57071 6.875 4.49527M13.125 4.49527V3.73182C13.125 2.74902 12.3661 1.92853 11.3838 1.8971C10.9244 1.8824 10.463 1.875 10 1.875C9.53696 1.875 9.07565 1.8824 8.61618 1.8971C7.63388 1.92853 6.875 2.74902 6.875 3.73182V4.49527M13.125 4.49527C12.0938 4.41558 11.0516 4.375 10 4.375C8.94836 4.375 7.9062 4.41558 6.875 4.49527" stroke="#1890FF" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                      </div>
                      <div className={styles.editText}>Delete</div>
                    </div>
                  </div>
                )}
              </div>
              {editingCommentId.commentId === commentData.id && editingCommentId.replyId === reply.id ? (
                <div className={styles.comment}>
                  <div className={styles.nameBox}>
                    <div className={styles.character}>
                      <img src={currentUser.profileImage} alt="User Profile" />
                    </div>
                    <div className={styles.inputBox}>
                      <Input
                        className={styles.textarea}
                        type="text"
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                      />
                      <div className={styles.saveButton} onClick={handleSaveClick}>
                        Save
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={styles.text}>{reply.content}</div>
              )}
              <div className={styles.downBox}>
                <div className={styles.interactions}>
                  <div className={styles.likeBox}>
                    <div className={styles.likeIcon}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none">
                        <path d="M21 8.25C21 5.76472 18.9013 3.75 16.3125 3.75C14.3769 3.75 12.7153 4.87628 12 6.48342C11.2847 4.87628 9.62312 3.75 7.6875 3.75C5.09867 3.75 3 5.76472 3 8.25C3 15.4706 12 20.25 12 20.25C12 20.25 21 15.4706 21 8.25Z" stroke="white" stroke-opacity="0.65" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </div>
                    <div className={styles.likeText}>{reply.likeCount}</div>
                  </div>
                </div>
                <div className={styles.date}>{reply.createdAt}</div>
              </div>
            </div>
          ))}
          <CommentInput isReply={true} buttonText="Submit" onSubmit={handleSubmitReply} />
        </div>
      )}
    </div>

  )
}
