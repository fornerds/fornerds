import React, { useState } from 'react'
import styles from './QuestCard.module.css'
import { QuestCardProps } from './CardProps'
import { Link, Tag } from '../../AtomComponent'
import { ReactComponent as Hard_white } from '../../../assets/icons/hard_white.svg'
import { ReactComponent as Medium_white } from '../../../assets/icons/medium_white.svg'
import { ReactComponent as Easy_white } from '../../../assets/icons/easy_white.svg'
import { ReactComponent as Hard_disabled } from '../../../assets/icons/hard_disabled.svg'
import { ReactComponent as Medium_disabled } from '../../../assets/icons/medium_disabled.svg'
import { ReactComponent as Easy_disabled } from '../../../assets/icons/easy_disabled.svg'
import { ReactComponent as Users } from '../../../assets/icons/users.svg'
import { ReactComponent as Calendar } from '../../../assets/icons/calendar.svg'
import { Bookmark } from '../Bookmark'
import money from '../../../assets/images/pixel/money.webp'
import cup from '../../../assets/images/pixel/cup.webp'
import closed from '../../../assets/images/pixel/closed.webp'
import open from '../../../assets/images/pixel/open.webp'
import half_open from '../../../assets/images/pixel/half_open.webp'

export function QuestCard(props: QuestCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(props.isBookmarked || false)
  const [hovered, setHovered] = useState(false)

  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleMouseEnter = () => {
    setHovered(true)
  }

  const handleMouseLeave = () => {
    setHovered(false)
  }

  return (
    <li
      className={
        props.className
          ? `${styles.card} ${props.className} ${props.status === 'inProgress' ? '' : styles.completedCard}`.trim()
          : `${styles.card} ${props.status === 'inProgress' ? '' : styles.completedCard}`.trim()
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      draggable={false}
    >
      <div className={styles.bookmarkContainer}>
        <Bookmark
          isBookmarked={isBookmarked}
          onBookmarkClick={handleBookmarkClick}
        />
      </div>
      <Link to={props.link} draggable={false}>
        <header className={styles.header}>
          <div className={styles.tagContainer}>
            {props.status === 'inProgress' ? (
              <>
                <Tag
                  className={`${styles.difficulty} font-roboto-body-3`}
                  variant="lighten"
                  rounded
                >
                  {props.difficulty === 'Hard' ? (
                    <Hard_white width="16" height="16" />
                  ) : props.difficulty === 'Medium' ? (
                    <Medium_white width="16" height="16" />
                  ) : props.difficulty === 'Easy' ? (
                    <Easy_white width="16" height="16" />
                  ) : (
                    ''
                  )}
                  {props.difficulty}
                </Tag>
                <Tag
                  className={`${styles.position} font-roboto-body-3`}
                  variant="active"
                >
                  {props.positionName}
                </Tag>
              </>
            ) : (
              <>
                <Tag
                  className={`${styles.difficulty} font-roboto-body-3`}
                  variant="disabled"
                  rounded
                >
                  {props.difficulty === 'Hard' ? (
                    <Hard_disabled width="16" height="16" />
                  ) : props.difficulty === 'Medium' ? (
                    <Medium_disabled width="16" height="16" />
                  ) : props.difficulty === 'Easy' ? (
                    <Easy_disabled width="16" height="16" />
                  ) : (
                    ''
                  )}
                  {props.difficulty}
                </Tag>
                <Tag
                  className={`${styles.position} font-roboto-body-3`}
                  variant="disabled"
                >
                  {props.positionName}
                </Tag>
              </>
            )}
          </div>
        </header>
        <main className={styles.content}>
          <h2
            className={`${styles.title} text-color-lighten  font-roboto-card-title`}
          >
            {props.title}
          </h2>
          <img
            src={
              props.deadline && props.deadline > 0 && !props.opened && hovered
                ? half_open
                : props.opened
                  ? open
                  : closed
            }
            alt="reward"
            className={styles.rewardImage}
            width="60"
            height="60"
            draggable="false"
          />
          <div className={styles.rewardInfo}>
            {props.rewardCash && (
              <div className={styles.rewardItem}>
                <img
                  src={money}
                  alt="money"
                  width="27"
                  height="18"
                  draggable={false}
                />
                <span className="text-color-lighten  font-roboto-button">
                  {props.rewardCash.toLocaleString()}
                </span>
              </div>
            )}
            {props.rewardExp && (
              <div className={styles.rewardItem}>
                <img
                  src={cup}
                  alt="experience"
                  width="20"
                  height="20"
                  draggable={false}
                />
                <span className="text-color-lighten  font-roboto-button">
                  {props.rewardExp.toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </main>
        <footer className={styles.footer}>
          <div className={styles.footerDetails}>
            <span className={`${styles.footerItem} font-roboto-body-2`}>
              <Users width="24" height="24" />
              <p
                className={`${styles.users} text-color-lighten  font-roboto-button`}
              >
                {props.developerCount} Developers
              </p>
            </span>
            <span className={`${styles.footerItem} font-roboto-body-2`}>
              <Calendar width="24" height="24" />
              <p
                className={`${styles.date} text-color-lighten  font-roboto-button`}
              >
                {props.deadline && props.deadline > 0
                  ? `${props.deadline} Days left`
                  : 'Closed'}
              </p>
            </span>
          </div>
        </footer>
      </Link>
    </li>
  )
}
