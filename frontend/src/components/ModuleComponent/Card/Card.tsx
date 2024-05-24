import React, { useState } from 'react'
import styles from './Card.module.css'
import { CardProps } from './CardProps'
import { Link, Tag } from '../../AtomComponent'
import { ReactComponent as Hard_white } from '../../../assets/icons/hard_white.svg'
import { ReactComponent as Medium_white } from '../../../assets/icons/medium_white.svg'
import { ReactComponent as Easy_white } from '../../../assets/icons/easy_white.svg'
import { ReactComponent as Hard_disabled } from '../../../assets/icons/hard_disabled.svg'
import { ReactComponent as Medium_disabled } from '../../../assets/icons/medium_disabled.svg'
import { ReactComponent as Easy_disabled } from '../../../assets/icons/easy_disabled.svg'
import { ReactComponent as Users } from '../../../assets/icons/users.svg'
import { ReactComponent as Code_bracket } from '../../../assets/icons/code_bracket.svg'
import { ReactComponent as Calendar } from '../../../assets/icons/calendar.svg'
import { ReactComponent as Right } from '../../../assets/icons/right.svg'
import { Bookmark } from '../Bookmark'
import money from '../../../assets/images/pixel/money.webp'
import cup from '../../../assets/images/pixel/cup.webp'

export function Card(props: CardProps) {
  const [isBookmarked, setIsBookmarked] = useState(props.isBookmarked || false)
  const [bookmarkCount, setBookmarkCount] = useState(props.bookmarkCount || 0)

  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked)
    setBookmarkCount(isBookmarked ? bookmarkCount - 1 : bookmarkCount + 1)
  }

  return (
    <li
      className={
        props.className
          ? `${styles.card} ${props.className} ${props.status === 'inProgress' ? '' : styles.completedCard}`.trim()
          : `${styles.card} ${props.status === 'inProgress' ? '' : styles.completedCard}`.trim()
      }
    >
      <div>
        <header className={styles.header}>
          {props.status === 'inProgress' ? (
            <Tag className={styles.difficulty} variant="lighten" rounded>
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
          ) : (
            <Tag className={styles.difficulty} variant="default" rounded>
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
          )}
          <Bookmark
            isBookmarked={isBookmarked}
            bookmarkCount={bookmarkCount}
            onBookmarkClick={handleBookmarkClick}
          />
        </header>
        <main className={styles.content}>
          <div className={styles.textWrap}>
            <h2 className={`${styles.title} font-roboto-card-title`}>
              {props.title}
            </h2>
            <p className={`${styles.description} font-roboto-body-2`}>
              {props.description}
            </p>
          </div>
          <div className={styles.skills}>
            {props.skills &&
              props.skills.map((skill, index) => (
                <Tag
                  key={index}
                  className={`${styles.skill} font-roboto-button`}
                  variant="default"
                >
                  {skill}
                </Tag>
              ))}
          </div>
        </main>
        <hr className={styles.line} />
        <footer className={styles.footer}>
          <span className={`${styles.footerItem} font-roboto-body-2`}>
            <Users width="24" height="24" /> {props.developerCount} Developers
          </span>
          <span className={`${styles.footerItem} font-roboto-body-2`}>
            <Code_bracket width="24" height="24" /> {props.remaining_quests}{' '}
            Quests left
          </span>
          <span className={`${styles.footerItem} font-roboto-body-2`}>
            <Calendar width="24" height="24" />
            {props.deadline && props.deadline > 0
              ? `${props.deadline} Days left`
              : 'Closed'}
          </span>
        </footer>
      </div>
      <Link className={styles.earn} to={`/projects/1/${props.projectId}`}>
        {props.rewardCash || props.rewardExp ? (
          <>
            <img
              src={props.rewardCash ? money : cup}
              alt={props.rewardCash ? 'money' : 'cup'}
              width={props.rewardCash ? '45px' : '30px'}
              height="30px"
            />
            <span className={`${styles.footerItem} font-roboto-body-2`}>
              {(props.rewardCash && props.rewardCash.toLocaleString()) ||
                (props.rewardExp && props.rewardExp.toLocaleString())}
            </span>
          </>
        ) : (
          ''
        )}
        <Right stroke="#00C4B4" />
      </Link>
    </li>
  )
}
