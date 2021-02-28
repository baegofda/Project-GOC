import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = (props) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <Link to="/">
          <img src="" alt="" />
        </Link>
      </h1>
      <nav>
        <ul>
          <li>
            <h2>국내</h2>
            <ul>
              <li>
                <Link to="#">국내 종합 현황</Link>
              </li>
              <li>
                <Link to="#">국내 시도별 현황</Link>
              </li>
            </ul>
          </li>
          <li>
            <h2>해외</h2>
            <ul>
              <li>
                <Link to="#">해외 종합 현황</Link>
              </li>
              <li>
                <Link to="#">해외 주변 국가별 현황</Link>
              </li>
              <li>
                <Link to="#">전 세계 대시보드</Link>
              </li>
            </ul>
          </li>
          <li>
            <h2>정보</h2>
            <ul>
              <li>
                <Link to="#">코로나19 정보</Link>
              </li>
              <li>
                <Link to="#">주요 뉴스</Link>
              </li>
            </ul>
          </li>
          <li>
            <h2>기타</h2>
            <ul>
              <li>
                <Link to="#">데이터 출처</Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
