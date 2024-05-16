import React, { InputHTMLAttributes } from 'react'
import styles from './Input.module.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info'
  className?: string
  type?: string
}

export function Input({
  error,
  variant = 'primary',
  className = '',
  type = 'text',
  ...props
}: InputProps) {
  const inputClass = `${styles.input} ${styles[variant]} ${className}`
  const errorClass = error ? styles.error : ''

  return (
    <input className={`${inputClass} ${errorClass}`} {...props} type={type} />
  )
}
