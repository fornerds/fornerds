import React from 'react'
import styles from './Discussion.module.css'
import { Comment } from '../../../../../../../components/ModuleComponent'

export function Discussion() {
  const handleReply = () => {
    console.log('Reply clicked')
  }

  const handleEdit = () => {
    console.log('Edit clicked')
  }

  const handleDelete = () => {
    console.log('Delete clicked')
  }
  return (
    <div className="App">
      <Comment
        username="John Doe"
        avatar="https://via.placeholder.com/40"
        comment="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        timestamp="2024-01-24"
        likes={235}
        onReply={handleReply}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}
