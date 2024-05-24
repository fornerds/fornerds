import React, { ReactNode } from 'react'
import styles from './ProjectDetailCards.module.css'
import { ReactComponent as CodeBracket } from '../../../../../../assets/icons/code_bracket.svg'
import { ReactComponent as Clock } from '../../../../../../assets/icons/clock.svg'
import { ReactComponent as Gift } from '../../../../../../assets/icons/gift.svg'
import MoneyPixelIcon from '../../../../../../assets/images/pixel/money.webp'
import CupPixelIcon from '../../../../../../assets/images/pixel/cup.webp'

export function ProjectDetailCards() {
  return (
    <div className={styles.project_detail_cards}>
      <ProjectDetailCard
        title={TotalQuests.title}
        icon={TotalQuests.icon}
        number={TotalQuests.number}
      />
      <ProjectDetailCard
        title={TotalTime.title}
        icon={TotalTime.icon}
        number={TotalTime.number}
        unit={TotalTime.unit}
      />
      <ProjectDetailCard
        title={TotalReward.title}
        icon={TotalReward.icon}
        number={TotalReward.number}
        unit={TotalReward.unit}
        rewardMoney={TotalReward.rewardMoney}
        rewardExp={TotalReward.rewardExp}
      />
    </div>
  )
}

function ProjectDetailCard({
  title,
  icon,
  number,
  unit,
  rewardMoney,
  rewardExp
}: ProjectDetailCardProps) {
  return (
    <div className={styles.project_detail_card}>
      <div className={styles.card_upperLeftBox}>
        <text className={`text-color-lighten font-roboto-cta-small`}>
          {title}
        </text>

        {title == 'Total reward' ? (
          <div className={styles.reward}>
            <div className={styles.money}>
              <div className={styles.icon_money_small}>
                <img src={MoneyPixelIcon} alt="money_small"></img>
              </div>
              <text className={`text-color-default font-roboto-body-2`}>
                {rewardMoney ? rewardMoney.toLocaleString() : null}
              </text>
            </div>
            <div className={styles.exp}>
              <div className={styles.icon_cup_small}>
                <img src={CupPixelIcon} alt="money_small"></img>
              </div>
              <text className={`text-color-default font-roboto-body-2`}>
                {rewardExp ? rewardExp.toLocaleString() : null}
              </text>
            </div>
          </div>
        ) : null}
      </div>
      <div className={styles.card_icon}>
        <CodeBracket width="24" height="24" />
      </div>
      <div className={styles.card_numberBox}>
        <text
          className={`text-color-lighten ${styles.card_numberBox_text} font-roboto-header-1`}
        >
          {number.toLocaleString()}
        </text>
        <div className={styles.card_numberBox_unit}>
          <text className={`text-color-lighten font-roboto-body-2`}>
            {unit}
          </text>
        </div>
      </div>
    </div>
  )
}

interface ProjectDetailCardProps {
  title: string
  icon: ReactNode
  number: number
  unit?: string
  rewardMoney?: number
  rewardExp?: number
}

const TotalQuests: ProjectDetailCardProps = {
  title: 'Total number of quests',
  icon: <CodeBracket width="24" height="24" />,
  number: 220
}

const TotalTime: ProjectDetailCardProps = {
  title: 'Total estimated time',
  icon: <Clock width="24" height="24" />,
  number: 1250,
  unit: 'Hours'
}

const TotalReward: ProjectDetailCardProps = {
  title: 'Total reward',
  icon: <Gift width="24" height="24" />,
  number: 500000,
  unit: 'USD',
  rewardMoney: 500000,
  rewardExp: 500000000
}
