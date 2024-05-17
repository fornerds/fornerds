import React, { ReactNode } from 'react'
import styles from './Tag.module.css'

interface TagProps {
  children: ReactNode
  variant?: 'active' | 'default' | 'disabled'
  className?: string
  rounded?: boolean
}

export function Tag({
  children,
  variant = 'default',
  className = '',
  rounded
}: TagProps) {
  const tagClass = `${styles.tag} ${styles[variant]} ${rounded ? styles.rounded : ''} ${className}`

  return <span className={tagClass}>{children}</span>
}
