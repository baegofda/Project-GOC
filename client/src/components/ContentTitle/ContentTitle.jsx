import React from "react";
import styles from "./ContentTitle.module.css";

const ContentTitle = () => {
  return (
    <dl className={styles.wrap}>
      <dt className={styles.title}>
        <h2 className={styles.item}>전 세계 대시보드</h2>
      </dt>
      <dd className={styles.description}>
        * Johns Hopkins CSSE(존스홉킨스)의 전 세계 코로나 현황판을 보여줍니다.
      </dd>
    </dl>
  );
};

export default ContentTitle;
