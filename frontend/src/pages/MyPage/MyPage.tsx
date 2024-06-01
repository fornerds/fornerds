import React from 'react'
import styles from './MyPage.module.css'
import { Footer, Header, Tab } from '../../components/ModuleComponent'
import backgroundTop from '../../assets/images/background/background03.webp'
import backgroundBottom from '../../assets/images/background/background04.webp'
import { ReactComponent as UserIcon } from '../../assets/icons/user.svg'
import { ReactComponent as ProjectsIcon } from '../../assets/icons/rocket_launch.svg'
import { ReactComponent as SolutionIcon } from '../../assets/icons/lightbulb.svg'
import { ReactComponent as BookmarkIcon } from '../../assets/icons/bookmark.svg'
import { DiscussionIcon } from '../../assets/icons/DiscussionIcon'
import {
  BookmarksTab,
  InformationTab,
  MyProjectsTab,
  MySolutionsTab
} from '../../components/ModuleComponent/Tab/MyPage'

export function MyPage() {
  const tabs = [
    {
      icon: <UserIcon />,
      label: 'imformation',
      content: <InformationTab />
    },
    {
      icon: <ProjectsIcon stroke="white" strokeOpacity="0.85" />,
      label: 'My Projects',
      content: <MyProjectsTab />
    },
    {
      icon: <SolutionIcon stroke="white" strokeOpacity="0.85" />,
      label: 'My Solutions',
      content: <MySolutionsTab />
    },
    {
      icon: <BookmarkIcon width="24" height="24" fill="none" stroke="white" />,
      label: 'Bookmarks',
      content: <BookmarksTab />
    },
    {
      icon: <DiscussionIcon stroke="white" strokeOpacity="0.85" />,
      label: 'Activities',
      content: <div>Activities...</div>
    }
  ]

  return (
    <div className={styles.background}>
      <div
        className={styles.backgroundImage}
        style={{ backgroundImage: `url(${backgroundTop})` }}
      ></div>
      <div
        className={styles.backgroundImageBottom}
        style={{ backgroundImage: `url(${backgroundBottom})` }}
      ></div>
      <div className={styles.content}>
        <Header />
        <main className={styles.main}>
          <Tab tabs={tabs} isMyPageTab={true} />
        </main>
      </div>
      <Footer />
    </div>
  )
}
