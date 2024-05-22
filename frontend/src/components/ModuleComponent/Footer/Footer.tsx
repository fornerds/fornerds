import React from 'react'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <>
      <div className={styles.footer}>
        <UpperBox />
        <DownBox />
      </div>
    </>
  )
}

function UpperBox() {
  return (
    <div className={styles.upperBox}>
      <div className={styles.upperLeftBox}>
        <div className={styles.logo}></div>
        <text className={styles.logoText}>Codes for all</text>
      </div>
      <div className={styles.upperRightBox}>
        <div className={styles.column}>
          <text className={`${styles.footerText} ${styles.textColor1}`}>
            Web development
          </text>
          <text className={`${styles.footerText} ${styles.textColor1}`}>
            text
          </text>
          <text className={`${styles.footerText} ${styles.textColor1}`}>
            text
          </text>
          <text className={`${styles.footerText} ${styles.textColor1}`}>
            text
          </text>
          <text className={`${styles.footerText} ${styles.textColor1}`}>
            text
          </text>
        </div>
        <div className={styles.column}>
          <text className={`${styles.footerText} ${styles.textColor1}`}>
            iOS development
          </text>
          <text className={`${styles.footerText} ${styles.textColor1}`}>
            text
          </text>
          <text className={`${styles.footerText} ${styles.textColor1}`}>
            text
          </text>
        </div>
        <div className={styles.column}>
          <text className={`${styles.footerText} ${styles.textColor1}`}>
            View project solutions
          </text>
          <text className={`${styles.footerText} ${styles.textColor1}`}>
            Explore projects
          </text>
          <text className={`${styles.footerText} ${styles.textColor1}`}>
            Community
          </text>
        </div>
      </div>
    </div>
  )
}

function DownBox() {
  return (
    <div className={styles.downBox}>
      <div className={styles.downRightBox}>
        <text className={`${styles.footerText} ${styles.textColor2}`}>
          Privacy Policy
        </text>
        <text className={`${styles.footerText} ${styles.textColor2}`}>
          Terms of Service
        </text>
      </div>
    </div>
  )
}
