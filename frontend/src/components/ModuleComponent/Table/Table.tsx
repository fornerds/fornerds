import React from 'react'
import styles from './Table.module.css'
import { SolutionProps } from './TableProps'
import characters from '../../../assets/images/character'

const formatDateToKoreanFormat = (isoString: string): string => {
  const date = new Date(isoString)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Asia/Seoul'
  }

  return date
    .toLocaleDateString('ko-KR', options)
    .replace(/\./g, '')
    .replace(/ /g, '.')
}

export function Table() {
  return <></>
}

export function SolutionTable(props: SolutionProps) {
  return (
    <li className={styles.solutionTableList}>
      <div
        className={`${styles.solutionTableItem} font-roboto-body-1 text-color-lighten`}
      >
        {props.id}
      </div>
      <div
        className={`${styles.solutionTableItem} font-roboto-body-1 text-color-lighten`}
      >
        {props.likeCount}
      </div>
      <div
        className={`${styles.solutionTableItem} ${styles.userInfo} font-roboto-body-1 text-color-lighten`}
      >
        <img
          src={characters[props.user_image]}
          alt={`Character ${props.user_image}`}
          width="36"
          height="36"
        />
        {props.user_name}
      </div>
      <div
        className={`${styles.solutionTableItem} font-roboto-body-1 text-color-lighten`}
      >
        {props.codeLength} B
      </div>
      <div
        className={`${styles.solutionTableItem} font-roboto-body-1 text-color-lighten`}
      >
        {props.executionTime} ms
      </div>
      <div
        className={`${styles.solutionTableItem} font-roboto-body-1 text-color-lighten`}
      >
        {props.memoryUsage} KB
      </div>
      <div
        className={`${styles.solutionTableItem} font-roboto-body-1 text-color-default`}
      >
        {formatDateToKoreanFormat(props.createdAt)}
      </div>
    </li>
  )
}
