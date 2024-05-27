import React, { useState, useRef } from 'react'
import styles from './QuestDetails.module.css'
import {
  Footer,
  Header,
  BookmarkButton,
  Tab
} from '../../../../../../components/ModuleComponent'
import { NavLink, useParams } from 'react-router-dom'
import { Button, Tag } from '../../../../../../components/AtomComponent'
import { ReactComponent as Users } from '../../../../../../assets/icons/users.svg'
import { ReactComponent as Calendar } from '../../../../../../assets/icons/calendar.svg'
import { ReactComponent as Hard_white } from '../../../../../../assets/icons/hard_white.svg'
import { ReactComponent as Medium_white } from '../../../../../../assets/icons/medium_white.svg'
import { ReactComponent as Easy_white } from '../../../../../../assets/icons/easy_white.svg'
import { ReactComponent as OverviewIcon } from '../../../../../../assets/icons/eye.svg'
import { ReactComponent as DiscussionIcon } from '../../../../../../assets/icons/chat_bubble.svg'
import { ReactComponent as SolutionIcon } from '../../../../../../assets/icons/lightbulb.svg'
import open from '../../../../../../assets/images/pixel/open.webp'
import half_open from '../../../../../../assets/images/pixel/half_open.webp'
import closed from '../../../../../../assets/images/pixel/closed.webp'
import cup from '../../../../../../assets/images/pixel/cup.webp'
import money from '../../../../../../assets/images/pixel/money.webp'

