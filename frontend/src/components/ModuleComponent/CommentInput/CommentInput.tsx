import React from 'react'
import styles from './CommentInput.module.css'
import { Button } from '../../AtomComponent'
import { Input } from '../../AtomComponent'

interface CommentInputProps {
  isReply?: boolean
  buttonText: string | null
  onSubmit: () => void
}

export function CommentInput({ 
  isReply = false,
  buttonText = 'Submit',
  onSubmit }: CommentInputProps) {

  const textareaClass = isReply ? styles.replyTextarea : styles.textarea

  return (
    <div className={styles.commentInput}>
      <div className={styles.character}></div>
      <div className={styles.inputBox}>
        <Input className={textareaClass} placeholder='Add to the discussion'>
        </Input>
        <Button
          className={styles.submitButton}
          onClick={onSubmit}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  )
}
