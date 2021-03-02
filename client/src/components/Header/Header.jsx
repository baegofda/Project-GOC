import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.css";
const LOGO = "/assets/images/main-logo.png";

const Header = (props) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <Link className={styles.logoLink} to="/">
          <img className={styles.img} src={LOGO} alt="겟아웃코로나" />
        </Link>
      </h1>
      <nav className={styles.nav}>
        <ul className={styles.navContainer}>
          <li className={styles.categoryContainer}>
            <h2 className={styles.category}>국내</h2>
            <ul className={styles.menuContainer}>
              <li className={styles.menu}>
                <NavLink to="/" activeClassName="selected">
                  국내 종합 현황
                </NavLink>
              </li>
              <li className={styles.menu}>
                <NavLink to="#" activeClassName="selected">
                  국내 시도별 현황
                </NavLink>
              </li>
            </ul>
          </li>
          <li className={styles.categoryContainer}>
            <h2 className={styles.category}>해외</h2>
            <ul className={styles.menuContainer}>
              <li className={styles.menu}>
                <NavLink to="#" activeClassName="selected">
                  해외 종합 현황
                </NavLink>
              </li>
              <li className={styles.menu}>
                <NavLink to="#" activeClassName="selected">
                  해외 주변 국가별 현황
                </NavLink>
              </li>
              <li className={styles.menu}>
                <NavLink to="#" activeClassName="selected">
                  전 세계 대시보드
                </NavLink>
              </li>
            </ul>
          </li>
          <li className={styles.categoryContainer}>
            <h2 className={styles.category}>정보</h2>
            <ul className={styles.menuContainer}>
              <li className={styles.menu}>
                <NavLink to="#" activeClassName="selected">
                  코로나19 정보
                </NavLink>
              </li>
              <li className={styles.menu}>
                <NavLink to="#" activeClassName="selected">
                  주요 뉴스
                </NavLink>
              </li>
            </ul>
          </li>
          <li className={styles.categoryContainer}>
            <h2 className={styles.category}>기타</h2>
            <ul className={styles.menuContainer}>
              <li className={styles.menu}>
                <NavLink to="#" activeClassName="selected">
                  데이터 출처
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
