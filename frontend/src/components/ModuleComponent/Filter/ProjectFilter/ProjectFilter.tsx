import React, { useState } from 'react'
import styles from './ProjectFilter.module.css'
import { Button } from '../../../AtomComponent'
import { Input, CheckBox } from '../../../AtomComponent'
import { ReactComponent as DownSmall } from '../../../../assets/icons/down_small.svg'
import { ReactComponent as UpSmall } from '../../../../assets/icons/up_small.svg'
import MoneyPixelIcon from '../../../../assets/images/pixel/money.webp'
import CupPixelIcon from '../../../../assets/images/pixel/cup.webp'

interface Filter {
  [key: string]: boolean
}

interface ProjectFilterProps {
  languageFilter: Filter
  difficultyFilter: Filter
  rewardFilter: Filter
  onLanguageFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onDifficultyFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRewardFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function ProjectFilter({
  languageFilter,
  difficultyFilter,
  rewardFilter,
  onLanguageFilterChange,
  onDifficultyFilterChange,
  onRewardFilterChange
}: ProjectFilterProps) {
  const [isLanguageOpen, setLanguageOpen] = useState(false)
  const languageHandleDownClick = () => {
    setLanguageOpen(!isLanguageOpen)
  }
  const [isDifficultyOpen, setDifficultyOpen] = useState(false)
  const difficultyHandleDownClick = () => {
    setDifficultyOpen(!isDifficultyOpen)
  }
  const [isRewardOpen, setRewardOpen] = useState(false)
  const rewardHandleDownClick = () => {
    setRewardOpen(!isRewardOpen)
  }
  const moneyImg = {
    src: MoneyPixelIcon,
    alt: 'MoneyPixel',
    width: 27,
    height: 18
  }
  const cupImg = {
    src: CupPixelIcon,
    alt: 'CupPixel',
    width: 20,
    height: 20
  }
  return (
    <div className={styles.projectFilter}>
      <div className={styles.dropdown}>
        <Button
          className={`${styles.dropdownButton}  text-color-white font-roboto-body-2`}
          onClick={languageHandleDownClick}
        >
          Language
          {isLanguageOpen ? (
            <DownSmall stroke="white" />
          ) : (
            <UpSmall stroke="white" />
          )}
        </Button>
        <div
          className={`${styles.dropdownMenu} ${isLanguageOpen ? `${styles.show}` : null}`}
        >
          {isLanguageOpen && (
            <>
              <CheckBox
                name="JavaScript"
                label="JavaScript"
                onChange={onLanguageFilterChange}
                checked={languageFilter.JavaScript}
              />
              <CheckBox
                name="Redux"
                label="Redux"
                onChange={onLanguageFilterChange}
                checked={languageFilter.Redux}
              />
              <CheckBox
                name="HTML"
                label="HTML"
                onChange={onLanguageFilterChange}
                checked={languageFilter.HTML}
              />
              <CheckBox
                name="CSS"
                label="CSS"
                onChange={onLanguageFilterChange}
                checked={languageFilter.CSS}
              />
            </>
          )}
        </div>
      </div>
      <div className={styles.dropdown}>
        <Button
          className={`${styles.dropdownButton}  text-color-white font-roboto-body-2`}
          onClick={difficultyHandleDownClick}
        >
          Difficulty
          {isDifficultyOpen ? (
            <DownSmall stroke="white" />
          ) : (
            <UpSmall stroke="white" />
          )}
        </Button>
        <div
          className={`${styles.dropdownMenu} ${isDifficultyOpen ? `${styles.show}` : null}`}
        >
          {isDifficultyOpen && (
            <>
              <CheckBox
                name="Hard"
                label="Hard"
                onChange={onDifficultyFilterChange}
                checked={difficultyFilter.Hard}
              />
              <CheckBox
                name="Medium"
                label="Medium"
                onChange={onDifficultyFilterChange}
                checked={difficultyFilter.Medium}
              />
              <CheckBox
                name="Easy"
                label="Easy"
                onChange={onDifficultyFilterChange}
                checked={difficultyFilter.Easy}
              />
            </>
          )}
        </div>
      </div>
      <div className={styles.dropdown}>
        <Button
          className={`${styles.dropdownButton}  text-color-white font-roboto-body-2`}
          onClick={rewardHandleDownClick}
        >
          Reward
          {isRewardOpen ? (
            <DownSmall stroke="white" />
          ) : (
            <UpSmall stroke="white" />
          )}
        </Button>
        <div
          className={`${styles.dropdownMenu} ${isRewardOpen ? `${styles.show}` : null}`}
        >
          {isRewardOpen && (
            <>
              <CheckBox
                name="rewardCash"
                label="Only"
                iconImage={moneyImg}
                onChange={onRewardFilterChange}
                checked={rewardFilter.rewardCash}
              />
              <CheckBox
                name="rewardExp"
                label="Only"
                iconImage={cupImg}
                onChange={onRewardFilterChange}
                checked={rewardFilter.rewardExp}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
