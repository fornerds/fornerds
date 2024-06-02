import React from 'react'
import styles from './ProjectBodyTab.module.css'
import { TextField } from './TextField'
import { ProjectDetailCards } from './ProjectDetailCards'

export function ProjectBodyTab() {
  return (
    <div className={styles.contents}>
      <ProjectDetailCards />
      <TextField />
    </div>
  )
}
