import React from 'react'
import styles from './Comment.module.css'

interface Comment {
  username: string
  avatar: string
  comment: string
  timestamp: string
  likes: number
  onReply: () => void
  onEdit: () => void
  onDelete: () => void
}

export function Comment({
  username,
  avatar,
  comment,
  timestamp,
  likes,
  onReply,
  onEdit,
  onDelete
}: Comment) {
  return (
    <div className="discussion-thread">
      <div className="user-profile">
        <img src={avatar} alt={`${username}'s avatar`} className="avatar" />
        <span className="username">{username}</span>
      </div>
      <div className="comment-content">
        <p>{comment}</p>
        <span className="timestamp">{timestamp}</span>
      </div>
      <div className="interactive-elements">
        <button onClick={onReply}>Reply</button>
        <span className="likes">❤️ {likes}</span>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  )
}
