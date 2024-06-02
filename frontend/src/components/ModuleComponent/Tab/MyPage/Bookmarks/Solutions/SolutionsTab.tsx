import React, { useRef, useState } from 'react'
import styles from './SolutionsTab.module.css'
import { ReactComponent as BookmarkIcon } from '../../../../../../assets/icons/bookmark.svg'
import { SolutionsTabTable } from '../../../../Table'
import { Pagination } from '../../../../Pagination'

export function SolutionsTab() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const solutionList = useRef(
    Array.from({ length: 13 }, (_, i) => {
      const randomDate = new Date()
      randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 365))
      return {
        id: i + 1,
        isBookmarked: true,
        title: `Quest ${i + 1}`,
        user_id: 7,
        user_image: 7,
        memoryUsage: Math.floor(Math.random() * 2000),
        createdAt: randomDate.toISOString()
      }
    })
  ).current

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = solutionList.slice(indexOfFirstItem, indexOfLastItem)

  return (
    <section className={styles.mySolutionContent}>
      <article className={styles.mySolution}>
        <div className={styles.solutionHeader}>
          <div className={styles.solutionHeaderCenterItem}>
            <BookmarkIcon width="24" height="24" fill="none" stroke="white" />
          </div>
          <div
            className={`${styles.solutionHeaderItem} font-roboto-cta-small text-color-lighten`}
          >
            Quest name
          </div>
          <div
            className={`${styles.solutionHeaderCenterItem} font-roboto-cta-small text-color-lighten`}
          >
            ID
          </div>
          <div
            className={`${styles.solutionHeaderItem} font-roboto-cta-small text-color-lighten`}
          >
            Memory
          </div>
          <div
            className={`${styles.solutionHeaderItem} font-roboto-cta-small text-color-lighten`}
          >
            Date
          </div>
        </div>
        <ol className={styles.solutionList}>
          {currentItems.map((solution) => (
            <SolutionsTabTable key={solution.id} {...solution} />
          ))}
        </ol>
      </article>
      <Pagination
        className={styles.pagination}
        currentPage={currentPage}
        totalItems={solutionList.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </section>
  )
}
