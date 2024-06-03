import React, { useState } from 'react'
import styles from './CategoryFilter.module.css'
import { Button } from '../../../AtomComponent'
import { ReactComponent as DownSmall } from '../../../../assets/icons/down_small.svg'
import { ReactComponent as UpSmall } from '../../../../assets/icons/up_small.svg'

export function CategoryFilter() {
  const [isOpen, setIsOpen] = useState(false)
  const [category, setCategory] = useState('iOS Development')
  const handleDownClick = () => {
    setIsOpen(!isOpen)
  }
  const selectCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonText = event.currentTarget.textContent
    if (buttonText != null) setCategory(buttonText)
    setIsOpen(!isOpen)
  }

  return (
    <>
      <div className={styles.dropdown}>
        <Button
          className={`${styles.dropdownButton} ${isOpen ? `${styles.backgroundOff}` : `${styles.backgroundOn}`}  text-color-white font-roboto-body-2`}
          onClick={handleDownClick}
        >
          {category}
          {isOpen ? <DownSmall stroke="white" /> : <UpSmall stroke="white" />}
        </Button>

        <div
          className={`${styles.dropdownMenu} ${isOpen ? `${styles.show}` : null}`}
        >
          {isOpen && (
            <>
              <Button
                className={`${styles.dropdownItem} text-color-white font-roboto-body-2`}
                onClick={selectCategory}
              >
                item1
              </Button>
              <Button
                className={`${styles.dropdownItem} text-color-white font-roboto-body-2`}
                onClick={selectCategory}
              >
                item2
              </Button>
              <Button
                className={`${styles.dropdownItem} text-color-white font-roboto-body-2`}
                onClick={selectCategory}
              >
                item3
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  )
}
