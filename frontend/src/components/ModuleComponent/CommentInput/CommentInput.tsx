import React from 'react'
import styles from './CommentInput.module.css'
import { Button } from '../../AtomComponent'
import { Input } from '../../AtomComponent'
import characters from '../../../assets/images/character'

interface CommentInputProps {
  isReply?: boolean
  buttonText: string | null
  onSubmit: (content: string) => void
  profileImage: number
}

export function CommentInput({
  isReply = false,
  buttonText = 'Submit',
  profileImage,
  onSubmit }: CommentInputProps) {

  const [content, setContent] = React.useState('')
  const textareaClass = isReply ? styles.replyTextarea : styles.textarea

  const handleSubmit = () => {
    onSubmit(content)
    setContent('')
  }

  return (
    <div className={styles.commentInput}>
      <img src={characters[profileImage]} className={styles.character} alt="User Profile" />
      <div className={styles.inputBox}>
        <Input
          className={textareaClass}
          placeholder='Add to the discussion'
          value={content}
          onChange={(e) => setContent(e.target.value)}>
        </Input>
        <Button
          className={styles.submitButton}
          onClick={handleSubmit}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  )
}
