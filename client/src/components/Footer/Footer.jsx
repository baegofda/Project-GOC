import React, { memo } from "react";
import styles from "./Footer.module.css";

const Footer = memo(() => {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        코로나19로 인해 피해를 입은 모든 분들을 응원하며 확산 방지에 힘써주시는
        모든 분들 감사합니다. by 개발자 이준호 <br />
        <span className={styles.copy}>
          Copyright © 2021. Dale All rights reserved.
        </span>
      </p>
    </footer>
  );
});

export default Footer;
