import React, { useState, useRef } from 'react'
import styles from './MyPage.module.css'
import { Footer, Header, Tab } from '../../components/ModuleComponent'
import backgroundTop from '../../assets/images/background/background03.webp'
import backgroundBottom from '../../assets/images/background/background04.webp'
import { ReactComponent as UserIcon } from '../../assets/icons/user.svg'
import { ReactComponent as ProjectsIcon } from '../../assets/icons/rocket_launch.svg'
import { ReactComponent as SolutionIcon } from '../../assets/icons/lightbulb.svg'
import { ReactComponent as BookmarkIcon } from '../../assets/icons/bookmark.svg'
import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg'
import { DiscussionIcon } from '../../assets/icons/DiscussionIcon'
import lock from '../../assets/images/lock.webp'
import characters from '../../assets/images/character'
import languageImages from '../../assets/images/programmingLanguage'
import categoryImages from '../../assets/images/category'
import { Button, Input } from '../../components/AtomComponent'

export function MyPage() {
  const profile = useRef({
    id: Math.floor(Math.random() * 500),
    email: 'fornerds@mail.com',
    nickname: 'Fornerds',
    phoneNumber: '+82)10-0000-0000',
    country: 'South Korea',
    profileImage: Math.floor(Math.random() * 10),
    level: Math.floor(Math.random() * 30),
    exp: Math.floor(Math.random() * 100),
    userDevLanguage: [
      { id: 1, number: Math.floor(Math.random() * 50) },
      { id: 2, number: Math.floor(Math.random() * 50) },
      { id: 3, number: Math.floor(Math.random() * 50) },
      { id: 4, number: Math.floor(Math.random() * 50) },
      { id: 5, number: Math.floor(Math.random() * 50) },
      { id: 6, number: Math.floor(Math.random() * 50) },
      { id: 7, number: Math.floor(Math.random() * 50) },
      { id: 8, number: Math.floor(Math.random() * 50) },
      { id: 9, number: Math.floor(Math.random() * 50) },
      { id: 10, number: Math.floor(Math.random() * 50) },
      { id: 11, number: Math.floor(Math.random() * 50) },
      { id: 12, number: Math.floor(Math.random() * 50) },
      { id: 13, number: Math.floor(Math.random() * 50) },
      { id: 14, number: Math.floor(Math.random() * 50) }
    ],
    userCategory: [
      { id: 1, number: Math.floor(Math.random() * 50) },
      { id: 2, number: Math.floor(Math.random() * 50) },
      { id: 3, number: Math.floor(Math.random() * 50) },
      { id: 4, number: Math.floor(Math.random() * 50) },
      { id: 5, number: Math.floor(Math.random() * 50) },
      { id: 6, number: Math.floor(Math.random() * 50) },
      { id: 7, number: Math.floor(Math.random() * 50) },
      { id: 8, number: Math.floor(Math.random() * 50) },
      { id: 9, number: Math.floor(Math.random() * 50) }
    ]
  }).current

  const category = [
    { id: 1, name: 'Web development', img: categoryImages[8] },
    { id: 2, name: 'iOS development', img: categoryImages[5] },
    { id: 3, name: 'Android development', img: categoryImages[1] },
    { id: 4, name: 'Game development', img: categoryImages[4] },
    { id: 5, name: 'AI, ML & Data science', img: categoryImages[0] },
    { id: 6, name: 'Cyber security', img: categoryImages[7] },
    { id: 7, name: 'Embedded systems', img: categoryImages[3] },
    { id: 8, name: 'Internet of things', img: categoryImages[6] },
    { id: 9, name: 'Blockchain technology', img: categoryImages[2] }
  ]

  const programmingLanguage = [
    { id: 1, name: 'C#', img: languageImages[2] },
    { id: 2, name: 'C', img: languageImages[0] },
    { id: 3, name: 'C++', img: languageImages[1] },
    { id: 4, name: 'Java', img: languageImages[5] },
    { id: 5, name: 'Java Script', img: languageImages[6] },
    { id: 6, name: 'Type Script', img: languageImages[13] },
    { id: 7, name: 'Python', img: languageImages[8] },
    { id: 8, name: 'Ruby', img: languageImages[9] },
    { id: 9, name: 'Dart', img: languageImages[3] },
    { id: 10, name: 'Go', img: languageImages[4] },
    { id: 11, name: 'php', img: languageImages[7] },
    { id: 12, name: 'SQL', img: languageImages[11] },
    { id: 13, name: 'Swift', img: languageImages[12] },
    { id: 14, name: 'Rust', img: languageImages[10] }
  ]

  const [isEditing, setIsEditing] = useState(false)
  const [editProfile, setEditProfile] = useState({ ...profile })

  const listRef = useRef<HTMLDivElement>(null)

  const startY = useRef(0)
  const scrollTop = useRef(0)

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    startY.current = e.clientY
    scrollTop.current = listRef.current?.scrollTop || 0
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = (e: MouseEvent) => {
    const y = e.clientY - startY.current
    if (listRef.current) {
      listRef.current.scrollTop = scrollTop.current - y
    }
  }

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startY.current = e.touches[0].clientY
    scrollTop.current = listRef.current?.scrollTop || 0
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const y = e.touches[0].clientY - startY.current
    if (listRef.current) {
      listRef.current.scrollTop = scrollTop.current - y
    }
  }

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleCancelClick = () => {
    setEditProfile({ ...profile })
    setIsEditing(false)
  }

  const handleSaveClick = () => {
    // Save the changes (this is where you would usually update the state or send a request to the server)
    Object.assign(profile, editProfile)
    setIsEditing(false)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setEditProfile({
      ...editProfile,
      [name]: value
    })
  }

  const maxCategoryNumber = Math.max(
    ...profile.userCategory.map((uc) => uc.number)
  )

  const maxLanguageNumber = Math.max(
    ...profile.userDevLanguage.map((ul) => ul.number)
  )

  const tabs = [
    {
      icon: <UserIcon />,
      label: 'imformation',
      content: (
        <div className={styles.informationMain}>
          <section className={styles.info}>
            <article className={styles.personalInfo}>
              <h2 className={`${styles.pageIndex} font-pixellari-sub-header`}>
                Personal info
              </h2>
              <div className={styles.profileBox}>
                <div className={styles.characterInfo}>
                  <div className={styles.characterImageWrap}>
                    <img
                      src={characters[profile.profileImage]}
                      alt={`Character ${profile.profileImage}`}
                      width="100"
                      height="100"
                    />
                  </div>
                  <div className={styles.expWrap}>
                    <div className={styles.level}>
                      <h3 className="font-pixellari-sub-header text-color-lighten">
                        Level {profile.level}
                      </h3>
                      <div className={styles.expPercent}>
                        <p className="font-roboto-cta-small text-color-default">
                          {profile.exp}
                        </p>
                        <p className="font-roboto-body-2 text-color-default">
                          / 100 EXP
                        </p>
                      </div>
                    </div>
                    <progress
                      className={styles.progressBar}
                      value={profile.exp}
                      max="100"
                    ></progress>
                  </div>
                </div>
                <div className={styles.userInfo}>
                  <div className={styles.userInfoList}>
                    <div className={styles.userInfoItem}>
                      <div className={styles.userInfoItemLabel}>
                        <p className="text-color-lighten font-roboto-cta-small">
                          Name
                        </p>
                      </div>
                      <div className={styles.userInfoItemValue}>
                        {isEditing ? (
                          <Input
                            type="text"
                            name="nickname"
                            value={editProfile.nickname}
                            onChange={handleChange}
                            className={`${styles.input} font-roboto-body-2 text-color-lighten`}
                          />
                        ) : (
                          <p className="text-color-lighten font-roboto-body-1">
                            {profile.nickname}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className={styles.userInfoItem}>
                      <div className={styles.userInfoItemLabel}>
                        <p className="text-color-lighten font-roboto-cta-small">
                          Nation
                        </p>
                      </div>
                      <div className={styles.userInfoItemValue}>
                        {isEditing ? (
                          <select
                            name="country"
                            value={editProfile.country}
                            onChange={handleChange}
                            className={`${styles.input} font-roboto-body-2 text-color-lighten`}
                          >
                            <option value="South Korea">South Korea</option>
                            <option value="Japan">Japan</option>
                            <option value="United States of America">
                              United States of America
                            </option>
                          </select>
                        ) : (
                          <p className="text-color-lighten font-roboto-body-1">
                            {profile.country}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className={styles.userInfoItem}>
                      <div className={styles.userInfoItemLabel}>
                        <p className="text-color-lighten font-roboto-cta-small">
                          Email
                        </p>
                      </div>
                      <div className={styles.userInfoItemValue}>
                        {isEditing ? (
                          <Input
                            type="email"
                            name="email"
                            value={editProfile.email}
                            onChange={handleChange}
                            className={`${styles.input} font-roboto-body-2 text-color-lighten`}
                          />
                        ) : (
                          <p className="text-color-lighten font-roboto-body-1">
                            {profile.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className={styles.userInfoItem}>
                      <div className={styles.userInfoItemLabel}>
                        <p className="text-color-lighten font-roboto-cta-small">
                          Contact
                        </p>
                      </div>
                      <div className={styles.userInfoItemValue}>
                        {isEditing ? (
                          <Input
                            type="text"
                            name="phoneNumber"
                            value={editProfile.phoneNumber}
                            onChange={handleChange}
                            className={`${styles.input} font-roboto-body-2 text-color-lighten`}
                          />
                        ) : (
                          <p className="text-color-lighten font-roboto-body-1">
                            {profile.phoneNumber}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  {isEditing ? (
                    <div className={styles.editButtons}>
                      <Button
                        onClick={handleCancelClick}
                        className={`${styles.button} text-color-lighten font-roboto-cta-small`}
                        variant="default"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSaveClick}
                        className={`${styles.button} text-color-lighten font-roboto-cta-small`}
                        variant="active"
                      >
                        Save
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={handleEditClick}
                      className={`${styles.editButton} font-roboto-tag`}
                    >
                      <EditIcon />
                      Edit
                    </Button>
                  )}
                </div>
              </div>
            </article>
            <article className={styles.accomplishment}>
              <h2 className={`${styles.pageIndex} font-pixellari-sub-header`}>
                Accomplishments
              </h2>
              <div
                className={styles.accomplishmentList}
                ref={listRef}
                role="listbox"
                tabIndex={0}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
              >
                {[...Array(15)].map((_, i) => (
                  <img
                    key={i}
                    className={styles.lockImage}
                    src={lock}
                    alt="locked"
                    width="120"
                    height="120"
                    draggable="false"
                  />
                ))}
              </div>
            </article>
          </section>
          <div className={styles.hr}></div>
          <section className={styles.proficiency}>
            <article className={styles.categoryProficiency}>
              <h2 className={`${styles.pageIndex} font-pixellari-sub-header`}>
                Category proficiency
              </h2>
              <ol className={styles.categoryList}>
                <li className={styles.categoryItem}>
                  <h3
                    className={`${styles.categoryIndex} font-roboto-cta-small text-color-lighten`}
                  >
                    Category
                  </h3>
                  <h3
                    className={`${styles.categoryIndex} font-roboto-cta-small text-color-lighten`}
                  >
                    Quest Number
                  </h3>
                </li>
                {category.map((cat) => {
                  const userCat = profile.userCategory.find(
                    (uc) => uc.id === cat.id
                  )
                  const number = userCat ? userCat.number : 0
                  const percentage = (
                    (number / maxCategoryNumber) *
                    100
                  ).toFixed(2)

                  return (
                    <li className={styles.categoryItem} key={cat.id}>
                      <div className={styles.categoryLabel}>
                        <img
                          src={cat.img}
                          alt={cat.name}
                          width="30"
                          height="30"
                        />
                        <h4 className="font-roboto-body-2 text-color-lighten">
                          {cat.name}
                        </h4>
                      </div>
                      <div className={styles.categoryProgress}>
                        <progress
                          className={styles.categoryprogressBar}
                          value={number}
                          max={maxCategoryNumber}
                        ></progress>
                        <span
                          className={`${styles.progressBarNumber} font-roboto-body-2 text-color-lighten`}
                        >
                          {number}
                        </span>
                      </div>
                    </li>
                  )
                })}
              </ol>
            </article>
            <article className={styles.languageProficiency}>
              <h2 className={`${styles.pageIndex} font-pixellari-sub-header`}>
                Programming language proficiency
              </h2>
              <ol className={styles.languageList}>
                <li className={styles.languageItem}>
                  <h3
                    className={`${styles.languageIndex} font-roboto-cta-small text-color-lighten`}
                  >
                    Language
                  </h3>
                  <h3
                    className={`${styles.languageIndex} font-roboto-cta-small text-color-lighten`}
                  >
                    Quest Number
                  </h3>
                </li>
                {programmingLanguage.map((lang) => {
                  const userLang = profile.userDevLanguage.find(
                    (uc) => uc.id === lang.id
                  )
                  const number = userLang ? userLang.number : 0
                  const percentage = (
                    (number / maxLanguageNumber) *
                    100
                  ).toFixed(2)

                  return (
                    <li className={styles.languageItem} key={lang.id}>
                      <div className={styles.languageLabel}>
                        <img
                          src={lang.img}
                          alt={lang.name}
                          width="30"
                          height="30"
                        />
                        <h4 className="font-roboto-body-2 text-color-lighten">
                          {lang.name}
                        </h4>
                      </div>
                      <div className={styles.languageProgress}>
                        <progress
                          className={styles.languageprogressBar}
                          value={number}
                          max={maxLanguageNumber}
                        ></progress>
                        <span
                          className={`${styles.progressBarNumber} font-roboto-body-2 text-color-lighten`}
                        >
                          {number}
                        </span>
                      </div>
                    </li>
                  )
                })}
              </ol>
            </article>
          </section>
        </div>
      )
    },
    {
      icon: <ProjectsIcon />,
      label: 'My Projects',
      content: <div>My Projects...</div>
    },
    {
      icon: <SolutionIcon stroke="white" strokeOpacity="0.85" />,
      label: 'My Solutions',
      content: <div>My Solutions...</div>
    },
    {
      icon: <BookmarkIcon width="24" height="24" fill="none" stroke="white" />,
      label: 'Bookmarks',
      content: <div>Bookmarks...</div>
    },
    {
      icon: <DiscussionIcon stroke="white" strokeOpacity="0.85" />,
      label: 'Activities',
      content: <div>Activities...</div>
    }
  ]
  return (
    <div className={styles.background}>
      <div
        className={styles.backgroundImage}
        style={{ backgroundImage: `url(${backgroundTop})` }}
      ></div>
      <div
        className={styles.backgroundImageBottom}
        style={{ backgroundImage: `url(${backgroundBottom})` }}
      ></div>
      <div className={styles.content}>
        <Header />
        <main className={styles.main}>
          <Tab tabs={tabs} isMyPageTab={true} />
        </main>
      </div>
      <Footer />
    </div>
  )
}
