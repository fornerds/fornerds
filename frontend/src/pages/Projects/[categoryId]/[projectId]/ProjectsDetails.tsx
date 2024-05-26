import React, { useState, useRef } from 'react'
import styles from './ProjectsDetails.module.css'
import {
  Footer,
  Header,
  Pagination,
  QuestCard,
  SortFilter,
  Tab
} from '../../../../components/ModuleComponent'
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
import { ReactComponent as Ellipse } from '../../../../assets/icons/ellipse.svg'
import { Button, Tag, Toggle } from '../../../../components/AtomComponent'
import money from '../../../../assets/images/pixel/money.webp'
import cup from '../../../../assets/images/pixel/cup.webp'
import { ProjectBodyTab } from './Tab/Overview/ProjectBodyTab'

export function ProjectsDetails() {
  let { categoryId, projectId } = useParams()
  const [currentPage, setCurrentPage] = useState(1)
  const [sortType, setSortType] = useState('default')
  const [onlyActive, setOnlyActive] = useState(false)
  const [selectedPositions, setSelectedPositions] = useState<string[]>([])
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([])
  const itemsPerPage = 8

  const status = ['inProgress', 'completed'][Math.floor(Math.random() * 2)] as
    | 'inProgress'
    | 'completed'
  const randomDate = new Date()
  randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 365))

  const project = useRef({
    projectId: Number(projectId),
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
  }).current

  const cards = useRef(
    Array.from({ length: 53 }, (_, i) => {
      const status = ['inProgress', 'completed'][
        Math.floor(Math.random() * 2)
      ] as 'inProgress' | 'completed'
      const randomDate = new Date()
      randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 365))
      return {
        userQuestId: i + 1,
        difficulty: ['Easy', 'Medium', 'Hard'][Math.floor(Math.random() * 3)],
        isBookmarked: Math.random() > 0.5,
        bookmarkCount: Math.floor(Math.random() * 500),
        title: `Quest name ${i + 1}`,
        description:
          'Lorem ipsum dolor sit amet consectetur. Facilisis fermentum cras ipsum et sit odio volutpat tristique. Facilisis fermentum cras ipsum et sit odio volutpat tristique. Facilisis fermentum cras ipsum et sit odio volutpat tristique.',
        skills: ['JavaScript', 'Redux', 'HTML', 'CSS'],
        developerCount: Math.floor(Math.random() * 500),
        remaining_quests: Math.floor(Math.random() * 5),
        deadline:
          status === 'completed' ? 0 : Math.floor(Math.random() * 29) + 1,
        rewardCash: Math.floor(Math.random() * 1000000),
        rewardExp: Math.floor(Math.random() * 1000000),
        status: status,
        createdAt: randomDate.toISOString(),
        positionName: ['Front-end', 'Back-end', 'Full Stack', 'Designer'][
          Math.floor(Math.random() * 4)
        ],
        opened: [true, false][Math.floor(Math.random() * 2)]
      }
    })
  ).current

  const positions = ['Front-end', 'Back-end', 'Full Stack', 'Designer']
  const difficulties = ['Hard', 'Medium', 'Easy']

  const handleTagClick = (tag: string, type: 'position' | 'difficulty') => {
    if (type === 'position') {
      setSelectedPositions((prev) =>
        prev.includes(tag) ? prev.filter((pos) => pos !== tag) : [...prev, tag]
      )
    } else if (type === 'difficulty') {
      setSelectedDifficulties((prev) =>
        prev.includes(tag)
          ? prev.filter((diff) => diff !== tag)
          : [...prev, tag]
      )
    }
  }

  const [isBookmarked, setIsBookmarked] = useState(
    project.isBookmarked || false
  )

  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleSortChange = (sortType: string) => {
    setSortType(sortType)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleToggleChange = (checked: boolean) => {
    setOnlyActive(checked)
    setCurrentPage(1)
  }

  const filteredCards = cards
    .filter((card) => (onlyActive ? card.deadline > 0 : true))
    .filter((card) =>
      selectedPositions.length > 0
        ? selectedPositions.includes(card.positionName)
        : true
    )
    .filter((card) =>
      selectedDifficulties.length > 0
        ? selectedDifficulties.includes(card.difficulty)
        : true
    )

  const sortedCards = filteredCards.sort((a, b) => {
    switch (sortType) {
      case 'Popular':
        return b.bookmarkCount - a.bookmarkCount
      case 'Recent':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'Expire':
        return a.deadline - b.deadline
      case 'Reward':
        return b.rewardCash - a.rewardCash
      default:
        return 0
    }
  })

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = sortedCards.slice(indexOfFirstItem, indexOfLastItem)

  const tabs = [
    {
      icon: <OverviewIcon stroke="white" strokeOpacity="0.38" />,
      activeIcon: <OverviewIcon stroke="#00C4B4" strokeOpacity="1" />,
      label: 'Overview',
      content: <ProjectBodyTab />
    },
    {
      icon: <QuestBoardIcon strokeOpacity="0.65" />,
      activeIcon: <QuestBoardAtiveIcon stroke="#00C4B4" strokeOpacity="1" />,
      label: 'Quest Board',
      content: (
        <>
          <div className={styles.tabBackground}>
            <section className={styles.tabSection}>
              <div className={styles.flex}>
                <article className={styles.filters}>
                  <div className={styles.tagFilters}>
                    <div className={styles.positions}>
                      {positions.map((position) => (
                        <Button
                          key={position}
                          className={`${styles.tagFilter} font-roboto-body-2 ${selectedPositions.includes(position) ? styles.activeTag : ''}`}
                          variant="default"
                          onClick={() => handleTagClick(position, 'position')}
                        >
                          <Ellipse
                            fill={
                              selectedPositions.includes(position)
                                ? 'var(--Color-primary-300, #00C4B4)'
                                : 'var(--Color-text-default, rgba(255, 255, 255, 0.65))'
                            }
                          />
                          {position}
                        </Button>
                      ))}
                    </div>
                    <div className={styles.verticalLine}></div>
                    <div className={styles.positions}>
                      {difficulties.map((difficulty) => (
                        <Button
                          key={difficulty}
                          className={`${styles.tagFilter} font-roboto-body-2 ${selectedDifficulties.includes(difficulty) ? styles.activeTag : ''}`}
                          variant="default"
                          onClick={() =>
                            handleTagClick(difficulty, 'difficulty')
                          }
                        >
                          <Ellipse
                            fill={
                              selectedDifficulties.includes(difficulty)
                                ? 'var(--Color-primary-300, #00C4B4)'
                                : 'var(--Color-text-default, rgba(255, 255, 255, 0.65))'
                            }
                          />
                          {difficulty}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className={styles.sortFilters}>
                    <SortFilter onSortChange={handleSortChange} />
                    <Toggle label="Ongoing" onChange={handleToggleChange} />
                  </div>
                </article>
                <ul className={styles.cardList}>
                  {currentItems.map((card) => (
                    <QuestCard
                      className={styles.card}
                      key={card.userQuestId}
                      {...card}
                    />
                  ))}
                </ul>
              </div>
              <Pagination
                className={styles.pagination}
                currentPage={currentPage}
                totalItems={sortedCards.length}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
              />
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
                          className={`${styles.skill} font-roboto-button text-color-lighten`}
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
