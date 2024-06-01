import React from 'react'
import styles from './CheckBox.module.css'
import { Input } from '../Input'
import { ReactComponent as Check } from '../../../../assets/icons/check.svg'

interface iconImageProps {
  src: string
  alt: string
  width: number
  height: number
}

interface CheckBoxProps {
  label: string
  iconImage?: iconImageProps
}

export function CheckBox({ label, iconImage }: CheckBoxProps) {
  return (
    <label className={styles.checkBoxContainer}>
      <Input type="checkbox" className={styles.checkBoxInput} />
      <span className={styles.checkBox}>
        <div className={styles.checked}>
          {/* <Check width="10.624" height="7.622" /> */}
          <Check className={styles.checked} width="17" height="11.5" />
        </div>
      </span>
      {iconImage ? (
        <div className={styles.iconImage}>
          <img
            src={iconImage.src}
            alt={iconImage.alt}
            width={iconImage.width}
            height={iconImage.height}
          ></img>
        </div>
      ) : null}
      <span className={`${styles.labelText} font-roboto-body-2`}>{label}</span>
    </label>
  )
}
