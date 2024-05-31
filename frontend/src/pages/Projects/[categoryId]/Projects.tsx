import React, { useState, useRef } from 'react'
import styles from './Projects.module.css'
import {
  Card,
  Footer,
  Header,
  Pagination,
  SortFilter,
  CategoryFilter,
  ProjectFilter
} from '../../../components/ModuleComponent'
import { Input, Toggle } from '../../../components/AtomComponent'
import { ReactComponent as SearchIcon } from '../../../assets/icons/magnifying_glass.svg'

export function Projects() {
  // 카드 더미 데이터
  const cards = useRef(
    Array.from({ length: 53 }, (_, i) => {
      const status = ['inProgress', 'completed'][
        Math.floor(Math.random() * 2)
      ] as 'inProgress' | 'completed'
      const randomDate = new Date()
      randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 365))
      return {
        projectId: i + 1,
        difficulty: ['Easy', 'Medium', 'Hard'][Math.floor(Math.random() * 3)],
        isBookmarked: Math.random() > 0.5,
        bookmarkCount: Math.floor(Math.random() * 500),
        title: `Project name ${i + 1}`,
        description:
          'Lorem ipsum dolor sit amet consectetur. Facilisis fermentum cras ipsum et sit odio volutpat tristique. Facilisis fermentum cras ipsum et sit odio volutpat tristique. Facilisis fermentum cras ipsum et sit odio volutpat tristique.',
        skills: ['JavaScript', 'Redux', 'HTML', 'CSS'],
        developerCount: Math.floor(Math.random() * 500),
        remaining_quests: Math.floor(Math.random() * 5),
        deadline:
          status === 'completed' ? 0 : Math.floor(Math.random() * 29) + 1,
        rewardCash: Math.floor(Math.random() * 1000000),
        status: status,
        createdAt: randomDate.toISOString()
      }
    })
  ).current

  const searchBarRef = useRef<HTMLDivElement>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortType, setSortType] = useState('default')
  const [onlyActive, setOnlyActive] = useState(false)
  const itemsPerPage = 10

  const handleFocus = () => {
    if (searchBarRef.current) {
      searchBarRef.current.classList.add(styles.focused)
    }
  }

  const handleBlur = () => {
    if (searchBarRef.current) {
      searchBarRef.current.classList.remove(styles.focused)
    }
  }

  const handleSortChange = (sortType: string) => {
    setSortType(sortType)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const handleToggleChange = (checked: boolean) => {
    setOnlyActive(checked)
    setCurrentPage(1)
  }

  const filteredCards = cards
    .filter((card) =>
      card.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((card) => (onlyActive ? card.deadline > 0 : true))

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

  return (
    <div className={styles.background}>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <h2 className={`${styles.title} font-pixellari-hero`}>
            Blockchain Technology
          </h2>
          <div className={styles.searchBar} ref={searchBarRef}>
            <span>
              <SearchIcon strokeOpacity="0.65" />
            </span>
            <Input
              type="text"
              className={`${styles.searchBarInput} font-roboto-card-title`}
              placeholder="Find your project"
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </section>
        <section className={styles.flex}>
          <article className={styles.filters}>
            <SortFilter onSortChange={handleSortChange} />
            <Toggle label="Ongoing" onChange={handleToggleChange} />
          </article>
          <div className={styles.cardBox}>
            <div className={styles.asideFilter}>
              <div className={styles.category}>
                <p className={`text-color-white font-pixellari-sub-header`}>
                  Category
                </p>
                <CategoryFilter />
              </div>
              <div className={styles.filter}>
                <p className={`text-color-white font-pixellari-sub-header`}>
                  Filter
                </p>
                <ProjectFilter />
              </div>
            </div>
            <ul className={styles.cardList}>
              {currentItems.map((card) => (
                <Card className={styles.card} key={card.projectId} {...card} />
              ))}
            </ul>
          </div>
        </section>
        <Pagination
          className={styles.pagination}
          currentPage={currentPage}
          totalItems={sortedCards.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </main>
      <Footer />
    </div>
  )
}
