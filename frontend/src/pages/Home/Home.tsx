import React from 'react'
import styles from './Home.module.css'
import { Tag } from '../../components/AtomComponent'

export function Home() {
  return (
    <>
      <div className={styles.title}>Hello world</div>
      <Tag variant="ongoing" className={styles.tag}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="11" width="4" height="5" fill="#00C4B4" />
          <rect x="6" y="6" width="4" height="10" fill="#00C4B4" />
          <rect x="12" width="4" height="16" fill="#00C4B4" />
        </svg>
        Hard
      </Tag>
    </>
  )
}
