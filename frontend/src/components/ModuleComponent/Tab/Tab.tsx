import React, { useState } from 'react'
import styles from './Tab.module.css'
import { Button } from '../../AtomComponent'

interface TabProps {
  label: string
  content: React.ReactNode
  icon?: React.ReactNode
  activeIcon?: React.ReactNode
}

interface TabsProps {
  tabs: TabProps[]
}

export function Tab({ tabs }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabClick = (index: number) => {
    setActiveTab(index)
  }

  return (
    <div className={styles.tabs}>
      <div className={styles.tabListWrap}>
        <div className={styles.tabList}>
          {tabs.map((tab, index) => (
            <Button
              key={index}
              className={`${styles.tab}  ${index === activeTab ? styles.active : ''}`}
              onClick={() => handleTabClick(index)}
            >
              {index === activeTab && tab.activeIcon
                ? tab.activeIcon
                : tab.icon}
              <p className={`${styles.label} font-roboto-sub-header`}>
                {tab.label}
              </p>
            </Button>
          ))}
        </div>
      </div>
      <div className={styles.tabContent}>{tabs[activeTab].content}</div>
    </div>
  )
}
