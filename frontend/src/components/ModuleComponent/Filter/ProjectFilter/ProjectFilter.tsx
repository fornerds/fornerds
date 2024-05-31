import React, { useState } from 'react'
import styles from './ProjectFilter.module.css'
import { Button } from '../../../AtomComponent'
import { Input, CheckBox } from '../../../AtomComponent'
import { ReactComponent as DownSmall } from '../../../../assets/icons/down_small.svg'
import { ReactComponent as UpSmall } from '../../../../assets/icons/up_small.svg'
import { ReactComponent as Check } from '../../../../assets/icons/check.svg'

export function ProjectFilter() {
  const [isOpen, setIsOpen] = useState(false)
  const handleDownClick = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div className={styles.projectFilter}>
      <div className={styles.dropdown}>
        <Button
          className={`${styles.dropdownButton}  text-color-white font-roboto-body-2`}
          onClick={handleDownClick}
        >
          Language
          {isOpen ? <DownSmall stroke="white" /> : <UpSmall stroke="white" />}
        </Button>
        <div
          className={`${styles.dropdownMenu} ${isOpen ? `${styles.show}` : null}`}
        >
          {isOpen && (
            <>
              <CheckBox label="Java" />
              <CheckBox label="text" />
              <CheckBox label="text" />
              <CheckBox label="text" />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
