import React, { useState } from 'react'
import styles from './CategoryFilter.module.css'
import { Button } from '../../../AtomComponent'
import { ReactComponent as DownSmall } from '../../../../assets/icons/down_small.svg'
import { ReactComponent as UpSmall } from '../../../../assets/icons/up_small.svg'
import { useNavigate } from 'react-router-dom'

interface Category {
  id: number
  name: string
}

interface CategoryFilterProps {
  categories: Category[]
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [category, setCategory] = useState(
    categories ? categories[0].name : 'Web development'
  )
  const handleDownClick = () => {
    setIsOpen(!isOpen)
  }
  const navigate = useNavigate()
  const selectCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonText = event.currentTarget.textContent
    const buttonID = event.currentTarget.getAttribute('itemID')
    if (buttonText != null) setCategory(buttonText)
    setIsOpen(!isOpen)
    navigate(`/projects/${buttonID}`)
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
              {categories.map((category, index) => (
                <Button
                  key={category.id}
                  className={`${styles.dropdownItem} text-color-white font-roboto-body-2`}
                  onClick={selectCategory}
                  itemID={category.id.toString()}
                >
                  {category.name}
                </Button>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  )
}
