import React from 'react'
import styles from './ProjectsDetails.module.css'
import { Footer, Header } from '../../../../components/ModuleComponent'
import { ReactComponent as CodeBracket } from '../../../../assets/icons/code_bracket.svg'
import { ReactComponent as Clock } from '../../../../assets/icons/clock.svg'
import { ReactComponent as Gift } from '../../../../assets/icons/gift.svg'
import MoneyPixelIcon from '../../../../assets/images/pixel/money.webp'
import CupPixelIcon from '../../../../assets/images/pixel/cup.webp'

function Contents_Box() {
  return (
    <div className={styles.contents_box}>
      <div className={styles.contents}>
        <div className={styles.project_detail_cards}>
          <div className={styles.project_detail_card}>
            <div className={styles.card_upperLeftBox}>
              <text className={`text-color-lighten font-roboto-cta-small`}>
                Total number of quests
              </text>
            </div>
            <div className={styles.card_icon}>
              <CodeBracket width="24" height="24" />
            </div>
            <div className={styles.card_numberBox}>
              <text
                className={`text-color-lighten ${styles.card_numberBox_text} font-roboto-header-1`}
              >
                220
              </text>
              <div className={styles.card_numberBox_unit}>
                <text
                  className={`text-color-lighten font-roboto-body-2`}
                ></text>
              </div>
            </div>
          </div>
          <div className={styles.project_detail_card}>
            <div className={styles.card_upperLeftBox}>
              <text className={`text-color-lighten font-roboto-cta-small`}>
                Total estimated time
              </text>
            </div>
            <div className={styles.card_icon}>
              <Clock width="24" height="24" />
            </div>
            <div className={styles.card_numberBox}>
              <text
                className={`text-color-lighten ${styles.card_numberBox_text} font-roboto-header-1`}
              >
                1,250
              </text>
              <div className={styles.card_numberBox_unit}>
                <text className={`text-color-lighten font-roboto-body-2`}>
                  Hours
                </text>
              </div>
            </div>
          </div>
          <div className={styles.project_detail_card}>
            <div className={styles.card_upperLeftBox}>
              <text className={`text-color-lighten font-roboto-cta-small`}>
                Total reward
              </text>
              <div className={styles.reward}>
                <div className={styles.money}>
                  <div className={styles.icon_money_small}>
                    <img src={MoneyPixelIcon} alt="money_small"></img>
                  </div>
                  <text className={`text-color-default font-roboto-body-2`}>
                    500,000
                  </text>
                </div>
                <div className={styles.exp}>
                  <div className={styles.icon_cup_small}>
                    <img src={CupPixelIcon} alt="money_small"></img>
                  </div>
                  <text className={`text-color-default font-roboto-body-2`}>
                    500,000,000
                  </text>
                </div>
              </div>
            </div>
            <div className={styles.card_icon}>
              <Gift width="24" height="24" />
            </div>
            <div className={styles.card_numberBox}>
              <text
                className={`text-color-lighten ${styles.card_numberBox_text} font-roboto-header-1`}
              >
                500,000
              </text>
              <div className={styles.card_numberBox_unit}>
                <text className={`text-color-lighten font-roboto-body-2`}>
                  USD
                </text>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.text_field}>
          <div className={styles.textBox}>
            <text className={`text-color-lighten font-roboto-header-3`}>
              About project
            </text>
            <text className={`text-color-lighten font-roboto-body-1`}>
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
            <text className={`text-color-lighten font-roboto-header-3`}>
              What you will learn
            </text>
            <li className={`text-color-lighten font-roboto-body-1`}>
              Lorem ipsum dolor sit amet consectetur
            </li>
            <li className={`text-color-lighten font-roboto-body-1`}>
              Volutpat sit purus posuere laoreet dolor gravida curabitur
            </li>
            <li className={`text-color-lighten font-roboto-body-1`}>
              apien tristique curabitur risus neque vulputate
            </li>
            <li className={`text-color-lighten font-roboto-body-1`}>
              Maecenas proin est nisi auctor vel eget tortor sagittis
            </li>
          </div>
          <div className={styles.textBox}>
            <text className={`text-color-lighten font-roboto-header-3`}>
              Task Description
            </text>
            <li className={`text-color-lighten font-roboto-body-1`}>
              Lorem ipsum dolor sit amet consectetur
            </li>
            <li className={`text-color-lighten font-roboto-body-1`}>
              Volutpat sit purus posuere laoreet dolor gravida curabitur
            </li>
            <li className={`text-color-lighten font-roboto-body-1`}>
              apien tristique curabitur risus neque vulputate
            </li>
            <li className={`text-color-lighten font-roboto-body-1`}>
              Maecenas proin est nisi auctor vel eget tortor sagittis
            </li>
          </div>
          <div className={styles.textBox}>
            <text className={`text-color-lighten font-roboto-header-3`}>
              Basic Requirements
            </text>
            <li className={`text-color-lighten font-roboto-body-1`}>
              Lorem ipsum dolor sit amet consectetur
            </li>
            <li className={`text-color-lighten font-roboto-body-1`}>
              Volutpat sit purus posuere laoreet dolor gravida curabitur
            </li>
            <li className={`text-color-lighten font-roboto-body-1`}>
              apien tristique curabitur risus neque vulputate
            </li>
            <li className={`text-color-lighten font-roboto-body-1`}>
              Maecenas proin est nisi auctor vel eget tortor sagittis
            </li>
          </div>
          <div className={styles.textBox}>
            <text className={`text-color-lighten font-roboto-header-3`}>
              How to Apply
            </text>
            <li className={`text-color-lighten font-roboto-body-1`}>
              Lorem ipsum dolor sit amet consectetur
            </li>
            <li className={`text-color-lighten font-roboto-body-1`}>
              Volutpat sit purus posuere laoreet dolor gravida curabitur
            </li>
            <li className={`text-color-lighten font-roboto-body-1`}>
              apien tristique curabitur risus neque vulputate
            </li>
            <li className={`text-color-lighten font-roboto-body-1`}>
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
