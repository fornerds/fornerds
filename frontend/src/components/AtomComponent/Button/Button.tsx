import React, { ReactNode, MouseEvent } from 'react'
import styles from './Button.module.css'

interface ButtonProps {
  children: ReactNode
  type?: 'button' | 'submit' | 'reset'
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  className?: string
}

export function Button({
  children,
  type = 'button',
  onClick,
  disabled = false,
  className = ''
}: ButtonProps) {
  const buttonClass = `${styles.button} ${className}`

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClass}
    >
      {children}
    </button>
  )
}

export default Button
