import React, { useState, useEffect } from 'react'
import styles from './Ranking.module.css'
import { Footer, Header } from '../../components/ModuleComponent'
import backgroundTop from '../../assets/images/background/background03.webp'
import backgroundBottom from '../../assets/images/background/background04.webp'
import characters from '../../assets/images/character'
import { ReactComponent as RiseIcon } from '../../assets/icons/rise.svg'
import { ReactComponent as KeepIcon } from '../../assets/icons/keep.svg'
import { ReactComponent as DescendIcon } from '../../assets/icons/descend.svg'
import { Button } from '../../components/AtomComponent'

const sampleData = Array.from({ length: 50 }, (_, index) => ({
  rank: index + 1,
  userImage: Math.floor(Math.random() * 10),
  userName: `User ${index + 1}`,
  country: 'South Korea',
  level: Math.floor(Math.random() * 100), // 랜덤 레벨 값
  totalQuestNumber: Math.floor(Math.random() * 500), // 랜덤 퀘스트 수
  rankChange: Math.floor(Math.random() * 3) - 1 // -1, 0, 1 중 하나의 값
}))

export function Ranking() {
  const [visibleItems, setVisibleItems] = useState(25)
  const [sortedData, setSortedData] = useState(sampleData)

  useEffect(() => {
    const sorted = [...sampleData].sort((a, b) => b.level - a.level)
    setSortedData(sorted.map((item, index) => ({ ...item, rank: index + 1 })))
  }, [])

  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + 25)
  }

  const getRankChangeIcon = (change: number) => {
    if (change > 0) return <RiseIcon />
    if (change < 0) return <DescendIcon />
    return <KeepIcon />
  }

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
          <div className={styles.contentBox}>
            <section className={styles.ranking}>
              <div className={styles.rankingHeaderWrap}>
                <div className={styles.rankingHeader}>
                  <div className={styles.rankingIndex}>
                    <p className="font-roboto-cta-small text-color-lighten">
                      Rank
                    </p>
                  </div>
                  <div
                    className={`${styles.rankingIndex} ${styles.rankingchangeIndex}`}
                  ></div>
                  <div className={styles.rankingIndex}>
                    <p className="font-roboto-cta-small text-color-lighten">
                      User
                    </p>
                  </div>
                  <div className={styles.rankingIndex}>
                    <p className="font-roboto-cta-small text-color-lighten">
                      Nation
                    </p>
                  </div>
                  <div className={styles.rankingIndex}>
                    <p className="font-roboto-cta-small text-color-lighten">
                      Level
                    </p>
                  </div>
                  <div className={styles.rankingIndex}>
                    <p className="font-roboto-cta-small text-color-lighten">
                      Total Quest Number
                    </p>
                  </div>
                </div>
              </div>
              <ol className={styles.rankingList}>
                {sortedData.slice(0, visibleItems).map((user, index) => (
                  <li key={index} className={styles.rankingListItem}>
                    <div className={styles.rankingIndex}>
                      <p className="font-roboto-cta-small text-color-default">
                        {user.rank}
                      </p>
                    </div>
                    <span
                      className={`${styles.rankingIndex} ${styles.rankingchangeIndex}`}
                    >
                      {getRankChangeIcon(user.rankChange)}
                    </span>
                    <div className={styles.rankingIndex}>
                      <img
                        src={characters[user.userImage]}
                        alt={`User ${user.rank}`}
                        className={styles.userImage}
                        width="36"
                        height="36"
                      />
                      <p className="font-roboto-body-1 text-color-default">
                        {user.userName}
                      </p>
                    </div>
                    <div className={styles.rankingIndex}>
                      <p className="font-roboto-body-1 text-color-default">
                        {user.country}
                      </p>
                    </div>
                    <div className={styles.rankingIndex}>
                      <p className="font-roboto-body-1 text-color-default">
                        {user.level}
                      </p>
                    </div>
                    <div className={styles.rankingIndex}>
                      <p className="font-roboto-body-1 text-color-default">
                        {user.totalQuestNumber}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
            {visibleItems < 50 && (
              <div className={styles.loadMore}>
                <Button
                  onClick={handleLoadMore}
                  className={`${styles.loadMoreButton} font-roboto-cta-small text-color-default`}
                >
                  Load more
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
