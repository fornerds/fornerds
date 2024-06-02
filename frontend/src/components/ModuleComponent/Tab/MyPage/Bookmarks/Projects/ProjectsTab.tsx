import React, { useRef, useState } from 'react'
import styles from './ProjectsTab.module.css'
import { Pagination } from '../../../../Pagination'
import { QuestCard } from '../../../../Card'
import categoryImages from '../../../../../../assets/images/category'
import { ReactComponent as Right } from '../../../../../../assets/icons/right.svg'

type Quest = {
  userQuestId: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
  isBookmarked: boolean
  bookmarkCount: number
  title: string
  description: string
  skills: string[]
  developerCount: number
  remaining_quests: number
  deadline: number
  rewardCash: number
  rewardExp: number
  status: 'inProgress' | 'completed'
  createdAt: string
  positionName: string
  opened: boolean
  link: string
}

type Project = {
  id: number
  title: string
  createdAt: string
  bookmarkCount: number
  categoryId: number
  questList: Quest[]
}

export function ProjectsTab() {
  const myProject = useRef<Project[]>(
    Array.from({ length: 7 }, (_, index) => {
      const categoryId = Math.floor(Math.random() * 8)
      const randomDate = new Date()
      randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 365))
      return {
        id: index + 1,
        title: `Project name ${index + 1}`,
        categoryId: categoryId,
        categoryImage: Math.floor(Math.random() * 8),
        createdAt: randomDate.toISOString(),
        bookmarkCount: Math.floor(Math.random() * 500),
        questList: Array.from(
          { length: Math.floor(Math.random() * 5) },
          (_, i) => {
            const status: 'inProgress' | 'completed' = [
              'inProgress',
              'completed'
            ][Math.floor(Math.random() * 2)] as 'inProgress' | 'completed'
            return {
              userQuestId: i + 1,
              difficulty: ['Easy', 'Medium', 'Hard'][
                Math.floor(Math.random() * 3)
              ] as 'Easy' | 'Medium' | 'Hard',
              isBookmarked: true,
              bookmarkCount: Math.floor(Math.random() * 500),
              title: `Quest name ${i + 1}`,
              description:
                'Lorem ipsum dolor sit amet consectetur. Facilisis fermentum cras ipsum et sit odio volutpat tristique.',
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
              opened: [true, false][Math.floor(Math.random() * 2)],
              link: `/projects/${categoryId}/${index + 1}/quests/${i + 1}`
            }
          }
        )
      }
    })
  ).current

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const questListRefs = useRef<Array<HTMLUListElement | null>>([])

  const handleMouseDown =
    (index: number) => (e: React.MouseEvent<HTMLUListElement>) => {
      const questListRef = questListRefs.current[index]
      if (!questListRef) return

      const startX = e.clientX
      const startScrollLeft = questListRef.scrollLeft

      const handleMouseMove = (e: MouseEvent) => {
        if (!questListRef) return

        const deltaX = e.clientX - startX
        questListRef.scrollLeft = startScrollLeft - deltaX
      }

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = myProject.slice(indexOfFirstItem, indexOfLastItem)

  return (
    <div className={styles.myProjectList}>
      <ul className={styles.projectList}>
        {currentItems.map((project, index) => (
          <li className={styles.project} key={project.id}>
            <div className={styles.projectHeaderWrap}>
              <div className={styles.projectHeader}>
                <div className={styles.projectIndex}>
                  <img
                    src={categoryImages[project.categoryId]}
                    alt={`category ${project.categoryId}`}
                    width="30"
                    height="30"
                  />
                  <div className={styles.projectTitleWrap}>
                    <h3 className="font-roboto-card-title text-color-lighten">
                      {project.title}
                    </h3>
                    <p className="font-roboto-body-2 text-color-default">
                      {`${project.questList.length} quests opened`}
                    </p>
                  </div>
                </div>
                <Right stroke="#00C4B4" />
              </div>
            </div>
            {project.questList.length > 0 ? (
              <div className={styles.questListWrap}>
                <ul
                  className={styles.questList}
                  ref={(el) => (questListRefs.current[index] = el)}
                  role="listbox"
                  onMouseDown={handleMouseDown(index)}
                >
                  {project.questList.map((card) => (
                    <QuestCard
                      className={styles.card}
                      key={card.userQuestId}
                      {...card}
                    />
                  ))}
                </ul>
              </div>
            ) : (
              ''
            )}
          </li>
        ))}
      </ul>
      <Pagination
        className={styles.pagination}
        currentPage={currentPage}
        totalItems={myProject.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
