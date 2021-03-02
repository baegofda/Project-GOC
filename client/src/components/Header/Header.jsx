import React, { useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.css";
const LOGO = "/assets/images/main-logo.png";

const Header = (props) => {
  const gnb = useRef();
  const [isToggle, setIsToggle] = useState(false);
  const toggle = isToggle ? styles.toggle : "";

  const onToggle = (e) => {
    e.preventDefault();
    setIsToggle(isToggle ? false : true);
  };

  return (
    <header className={styles.header}>
      <span className={styles.gnb}>
        <Link ref={gnb} className={styles.gnbToggle} to="#" onClick={onToggle}>
          {isToggle ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#000"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              fill="#000"
              width="24"
              height="24"
            >
              <path d="M12.83 352h262.34A12.82 12.82 0 0 0 288 339.17v-38.34A12.82 12.82 0 0 0 275.17 288H12.83A12.82 12.82 0 0 0 0 300.83v38.34A12.82 12.82 0 0 0 12.83 352zm0-256h262.34A12.82 12.82 0 0 0 288 83.17V44.83A12.82 12.82 0 0 0 275.17 32H12.83A12.82 12.82 0 0 0 0 44.83v38.34A12.82 12.82 0 0 0 12.83 96zM432 160H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0 256H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z" />
            </svg>
          )}
        </Link>
      </span>
      <h1 className={styles.logo}>
        <Link className={styles.logoLink} to="/">
          <img className={styles.img} src={LOGO} alt="코로나야 사라져라 ~!" />
        </Link>
      </h1>
      <nav className={`${styles.nav} ${toggle}`}>
        <ul className={styles.navContainer}>
          <li className={styles.categoryContainer}>
            <h2 className={styles.category}>국내</h2>
            <ul className={styles.menuContainer}>
              <li className={styles.menu}>
                <NavLink
                  exact
                  className={styles.menuItem}
                  to="/"
                  activeClassName={styles.selected}
                >
                  <svg
                    className={styles.ico}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    fill="rgba(0,0,0,0.6)"
                    width="20"
                    height="20"
                  >
                    <title>국내 종합 현황</title>
                    <path d="M27,28V6H19V28H15V14H7V28H4V2H2V28a2,2,0,0,0,2,2H30V28ZM13,28H9V16h4Zm12,0H21V8h4Z" />
                    <rect
                      width="20"
                      height="20"
                      fill="none"
                      data-name="&lt;Transparent Rectangle>"
                    />
                  </svg>
                  국내 종합 현황
                </NavLink>
              </li>
              <li className={styles.menu}>
                <NavLink
                  className={styles.menuItem}
                  to="/city"
                  activeClassName={styles.selected}
                >
                  <svg
                    className={styles.ico}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="rgba(0,0,0,0.6)"
                    width="20"
                    height="20"
                  >
                    <title>시도별 현황</title>
                    <path fill="none" d="M0 0H24V24H0z" />
                    <path d="M11 2.05v2.012C7.054 4.554 4 7.92 4 12c0 4.418 3.582 8 8 8 1.849 0 3.55-.627 4.906-1.68l1.423 1.423C16.605 21.153 14.4 22 12 22 6.477 22 2 17.523 2 12c0-5.185 3.947-9.449 9-9.95zM21.95 13c-.2 2.011-.994 3.847-2.207 5.328l-1.423-1.422c.86-1.107 1.436-2.445 1.618-3.906h2.013zM13.002 2.05c4.724.469 8.48 4.226 8.95 8.95h-2.013c-.451-3.618-3.319-6.486-6.937-6.938V2.049z" />
                  </svg>
                  시도별 현황
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
                  to="/all"
                  activeClassName={styles.selected}
                >
                  <svg
                    className={styles.ico}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    fill="rgba(0,0,0,0.6)"
                    width="20"
                    height="20"
                  >
                    <title>해외 종합 현황</title>
                    <path d="M4.67,28l6.39-12,7.3,6.49a2,2,0,0,0,1.7.47,2,2,0,0,0,1.42-1.07L27,10.9,25.18,10,19.69,21l-7.3-6.49A2,2,0,0,0,10.71,14a2,2,0,0,0-1.42,1L4,25V2H2V28a2,2,0,0,0,2,2H30V28Z" />
                    <rect
                      width="20"
                      height="20"
                      fill="none"
                      data-name="&lt;Transparent Rectangle>"
                    />
                  </svg>
                  해외 종합 현황
                </NavLink>
              </li>
              <li className={styles.menu}>
                <NavLink
                  className={styles.menuItem}
                  to="/country"
                  activeClassName={styles.selected}
                >
                  <svg
                    className={styles.ico}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="rgba(0,0,0,0.6)"
                    width="20"
                    height="20"
                  >
                    <title>주변 국가별 현황</title>
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 22C6.477 22 2 17.523 2 12c0-4.478 2.943-8.268 7-9.542v2.124A8.003 8.003 0 0 0 12 20a8.003 8.003 0 0 0 7.418-5h2.124c-1.274 4.057-5.064 7-9.542 7zm9.95-9H11V2.05c.329-.033.663-.05 1-.05 5.523 0 10 4.477 10 10 0 .337-.017.671-.05 1zM13 4.062V11h6.938A8.004 8.004 0 0 0 13 4.062z" />
                  </svg>
                  주변 국가별 현황
                </NavLink>
              </li>
              <li className={styles.menu}>
                <NavLink
                  className={styles.menuItem}
                  to="/dashboard"
                  activeClassName={styles.selected}
                >
                  <svg
                    className={styles.ico}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="rgba(0,0,0,0.6)"
                    width="20"
                    height="20"
                  >
                    <title>전 세계 대시보드</title>
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M13 21V11h8v10h-8zM3 13V3h8v10H3zm6-2V5H5v6h4zM3 21v-6h8v6H3zm2-2h4v-2H5v2zm10 0h4v-6h-4v6zM13 3h8v6h-8V3zm2 2v2h4V5h-4z" />
                  </svg>
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
                  to="/information"
                  activeClassName={styles.selected}
                >
                  <svg
                    className={styles.ico}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="rgba(0,0,0,0.6)"
                    width="20"
                    height="20"
                  >
                    <title>코로나19 정보</title>
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z" />
                  </svg>
                  코로나19 정보
                </NavLink>
              </li>
              <li className={styles.menu}>
                <NavLink
                  className={styles.menuItem}
                  to="/news"
                  activeClassName={styles.selected}
                >
                  <svg
                    className={styles.ico}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="rgba(0,0,0,0.6)"
                    width="20"
                    height="20"
                  >
                    <title>주요 뉴스</title>
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M20 22H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1zm-1-2V4H5v16h14zM7 6h4v4H7V6zm0 6h10v2H7v-2zm0 4h10v2H7v-2zm6-9h4v2h-4V7z" />
                  </svg>
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
                  to="/source"
                  activeClassName={styles.selected}
                >
                  <svg
                    className={styles.ico}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="rgba(0,0,0,0.6)"
                    width="20"
                    height="20"
                  >
                    <title>데이터 출처</title>
                    <path fill="none" d="M0 0H24V24H0z" />
                    <path d="M12 2c5.523 0 10 4.477 10 10 0 4.4-2.841 8.136-6.789 9.473l-.226.074-2.904-7.55C13.15 13.95 14 13.054 14 12c0-1.105-.895-2-2-2s-2 .895-2 2c0 1.077.851 1.955 1.917 1.998l-2.903 7.549-.225-.074C4.84 20.136 2 16.4 2 12 2 6.477 6.477 2 12 2zm0 2c-4.418 0-8 3.582-8 8 0 2.92 1.564 5.475 3.901 6.872l1.48-3.849C8.534 14.29 8 13.207 8 12c0-2.21 1.79-4 4-4s4 1.79 4 4c0 1.207-.535 2.29-1.38 3.023.565 1.474 1.059 2.757 1.479 3.85C18.435 17.475 20 14.92 20 12c0-4.418-3.582-8-8-8z" />
                  </svg>
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
