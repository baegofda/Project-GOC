import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.css";
const LOGO = "/assets/images/main-logo.png";

const Header = (props) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <Link to="/">
          <img src={LOGO} alt="" />
        </Link>
      </h1>
      <nav>
        <ul>
          <li>
            <h2>국내</h2>
            <ul>
              <li>
                <NavLink to="/" activeClassName="selected">
                  국내 종합 현황
                </NavLink>
              </li>
              <li>
                <NavLink to="#" activeClassName="selected">
                  국내 시도별 현황
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <h2>해외</h2>
            <ul>
              <li>
                <NavLink to="#" activeClassName="selected">
                  해외 종합 현황
                </NavLink>
              </li>
              <li>
                <NavLink to="#" activeClassName="selected">
                  해외 주변 국가별 현황
                </NavLink>
              </li>
              <li>
                <NavLink to="#" activeClassName="selected">
                  전 세계 대시보드
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <h2>정보</h2>
            <ul>
              <li>
                <NavLink to="#" activeClassName="selected">
                  코로나19 정보
                </NavLink>
              </li>
              <li>
                <NavLink to="#" activeClassName="selected">
                  주요 뉴스
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <h2>기타</h2>
            <ul>
              <li>
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
