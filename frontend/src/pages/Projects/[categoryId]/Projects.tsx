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
import { useParams } from 'react-router-dom'

function getRandomElements(arr: string[], min: number, max: number) {
  const result = []
  const numElements = Math.floor(Math.random() * (max - min + 1)) + min
  const usedIndices = new Set()

  while (result.length < numElements) {
    const randomIndex = Math.floor(Math.random() * arr.length)

    if (!usedIndices.has(randomIndex)) {
      result.push(arr[randomIndex])
      usedIndices.add(randomIndex)
    }
  }

  return result
}

interface Filter {
  [key: string]: boolean
}

export function Projects() {
  const { categoryId } = useParams<{ categoryId: string }>()

  // 카테고리 더미 데이터
  const categories = [
    { id: 1, name: 'Web development' },
    { id: 2, name: 'iOS development' },
    { id: 3, name: 'Android development' },
    { id: 4, name: 'Game development' },
    { id: 5, name: 'AI, ML & Data science' },
    { id: 6, name: 'Cyber security' },
    { id: 7, name: 'Embedded systems' },
    { id: 8, name: 'Internet of things' },
    { id: 9, name: 'Blockchain technology' }
  ]

  // 카드 더미 데이터
  const cards = useRef(
    Array.from({ length: 53 }, (_, i) => {
      const status = ['inProgress', 'completed'][
        Math.floor(Math.random() * 2)
      ] as 'inProgress' | 'completed'
      const randomDate = new Date()
      randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 365))
      const rewardType = Math.floor(Math.random() * 3) + 1
      return {
        projectId: i + 1,
        difficulty: ['Easy', 'Medium', 'Hard'][Math.floor(Math.random() * 3)],
        isBookmarked: Math.random() > 0.5,
        bookmarkCount: Math.floor(Math.random() * 500),
        title: `Project name ${i + 1}`,
        description:
          'Lorem ipsum dolor sit amet consectetur. Facilisis fermentum cras ipsum et sit odio volutpat tristique. Facilisis fermentum cras ipsum et sit odio volutpat tristique. Facilisis fermentum cras ipsum et sit odio volutpat tristique.',
        skills: getRandomElements(['JavaScript', 'Redux', 'HTML', 'CSS'], 1, 4),
        developerCount: Math.floor(Math.random() * 500),
        remaining_quests: Math.floor(Math.random() * 5),
        deadline:
          status === 'completed' ? 0 : Math.floor(Math.random() * 29) + 1,
        rewardCash:
          rewardType === 1 || rewardType === 3
            ? Math.floor(Math.random() * 1000000)
            : 0,
        rewardExp:
          rewardType === 2 || rewardType === 3
            ? Math.floor(Math.random() * 1000000)
            : 0,
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
  const [languageFilter, setLanguageFilter] = useState<Filter>({
    JavaScript: false,
    Redux: false,
    HTML: false,
    CSS: false
  })
  const [difficultyFilter, setDifficultyFilter] = useState<Filter>({
    Hard: false,
    Medium: false,
    Easy: false
  })
  const [rewardFilter, setRewardFilter] = useState<Filter>({
    rewardCash: false,
    rewardExp: false
  })

  const isFilterAllNonCheck = (filter: Filter) => {
    return !Object.values(filter).some((value) => value)
  }

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

  const handleLanguageFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, checked } = e.target
    setLanguageFilter({
      ...languageFilter,
      [name]: checked
    })
  }

  const handleDifficultyFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, checked } = e.target
    setDifficultyFilter({
      ...difficultyFilter,
      [name]: checked
    })
  }

  const handleRewardFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setRewardFilter({
      ...rewardFilter,
      [name]: checked
    })
  }

  const filteredCards = cards
    .filter((card) =>
      card.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((card) => (onlyActive ? card.deadline > 0 : true))
    .filter((card) =>
      isFilterAllNonCheck(languageFilter)
        ? true
        : card.skills.some((skill) => languageFilter[skill])
    )
    .filter((card) =>
      isFilterAllNonCheck(difficultyFilter)
        ? true
        : difficultyFilter[card.difficulty]
    )
    .filter((card) => {
      if (isFilterAllNonCheck(rewardFilter)) {
        return true
      } else {
        if (rewardFilter.rewardCash && !rewardFilter.rewardExp) {
          return card.rewardCash
        } else if (!rewardFilter.rewardCash && rewardFilter.rewardExp) {
          return card.rewardExp && !card.rewardCash
        } else {
          return true
        }
      }
    })

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

  const category = categories.find(
    (cat) => cat.id === parseInt(categoryId ?? '1')
  )
  const categoryName = category ? category.name : 'Category not found'

  return (
    <div className={styles.background}>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <h2 className={`${styles.title} font-pixellari-hero`}>
            {categoryName}
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
            <aside className={styles.asideFilter}>
              <div className={styles.category}>
                <p className={`text-color-white font-pixellari-sub-header`}>
                  Category
                </p>
                <CategoryFilter categories={categories} />
              </div>
              <div className={styles.filter}>
                <p className={`text-color-white font-pixellari-sub-header`}>
                  Filter
                </p>
                <ProjectFilter
                  languageFilter={languageFilter}
                  difficultyFilter={difficultyFilter}
                  rewardFilter={rewardFilter}
                  onLanguageFilterChange={handleLanguageFilterChange}
                  onDifficultyFilterChange={handleDifficultyFilterChange}
                  onRewardFilterChange={handleRewardFilterChange}
                />
              </div>
            </aside>
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
