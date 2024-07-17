import React from 'react'
import styles from './Home.module.css'
import { Link } from '../../components/AtomComponent'
import backgroundTop from '../../assets/images/background/background03.webp'
import { Footer, Header, LottieWrapper } from '../../components/ModuleComponent'
import projectCardLottie from '../../assets/lotties/projectCard.json'
import questBoardTapLottie from '../../assets/lotties/questBoardTap.json'
import questDetailLottie from '../../assets/lotties/questDetail.json'
import codingLottie from '../../assets/lotties/coding.json'
import userInfoTabLottie from '../../assets/lotties/userInfoTab.json'
import rankingLottie from '../../assets/lotties/ranking.json'
import section01 from '../../assets/images/sections/section01.png'
import section02 from '../../assets/images/sections/section02.png'
import section03 from '../../assets/images/sections/section03.png'

export function Home() {
  return (
    <div className={styles.background}>
      <div
        className={styles.backgroundImage}
        style={{ backgroundImage: `url(${backgroundTop})` }}
      ></div>
      <div className={styles.content}>
        <Header />
        <main className={styles.main}>
          <section className={styles.mainCTAWrap}>
            <div className={styles.mainTitleWrap}>
              <h2
                className={`font-pixellari-hero text-color-lighten ${styles.mainTitle}`}
              >
                Fornerds is the new standard for developers
              </h2>
              <p className="font-roboto-header-3 text-color-lighten">
                Level up your skills with real world projects
              </p>
            </div>
            <Link
              to="/worldmap"
              className={`font-roboto-sub-header text-color-lighten ${styles.CTAButton}`}
            >
              Explore projects
            </Link>
          </section>
          <section className={styles.mainSection}>
            <article className={styles.section01Article}>
              <img src={section01} alt="첫 세션" className={styles.section01} />
              <LottieWrapper
                animationData={projectCardLottie}
                className={styles.projectCardLottie}
              />
              <LottieWrapper
                animationData={questBoardTapLottie}
                className={styles.questBoardTapLottie}
              />
            </article>
            <article className={styles.section02Article}>
              <img
                src={section02}
                alt="두번째 세션"
                className={styles.section02}
              />
              <LottieWrapper
                animationData={questDetailLottie}
                className={styles.questDetailLottie}
                speed={0.2}
              />
              <LottieWrapper
                animationData={codingLottie}
                className={styles.codingLottie}
                speed={0.1}
              />
            </article>
            <article className={styles.section03Article}>
              <img
                src={section03}
                alt="세번째 세션"
                className={styles.section03}
              />
              <LottieWrapper
                animationData={userInfoTabLottie}
                className={styles.userInfoTabLottie}
                speed={0.2}
              />
              <LottieWrapper
                animationData={rankingLottie}
                className={styles.rankingLottie}
              />
            </article>
          </section>
          <section className={styles.mainCTAWrap}>
            <div className={styles.mainTitleWrap}>
              <h2
                className={`font-pixellari-header-2 text-color-lighten ${styles.mainTitle}`}
              >
                Ready to level up with real world projects?
              </h2>
            </div>
            <Link
              to="/worldmap"
              className={`font-roboto-sub-header text-color-lighten ${styles.CTAButton}`}
            >
              Explore projects
            </Link>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  )
}