export function QuestDetails() {
  let { categoryId, projectId, questId } = useParams()

  const status = ['inProgress', 'completed'][Math.floor(Math.random() * 2)] as
    | 'inProgress'
    | 'completed'
  const randomDate = new Date()
  randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 365))

  const initialQuest = useRef({
    userQuestId: questId,
    difficulty: ['Easy', 'Medium', 'Hard'][Math.floor(Math.random() * 3)],
    isBookmarked: Math.random() > 0.5,
    bookmarkCount: Math.floor(Math.random() * 500),
    title: `Quest name ${questId}`,
    description:
      'Lorem ipsum dolor sit amet consectetur. Facilisis fermentum cras ipsum et sit odio volutpat tristique. Facilisis fermentum cras ipsum et sit odio volutpat tristique. Facilisis fermentum cras ipsum et sit odio volutpat tristique.',
    skills: ['JavaScript', 'Redux', 'HTML', 'CSS'],
    developerCount: Math.floor(Math.random() * 500),
    remaining_quests: Math.floor(Math.random() * 5),
    deadline: status === 'completed' ? 0 : Math.floor(Math.random() * 29) + 1,
    rewardCash: Math.floor(Math.random() * 1000000),
    rewardExp: Math.floor(Math.random() * 1000000),
    status: status,
    createdAt: randomDate.toISOString(),
    positionName: ['Front-end', 'Back-end', 'Full Stack', 'Designer'][
      Math.floor(Math.random() * 4)
    ],
    QuestStatus: ['closed', 'opened', 'solved'][Math.floor(Math.random() * 3)],
    link: `/projects/${categoryId}/${projectId}/quests/${questId}`
  }).current

  const [quest, setQuest] = useState(initialQuest)
  const [isBookmarked, setIsBookmarked] = useState(quest.isBookmarked || false)

  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleStatusChange = () => {
    setQuest((prevQuest) => {
      let newStatus
      switch (prevQuest.QuestStatus) {
        case 'closed':
          newStatus = 'opened'
          break
        case 'opened':
          newStatus = 'solved'
          break
        case 'solved':
          newStatus = 'solved'
          break
        default:
          newStatus = 'closed'
      }
      return { ...prevQuest, QuestStatus: newStatus }
    })
  }

  const renderBubble = (status: string) => {
    if (status === 'solved') {
      return (
        <div className={styles.bubble}>
          <div className={styles.howto}>
            <h4 className="font-roboto-cta-small text-color-lighten">
              You solved it!
            </h4>
          </div>
        </div>
      )
    } else if (status === 'opened') {
      return (
        <div className={styles.bubble}>
          <div className={styles.howto}>
            <h4 className="font-roboto-cta-small text-color-lighten">
              How to solve the quest
            </h4>
            <ol className={styles.process}>
              <li className="font-roboto-body-2 text-color-lighten">
                1. Clone using the repository
              </li>
              <li className="font-roboto-body-2 text-color-lighten">
                2. Read the Readme.md file
              </li>
              <li className="font-roboto-body-2 text-color-lighten">
                3. Write the necessary code
              </li>
              <li className="font-roboto-body-2 text-color-lighten">
                4. Perform unit testing to verify that the code functions
                correctly
              </li>
              <li className="font-roboto-body-2 text-color-lighten">
                5. Submit the completed code
              </li>
            </ol>
          </div>
        </div>
      )
    }
    return null
  }

  const tabs = [
    {
      icon: <OverviewIcon stroke="white" strokeOpacity="0.38" />,
      activeIcon: <OverviewIcon stroke="#00C4B4" strokeOpacity="1" />,
      label: 'Overview',
      content: <div className="text-color-lighten">Overview...</div>
    },
    {
      icon: <DiscussionIcon stroke="white" strokeOpacity="0.38" />,
      activeIcon: <DiscussionIcon stroke="#00C4B4" strokeOpacity="1" />,
      label: 'Discussion',
      content: <div className="text-color-lighten">Discussion...</div>
    },
    {
      icon: <SolutionIcon stroke="white" strokeOpacity="0.38" />,
      activeIcon: <SolutionIcon stroke="#00C4B4" strokeOpacity="1" />,
      label: 'Solutions',
      content: <div className="text-color-lighten">Solutions...</div>
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
                    /
                    <NavLink
                      to={`/projects/${categoryId}/${projectId}`}
                      className={styles.prevPage}
                    >
                      Project detail
                    </NavLink>
                    /<span className={styles.currentPage}>Quest detail</span>
                  </span>
                </span>
                <div className={styles.questInfo}>
                  <h2 className={`${styles.title} font-roboto-header-2`}>
                    {quest.title}
                  </h2>
                  <div className={styles.questIndexs}>
                    <div className={styles.questIndex}>
                      <Tag
                        className={`${styles.position} font-roboto-body-3`}
                        variant="active"
                      >
                        {quest.positionName}
                      </Tag>
                      <span
                        className={`${styles.questIndexItem} font-roboto-body-2`}
                      >
                        <Users width="24" height="24" />
                        <p
                          className={`${styles.users} text-color-lighten  font-roboto-button`}
                        >
                          {quest.developerCount} Developers
                        </p>
                      </span>
                      <span
                        className={`${styles.questIndexItem} font-roboto-body-2`}
                      >
                        <Calendar width="24" height="24" />
                        <p
                          className={`${styles.date} text-color-lighten  font-roboto-button`}
                        >
                          {quest.deadline && quest.deadline > 0
                            ? `${quest.deadline} Days left`
                            : 'Closed'}
                        </p>
                      </span>
                    </div>
                    <div className={styles.language}>
                      {quest.skills.map((skill, index) => (
                        <Tag
                          key={index}
                          className={`${styles.skill} font-roboto-button text-color-lighten`}
                          variant="default"
                        >
                          {skill}
                        </Tag>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
              <article className={styles.rightBox}>
                {renderBubble(quest.QuestStatus)}
                <div className={styles.openQuest}>
                  <div className={styles.upperBox}>
                    <Tag
                      className={`${styles.difficulty} font-roboto-body-3 text-color-lighten`}
                      variant="lighten"
                      rounded
                    >
                      {quest.difficulty === 'Hard' ? (
                        <Hard_white width="16" height="16" />
                      ) : quest.difficulty === 'Medium' ? (
                        <Medium_white width="16" height="16" />
                      ) : quest.difficulty === 'Easy' ? (
                        <Easy_white width="16" height="16" />
                      ) : (
                        ''
                      )}
                      {quest.difficulty}
                    </Tag>
                    <img
                      src={
                        quest.QuestStatus === 'solved'
                          ? open
                          : quest.QuestStatus === 'opened'
                            ? half_open
                            : closed
                      }
                      alt="reward"
                      className={styles.rewardImage}
                      width="60"
                      height="60"
                    />
                    <div className={styles.rewardInfo}>
                      {quest.rewardCash && (
                        <div className={styles.rewardItem}>
                          <img src={money} alt="money" width="27" height="18" />
                          <span className="text-color-lighten  font-roboto-button">
                            {quest.rewardCash.toLocaleString()}
                          </span>
                        </div>
                      )}
                      {quest.rewardExp && (
                        <div className={styles.rewardItem}>
                          <img
                            src={cup}
                            alt="experience"
                            width="20"
                            height="20"
                          />
                          <span className="text-color-lighten  font-roboto-button">
                            {quest.rewardExp.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={styles.questButtons}>
                    <Button
                      className={`${styles.Button} font-roboto-cta-small`}
                      variant="active"
                      onClick={handleStatusChange}
                    >
                      {quest.QuestStatus === 'solved'
                        ? 'View Solution'
                        : quest.QuestStatus === 'opened'
                          ? 'Submit Quest'
                          : 'Open Quest'}
                    </Button>
                    <BookmarkButton
                      isBookmarked={isBookmarked}
                      onBookmarkClick={handleBookmarkClick}
                    />
                  </div>
                </div>
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
