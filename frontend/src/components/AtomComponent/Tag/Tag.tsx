import React, { ReactNode } from 'react'
import styles from './Tag.module.css'

interface TagProps {
  children: ReactNode
  variant?: 'ongoing' | 'finished' | 'disabled' | 'info' | 'default'
  className?: string
}

export function Tag({ children, variant = 'info', className = '' }: TagProps) {
  const tagClass = `${styles.tag} ${styles[variant]} ${className}`

  return <span className={tagClass}>{children}</span>
}
