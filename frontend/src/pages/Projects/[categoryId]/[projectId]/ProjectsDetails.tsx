import React from 'react'
import styles from './ProjectsDetails.module.css'
import { Footer, Header } from '../../../../components/ModuleComponent'

function Contents_Box() {
  return (
    <div className={styles.contents_box}>
      <div className={styles.contents}>
        <div className={styles.project_detail_cards}>
          <div className={styles.project_detail_card}></div>
          <div className={styles.project_detail_card}></div>
          <div className={styles.project_detail_card}></div>
        </div>
        <div className={styles.text_field}>
          <div className={styles.textBox}>
            <text className={`${styles.textColor} font-roboto-header-3`}>
              About project
            </text>
            <text className={`${styles.textColor} font-roboto-body-1`}>
              Lorem ipsum dolor sit amet consectetur. Volutpat sit purus posuere
              laoreet dolor gravida curabitur. Sapien tristique curabitur risus
              neque vulputate. Id pellentesque nunc leo proin tortor. Maecenas
              proin est nisi auctor vel eget tortor sagittis. Tortor at
              ullamcorper purus ut nulla posuere eget tincidunt ipsum. Semper
              egestas ullamcorper convallis mi quis suspendisse mauris. Et arcu
              nunc ante nunc ut gravida dolor faucibus. Curabitur id id eros
              donec morbi. Lacus rutrum lorem magna tellus.
            </text>
          </div>
          <div className={styles.textBox}>
            <text className={`${styles.textColor} font-roboto-header-3`}>
              What you will learn
            </text>
            <li className={`${styles.textColor} font-roboto-body-1`}>
              Lorem ipsum dolor sit amet consectetur
            </li>
            <li className={`${styles.textColor} font-roboto-body-1`}>
              Volutpat sit purus posuere laoreet dolor gravida curabitur
            </li>
            <li className={`${styles.textColor} font-roboto-body-1`}>
              apien tristique curabitur risus neque vulputate
            </li>
            <li className={`${styles.textColor} font-roboto-body-1`}>
              Maecenas proin est nisi auctor vel eget tortor sagittis
            </li>
          </div>
          <div className={styles.textBox}>
            <text className={`${styles.textColor} font-roboto-header-3`}>
              Task Description
            </text>
            <li className={`${styles.textColor} font-roboto-body-1`}>
              Lorem ipsum dolor sit amet consectetur
            </li>
            <li className={`${styles.textColor} font-roboto-body-1`}>
              Volutpat sit purus posuere laoreet dolor gravida curabitur
            </li>
            <li className={`${styles.textColor} font-roboto-body-1`}>
              apien tristique curabitur risus neque vulputate
            </li>
            <li className={`${styles.textColor} font-roboto-body-1`}>
              Maecenas proin est nisi auctor vel eget tortor sagittis
            </li>
          </div>
          <div className={styles.textBox}>
            <text className={`${styles.textColor} font-roboto-header-3`}>
              Basic Requirements
            </text>
            <li className={`${styles.textColor} font-roboto-body-1`}>
              Lorem ipsum dolor sit amet consectetur
            </li>
            <li className={`${styles.textColor} font-roboto-body-1`}>
              Volutpat sit purus posuere laoreet dolor gravida curabitur
            </li>
            <li className={`${styles.textColor} font-roboto-body-1`}>
              apien tristique curabitur risus neque vulputate
            </li>
            <li className={`${styles.textColor} font-roboto-body-1`}>
              Maecenas proin est nisi auctor vel eget tortor sagittis
            </li>
          </div>
          <div className={styles.textBox}>
            <text className={`${styles.textColor} font-roboto-header-3`}>
              How to Apply
            </text>
            <li className={`${styles.textColor} font-roboto-body-1`}>
              Lorem ipsum dolor sit amet consectetur
            </li>
            <li className={`${styles.textColor} font-roboto-body-1`}>
              Volutpat sit purus posuere laoreet dolor gravida curabitur
            </li>
            <li className={`${styles.textColor} font-roboto-body-1`}>
              apien tristique curabitur risus neque vulputate
            </li>
            <li className={`${styles.textColor} font-roboto-body-1`}>
              Maecenas proin est nisi auctor vel eget tortor sagittis
            </li>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ProjectsDetails() {
  return (
    <div className={styles.pageLayout}>
      <Header />
      <div className={styles.content}>
        <div className={styles.backgroundImage}>
          <Contents_Box />
        </div>
      </div>
      <Footer />
    </div>
  )
}
