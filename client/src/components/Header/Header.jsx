import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.css";
const LOGO = "/assets/images/main-logo.png";

const Header = (props) => {
  return (
    <header className={styles.header}>
      <Link className={styles.gnb} to="#none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          fill="#000"
          width="24"
          height="24"
        >
          <path d="M12.83 352h262.34A12.82 12.82 0 0 0 288 339.17v-38.34A12.82 12.82 0 0 0 275.17 288H12.83A12.82 12.82 0 0 0 0 300.83v38.34A12.82 12.82 0 0 0 12.83 352zm0-256h262.34A12.82 12.82 0 0 0 288 83.17V44.83A12.82 12.82 0 0 0 275.17 32H12.83A12.82 12.82 0 0 0 0 44.83v38.34A12.82 12.82 0 0 0 12.83 96zM432 160H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0 256H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z" />
        </svg>
      </Link>
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
                <NavLink
                  className={styles.menuItem}
                  to="/"
                  activeClassName="selected"
                >
                  국내 종합 현황
                </NavLink>
              </li>
              <li className={styles.menu}>
                <NavLink
                  className={styles.menuItem}
                  to="#"
                  activeClassName="selected"
                >
                  국내 시도별 현황
                </NavLink>
              </li>
            </ul>
          </li>
          <li className={styles.categoryContainer}>
            <h2 className={styles.category}>해외</h2>
            <ul className={styles.menuContainer}>
              <li className={styles.menu}>
                <NavLink
                  className={styles.menuItem}
                  to="#"
                  activeClassName="selected"
                >
                  해외 종합 현황
                </NavLink>
              </li>
              <li className={styles.menu}>
                <NavLink
                  className={styles.menuItem}
                  to="#"
                  activeClassName="selected"
                >
                  해외 주변 국가별 현황
                </NavLink>
              </li>
              <li className={styles.menu}>
                <NavLink
                  className={styles.menuItem}
                  to="#"
                  activeClassName="selected"
                >
                  전 세계 대시보드
                </NavLink>
              </li>
            </ul>
          </li>
          <li className={styles.categoryContainer}>
            <h2 className={styles.category}>정보</h2>
            <ul className={styles.menuContainer}>
              <li className={styles.menu}>
                <NavLink
                  className={styles.menuItem}
                  to="#"
                  activeClassName="selected"
                >
                  코로나19 정보
                </NavLink>
              </li>
              <li className={styles.menu}>
                <NavLink
                  className={styles.menuItem}
                  to="#"
                  activeClassName="selected"
                >
                  주요 뉴스
                </NavLink>
              </li>
            </ul>
          </li>
          <li className={styles.categoryContainer}>
            <h2 className={styles.category}>기타</h2>
            <ul className={styles.menuContainer}>
              <li className={styles.menu}>
                <NavLink
                  className={styles.menuItem}
                  to="#"
                  activeClassName="selected"
                >
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
