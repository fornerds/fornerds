import React, { InputHTMLAttributes } from 'react'
import styles from './Input.module.css'
import { check } from 'prettier'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
  variant?:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'success'
    | 'warning'
    | 'info'
    | ''
  className?: string
  type?: string
  checked?: boolean
}

export function Input({
  error,
  variant = '',
  className = '',
  type = 'text',
  checked,
  ...props
}: InputProps) {
  const inputClass = `${styles.input} ${styles[variant]} ${className}`
  const errorClass = error ? styles.error : ''

  return (
    <input
      className={`${inputClass} ${errorClass}`}
      {...props}
      type={type}
      checked={checked}
    />
  )
}
