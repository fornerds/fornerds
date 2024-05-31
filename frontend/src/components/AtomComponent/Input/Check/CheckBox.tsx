import React from 'react'
import styles from './CheckBox.module.css'
import { Input } from '../Input'
import { ReactComponent as Check } from '../../../../assets/icons/check.svg'

interface CheckBoxProps {
  label: string
}

export function CheckBox({ label }: CheckBoxProps) {
  return (
    <label className={styles.checkBoxContainer}>
      <Input type="checkbox" className={styles.checkBoxInput} />
      <span className={styles.checkBox}>
        <div className={styles.checked}>
          {/* <Check width="10.624" height="7.622" /> */}
          <Check className={styles.checked} width="17" height="11.5" />
        </div>
      </span>
      <span className={'text-color-lighten font-roboto-body-2'}>{label}</span>
    </label>
  )
}
