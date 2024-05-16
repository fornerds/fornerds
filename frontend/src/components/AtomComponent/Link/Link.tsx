import React, { ReactNode, AnchorHTMLAttributes } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import styles from './Link.module.css'

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
  to: string
  underline?: boolean
  className?: string
}

export function Link({
  children,
  to,
  underline = false,
  className = '',
  ...props
}: LinkProps) {
  const linkClass = `${styles.link} ${
    underline ? styles.underline : ''
  } ${className}`

  return (
    <RouterLink to={to} className={linkClass} {...props}>
      {children}
    </RouterLink>
  )
}
