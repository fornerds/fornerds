import React, { useRef, useState } from 'react'
import styles from './BookmarksTab.module.css'
import { ReactComponent as ProjectsIcon } from '../../../../../assets/icons/rocket_launch.svg'
import { ReactComponent as SolutionIcon } from '../../../../../assets/icons/lightbulb.svg'
import { Tab } from '../../Tab'
import { ProjectsTab, SolutionsTab } from './'

export function BookmarksTab() {
  const tabs = [
    {
      icon: <ProjectsIcon stroke="white" strokeOpacity="0.65" />,
      activeIcon: <ProjectsIcon stroke="#00C4B4" strokeOpacity="1" />,
      label: 'Projects',
      content: <ProjectsTab />
    },
    {
      icon: <SolutionIcon stroke="white" strokeOpacity="0.65" />,
      activeIcon: <SolutionIcon stroke="#00C4B4" strokeOpacity="1" />,
      label: 'Solutions',
      content: <SolutionsTab />
    }
  ]
  return (
    <div className={styles.bookmarksMain}>
      <h2 className={`${styles.pageIndex} font-pixellari-sub-header`}>
        Bookmarks
      </h2>
      <div className={styles.bookmarks}>
        <Tab tabs={tabs} isBoomarkTab={true} />
      </div>
    </div>
  )
}
