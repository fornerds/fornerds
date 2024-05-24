import React from 'react'
import styles from './Toggle.module.css'
import { Input } from '../Input'

interface ToggleProps {
  label: string
  onChange: (checked: boolean) => void
}

export function Toggle({ label, onChange }: ToggleProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked)
  }

  return (
    <label className={styles.toggleContainer}>
      <span className={`${styles.toggleLabel} font-roboto-body-2`}>
        {label}
      </span>
      <Input
        type="checkbox"
        className={styles.toggleInput}
        onChange={handleChange}
      />
      <span className={styles.slider}></span>
    </label>
  )
}
