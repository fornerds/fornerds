import React, { useState } from 'react'
import styles from './ProjectFilter.module.css'
import { Button } from '../../../AtomComponent'
import { Input, CheckBox } from '../../../AtomComponent'
import { ReactComponent as DownSmall } from '../../../../assets/icons/down_small.svg'
import { ReactComponent as UpSmall } from '../../../../assets/icons/up_small.svg'
import { ReactComponent as Check } from '../../../../assets/icons/check.svg'

export function ProjectFilter() {
  const [isLanguageOpen, setLanguageOpen] = useState(false)
  const languageHandleDownClick = () => {
    setLanguageOpen(!isLanguageOpen)
  }
  const [isDifficultyOpen, setDifficultyOpen] = useState(false)
  const difficultyHandleDownClick = () => {
    setDifficultyOpen(!isDifficultyOpen)
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
              <CheckBox label="Java" />
              <CheckBox label="text" />
              <CheckBox label="text" />
              <CheckBox label="text" />
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
              <CheckBox label="Hard" />
              <CheckBox label="Medium" />
              <CheckBox label="Easy" />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
