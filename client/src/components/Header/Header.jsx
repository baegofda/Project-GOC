import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import List from "./List/List";
import { headerData } from "../../const";
const LOGO = "/assets/images/main-logo.png";

const Header = () => {
  const [isToggle, setIsToggle] = useState(false);
  const toggle = isToggle ? styles.toggle : "";

  const onToggle = (e) => {
    e.preventDefault();
    setIsToggle(isToggle ? false : true);
  };

  return (
    <header className={styles.header}>
      <div className={styles.wrap}>
        <span className={styles.gnb}>
          <Link
            className={styles.btn}
            to="#"
            onClick={onToggle}
            title="메뉴 리스트"
          >
            {isToggle ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#000"
                width="24"
                height="24"
              >
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
          <Link className={styles.link} to="/" title="코로나야 사라져라">
            <img className={styles.img} src={LOGO} alt="" />
          </Link>
        </h1>
      </div>
      <nav className={`${styles.nav} ${toggle}`}>
        <ul className={styles.container}>
          {headerData.map((category) => (
            <li key={category.id} className={styles.list}>
              <span className={styles.category}>{category.categoryName}</span>
              <List type={category.type} />
            </li>
          ))}
        </ul>
        <footer className={styles.footer}>
          <strong className={styles.auth}>개발자 : 이준호(Juno)</strong>
        </footer>
      </nav>
    </header>
  );
};

export default Header;
