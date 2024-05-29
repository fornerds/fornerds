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
        <span className={styles.logoText}>Codes for all</span>
      </div>
      <div className={styles.upperRightBox}>
        <div className={styles.column}>
          <span className={`${styles.footerText} ${styles.textColor1}`}>
            Web development
          </span>
          <span className={`${styles.footerText} ${styles.textColor1}`}>
            text
          </span>
          <span className={`${styles.footerText} ${styles.textColor1}`}>
            text
          </span>
          <span className={`${styles.footerText} ${styles.textColor1}`}>
            text
          </span>
          <span className={`${styles.footerText} ${styles.textColor1}`}>
            text
          </span>
        </div>
        <div className={styles.column}>
          <span className={`${styles.footerText} ${styles.textColor1}`}>
            iOS development
          </span>
          <span className={`${styles.footerText} ${styles.textColor1}`}>
            text
          </span>
          <span className={`${styles.footerText} ${styles.textColor1}`}>
            text
          </span>
        </div>
        <div className={styles.column}>
          <span className={`${styles.footerText} ${styles.textColor1}`}>
            View project solutions
          </span>
          <span className={`${styles.footerText} ${styles.textColor1}`}>
            Explore projects
          </span>
          <span className={`${styles.footerText} ${styles.textColor1}`}>
            Community
          </span>
        </div>
      </div>
    </div>
  )
}

function DownBox() {
  return (
    <div className={styles.downBox}>
      <div className={styles.downRightBox}>
        <span className={`${styles.footerText} ${styles.textColor2}`}>
          Privacy Policy
        </span>
        <span className={`${styles.footerText} ${styles.textColor2}`}>
          Terms of Service
        </span>
      </div>
    </div>
  )
}
