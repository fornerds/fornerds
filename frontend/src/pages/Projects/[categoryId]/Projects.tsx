import React from 'react'
import styles from './Projects.module.css'
import { Footer, Header } from '../../../components/ModuleComponent'

export function Projects() {
  return (
    <div className={styles.pageLayout}>
      <Header />
      <div className={styles.content}></div>
      <Footer />
    </div>
  )
}
