import React, { useState } from 'react'
import styles from './ProjectsDetails.module.css'

/*
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
*/

import { Footer, Header, Tab } from '../../../../components/ModuleComponent'
import { NavLink, useParams } from 'react-router-dom'
import { Bookmark } from '../../../../components/ModuleComponent/Bookmark'
import { ReactComponent as Users } from '../../../../assets/icons/users.svg'
import { ReactComponent as Code_bracket } from '../../../../assets/icons/code_bracket.svg'
import { ReactComponent as Calendar } from '../../../../assets/icons/calendar.svg'
import { ReactComponent as Easy_active } from '../../../../assets/icons/easy_active.svg'
import { ReactComponent as Medium_active } from '../../../../assets/icons/medium_active.svg'
import { ReactComponent as Hard_active } from '../../../../assets/icons/hard_active.svg'
import { ReactComponent as OverviewIcon } from '../../../../assets/icons/eye.svg'
import { ReactComponent as QuestBoardIcon } from '../../../../assets/icons/rectangle_stack.svg'
import { ReactComponent as QuestBoardAtiveIcon } from '../../../../assets/icons/lightbulb.svg'
import { Tag } from '../../../../components/AtomComponent'
import money from '../../../../assets/images/pixel/money.webp'
import cup from '../../../../assets/images/pixel/cup.webp'
import { ProjectBodyTab } from './Tab/Overview/ProjectBodyTab'

export function ProjectsDetails() {
  let { categoryId, projectId } = useParams()

  const status = ['inProgress', 'completed'][Math.floor(Math.random() * 2)] as
    | 'inProgress'
    | 'completed'
  const randomDate = new Date()
  randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 365))

  const project = {
    projectId,
    difficulty: ['Easy', 'Medium', 'Hard'][Math.floor(Math.random() * 3)],
    isBookmarked: Math.random() > 0.5,
    title: `Project name ${projectId}`,
    description:
      'Lorem ipsum dolor sit amet consectetur. Facilisis fermentum cras ipsum et sit odio volutpat tristique. Facilisis fermentum cras ipsum et sit odio volutpat tristique. Facilisis fermentum cras ipsum et sit odio volutpat tristique.',
    skills: ['JavaScript', 'Redux', 'HTML', 'CSS'],
    developerCount: Math.floor(Math.random() * 500),
    remaining_quests: Math.floor(Math.random() * 5),
    deadline: status === 'completed' ? 0 : Math.floor(Math.random() * 29) + 1,
    rewardCash: Math.floor(Math.random() * 1000000),
    rewardExp: Math.floor(Math.random() * 1000000),
    status: status,
    createdAt: randomDate.toISOString()
  }

  const [isBookmarked, setIsBookmarked] = useState(
    project.isBookmarked || false
  )

  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked)
  }

  const tabs = [
    {
      icon: <OverviewIcon stroke="white" strokeOpacity="0.38" />,
      activeIcon: <OverviewIcon stroke="#00C4B4" strokeOpacity="1" />,
      label: 'Overview',
      content: (
        <>
          <div className={styles.tabBackground}>
            <section className={styles.tabSection}>
              <ProjectBodyTab />
            </section>
          </div>
        </>
      )
    },
    {
      icon: <QuestBoardIcon strokeOpacity="0.65" />,
      activeIcon: <QuestBoardAtiveIcon stroke="#00C4B4" strokeOpacity="1" />,
      label: 'Quest Board',
      content: (
        <>
          <div className={styles.tabBackground}>
            <section className={styles.tabSection}>
              <h3 className={styles.text}>Quests card...</h3>
            </section>
          </div>
        </>
      )
    }
  ]

  return (
    <div className={styles.background}>
      <Header />
      <main className={styles.main}>
        <header className={styles.projectHeader}>
          <section className={styles.projectHeaderInfo}>
            <div className={styles.contentsBox}>
              <article className={styles.leftBox}>
                <span className={styles.leftBoxHeader}>
                  <span className={`${styles.navList} font-roboto-body-2`}>
                    <NavLink to={'/'} className={styles.prevPage}>
                      Home
                    </NavLink>
                    /
                    <NavLink
                      to={`/projects/${categoryId}`}
                      className={styles.prevPage}
                    >
                      Project list
                    </NavLink>
                    /<span className={styles.currentPage}>Project detail</span>
                  </span>
                  <Bookmark
                    width="36"
                    height="36"
                    isBookmarked={isBookmarked}
                    onBookmarkClick={handleBookmarkClick}
                  />
                </span>
                <h2 className={`${styles.title} font-roboto-header-2`}>
                  {project.title}
                </h2>
                <span className={styles.projectInfo}>
                  <span
                    className={`${styles.projectInfoItem} font-roboto-body-1`}
                  >
                    <Users width="24" height="24" /> {project.developerCount}{' '}
                    Developers
                  </span>
                  <span
                    className={`${styles.projectInfoItem} font-roboto-body-1`}
                  >
                    <Code_bracket width="24" height="24" />
                    {project.remaining_quests} Quests left
                  </span>
                  <span
                    className={`${styles.projectInfoItem} font-roboto-body-1`}
                  >
                    <Calendar width="24" height="24" />
                    {project.deadline && project.deadline > 0
                      ? `${project.deadline} Days left`
                      : 'Closed'}
                  </span>
                </span>
              </article>
              <article className={styles.rightBox}>
                <span className={styles.rightBoxItem}>
                  <p className={`${styles.projectLabel} font-roboto-body-2`}>
                    Difficulty
                  </p>
                  <Tag
                    className={`${styles.difficulty} font-roboto-tag`}
                    variant="active"
                    rounded
                  >
                    {project.difficulty === 'Hard' ? (
                      <Hard_active width="16" height="16" />
                    ) : project.difficulty === 'Medium' ? (
                      <Medium_active width="16" height="16" />
                    ) : project.difficulty === 'Easy' ? (
                      <Easy_active width="16" height="16" />
                    ) : (
                      ''
                    )}
                    {project.difficulty}
                  </Tag>
                </span>
                <span className={styles.rightBoxItem}>
                  <p className={`${styles.projectLabel} font-roboto-body-2`}>
                    Language
                  </p>
                  <span className={styles.skillList}>
                    {project.skills &&
                      project.skills.map((skill, index) => (
                        <Tag
                          key={index}
                          className={`${styles.skill} font-roboto-button`}
                          variant="default"
                        >
                          {skill}
                        </Tag>
                      ))}
                  </span>
                </span>
                <span className={styles.rightBoxItem}>
                  <p className={`${styles.projectLabel} font-roboto-body-2`}>
                    Reward
                  </p>
                  <span className={styles.rewards}>
                    {project.rewardCash && (
                      <img src={money} alt="money" width="45px" height="30px" />
                    )}
                    {project.rewardExp && (
                      <img src={cup} alt="cup" width="30px" height="30px" />
                    )}
                  </span>
                </span>
              </article>
            </div>
          </section>
        </header>
        <Tab tabs={tabs} />
      </main>
      <Footer />
    </div>
  )
}
