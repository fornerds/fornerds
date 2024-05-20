import React from 'react'
import styles from './Header.module.css'
import { Button, Input, Link } from '../../AtomComponent'
// png 파일 import 위해서 아래 블로그 참고
// https://velog.io/@98soonrok/Cannot-find-module-..imagespattern.png-or-its-corresponding-type-declarations.-ts2307

/** 요구사항
 * 1. Link 컴포넌트를 이용하여 홈, 프로젝트 찾기, 랭킹, 컨텍트, 로그인, 회원가입 메뉴 링크 만들기(App.jsx에서 이동할 링크 확인해주세요.)
 * 2. Input 컴포넌트를 이용하여 검색창 만들기
 * 피그마 링크: https://www.figma.com/design/C8ak7mvyvyabez8CGRqEqX/Fornerds?node-id=500-10649&t=WnY63VjITSqhoELB-4
 */

export function Header() {
  return (
    <>
      <div className={styles.background}>
        <div className={styles.header}>
          <LeftBox />
          <RightBox />
        </div>
      </div>
    </>
  )
}

function LeftBox() {
  const categoryId = 2
  return (
    <div className={styles.leftBox}>
      <div className={styles.logo}></div>
      <div className={styles.nav}>
        <Link to="/" className={styles.text}>
          Home
        </Link>
        <Link to={`/projects/${categoryId}`} className={styles.text}>
          Explore Project
        </Link>
        <Link to="/ranking" className={styles.text}>
          Ranking
        </Link>
        <Link to="/contact" className={styles.text}>
          Contact
        </Link>
        <Link to="/community" className={styles.text}>
          Community
        </Link>
      </div>
    </div>
  )
}

function RightBox() {
  return (
    <div className={styles.rightBox}>
      {/* <SearchBar /> */}
      <Member />
    </div>
  )
}

function Member() {
  return (
    <div className={styles.member}>
      <Button variant="default" size="small">
        <Link to="/login" className={styles.text}>
          Log In
        </Link>
      </Button>
      <Button variant="lessEmphasize" size="small">
        <Link to="/signup" className={styles.text}>
          Sign Up
        </Link>
      </Button>
    </div>
  )
}

function SearchBar() {
  return (
    <div className={styles.searchBar}>
      <div className={styles.searchIcon}>
        <SearchIcon />
      </div>
      <div className={styles.searchInput}>
        {/* <input type='text' className={styles.searchText}>Search</input> */}
        <Input variant="secondary" type="text"></Input>
      </div>
    </div>
  )
}

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5 3.75C6.77208 3.75 3.75 6.77208 3.75 10.5C3.75 14.2279 6.77208 17.25 10.5 17.25C12.3642 17.25 14.0506 16.4953 15.273 15.273C16.4953 14.0506 17.25 12.3642 17.25 10.5C17.25 6.77208 14.2279 3.75 10.5 3.75ZM2.25 10.5C2.25 5.94365 5.94365 2.25 10.5 2.25C15.0563 2.25 18.75 5.94365 18.75 10.5C18.75 12.5078 18.032 14.3491 16.8399 15.7793L21.5303 20.4697C21.8232 20.7626 21.8232 21.2374 21.5303 21.5303C21.2374 21.8232 20.7626 21.8232 20.4697 21.5303L15.7793 16.8399C14.3491 18.032 12.5078 18.75 10.5 18.75C5.94365 18.75 2.25 15.0563 2.25 10.5Z"
        fill="white"
        fillOpacity="0.65"
      />
    </svg>
  )
}
