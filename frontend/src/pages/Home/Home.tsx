import React from 'react'
import styles from './Home.module.css'
import { Button, Tag } from '../../components/AtomComponent'
import { Card } from '../../components/ModuleComponent'

export function Home() {
  return (
    <>
      <div className={styles.background}>
        <div className={styles.title}>Hello world</div>
      </div>
    </>
  )
}
