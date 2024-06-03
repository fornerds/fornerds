import React from 'react'
import styles from './CommentInput.module.css'
import { Button } from '../../AtomComponent'
import { Input } from '../../AtomComponent'

export function CommentInput() {
  return (
    <div className={styles.commentInput}>
      <div className={styles.character}></div>
      <div className={styles.inputBox}>
        <Input className={styles.textarea} placeholder='Add to the discussion'/>
        <Button
          className={styles.submitButton}
        >
          Submit
        </Button>
      </div>
    </div>
  )
}
