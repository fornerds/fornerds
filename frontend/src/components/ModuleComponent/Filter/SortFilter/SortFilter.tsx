import React, { useState } from 'react'
import styles from './SortFilter.module.css'
import { ReactComponent as SortIcon } from '../../../../assets/icons/sort.svg'
import { Button } from '../../../AtomComponent'

interface SortDropdownProps {
  onSortChange: (sortType: string) => void
  isSolutionSort?: boolean
}

export function SortFilter({
  onSortChange,
  isSolutionSort
}: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleDropdownClick = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (sortType: string) => {
    onSortChange(sortType)
    setIsOpen(false)
  }

  return (
    <div className={styles.dropdown}>
      <Button
        className={`${styles.dropdownButton} font-roboto-body-2`}
        onClick={handleDropdownClick}
      >
        Sort <SortIcon />
      </Button>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          <Button
            className={`${styles.dropdownItem} font-roboto-body-2`}
            onClick={() => handleOptionClick('Popular')}
          >
            Most popular
          </Button>
          <Button
            className={`${styles.dropdownItem} font-roboto-body-2`}
            onClick={() => handleOptionClick('Recent')}
          >
            Recent
          </Button>
          {!isSolutionSort && (
            <>
              <Button
                className={`${styles.dropdownItem} font-roboto-body-2`}
                onClick={() => handleOptionClick('Expire')}
              >
                Expire soon
              </Button>
              <Button
                className={`${styles.dropdownItem} font-roboto-body-2`}
                onClick={() => handleOptionClick('Reward')}
              >
                Highest reward
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
