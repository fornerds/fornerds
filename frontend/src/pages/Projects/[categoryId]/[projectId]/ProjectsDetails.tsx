import React from 'react'
import styles from './ProjectsDetails.module.css'
import { Footer, Header } from '../../../../components/ModuleComponent'
import { ProjectBodyTab } from './Tab/Overview/ProjectBodyTab'

export function ProjectsDetails() {
  return (
    <div className={styles.pageLayout}>
      <Header />
      <div className={styles.content}>
        <div className={styles.backgroundImage}>
          <ProjectBodyTab />
        </div>
      </div>
      <Footer />
    </div>
  )
}
