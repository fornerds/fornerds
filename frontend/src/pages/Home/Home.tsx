import React from 'react'
import styles from './Home.module.css'
import { Button, Tag } from '../../components/AtomComponent'

export function Home() {
  return (
    <>
      <div className={styles.background}>
        <div className={styles.title}>Hello world</div>
        <Tag variant="active" className={styles.tag} rounded>
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
        <Tag variant="default" className={styles.tag} rounded>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              y="11"
              width="4"
              height="5"
              fill="rgba(255, 255, 255, 0.65)"
            />
            <rect
              x="6"
              y="6"
              width="4"
              height="10"
              fill="rgba(255, 255, 255, 0.65)"
            />
            <rect
              x="12"
              width="4"
              height="16"
              fill="rgba(255, 255, 255, 0.25)"
            />
          </svg>
          Medium
        </Tag>
        <Button className={styles.button} variant="lessEmphasize" size="small">
          Button
        </Button>
        <Button
          className={`${styles.button} ${styles.defaultButton}`}
          variant="default"
          size="small"
        >
          Button
        </Button>
        <Button className={styles.button} variant="active" size="small">
          Button
        </Button>
        <Button className={styles.button} variant="active" size="big">
          Button
        </Button>
        <Button
          className={`${styles.button} ${styles.activeButton}`}
          variant="default"
          size="big"
        >
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="icon/save&#38;heart">
              <path
                id="Vector"
                d="M5.5 21V5C5.5 4.46957 5.71071 3.96086 6.08579 3.58579C6.46086 3.21071 6.96957 3 7.5 3H17.5C18.0304 3 18.5391 3.21071 18.9142 3.58579C19.2893 3.96086 19.5 4.46957 19.5 5V21L13.582 17.195C13.2593 16.9874 12.8837 16.877 12.5 16.877C12.1163 16.877 11.7407 16.9874 11.418 17.195L5.5 21Z"
                stroke="white"
                strokeOpacity="0.85"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
          Button
        </Button>
      </div>
    </>
  )
}
