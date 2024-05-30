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
  isMyPageTab?: boolean
}

export function Tab({ tabs, isMyPageTab = false }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabClick = (index: number) => {
    setActiveTab(index)
  }

  return (
    <div className={isMyPageTab ? styles.myPageTabs : styles.tabs}>
      <div
        className={isMyPageTab ? styles.myPageTabListWrap : styles.tabListWrap}
      >
        {isMyPageTab && (
          <h2 className={`${styles.pageTitle} font-pixellari-sub-header`}>
            My page
          </h2>
        )}
        <div className={isMyPageTab ? styles.myPageTabList : styles.tabList}>
          {tabs.map((tab, index) => (
            <Button
              key={index}
              className={
                isMyPageTab
                  ? `${styles.myPageTab}  ${index === activeTab ? styles.active : ''}`
                  : `${styles.tab}  ${index === activeTab ? styles.active : ''}`
              }
              onClick={() => handleTabClick(index)}
            >
              {index === activeTab && tab.activeIcon
                ? tab.activeIcon
                : tab.icon}
              <p className={`${styles.label} font-roboto-body-2`}>
                {tab.label}
              </p>
            </Button>
          ))}
        </div>
      </div>
      <div
        className={isMyPageTab ? styles.myPageTabContent : styles.tabContent}
      >
        {tabs[activeTab].content}
      </div>
    </div>
  )
}
