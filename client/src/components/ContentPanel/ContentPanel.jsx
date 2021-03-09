import React from "react";
import styles from "./ContentPanel.module.css";

const ContentPanel = () => {
  return (
    <section className={styles.wrap}>
      <h3 className="sr-only">국내 종합 현황 수</h3>
      <dl className={styles.panel}>
        <div className={styles.card}>
          <dt className={styles.title}>확진자 수</dt>
          <dd className={styles.count}>12345677</dd>
          <dd className={styles.sub}>+555</dd>
        </div>
        <div className={styles.card}>
          <dt className={styles.title}>격리해제 수</dt>
          <dd className={styles.count}>12345677</dd>
          <dd className={styles.sub}>+444</dd>
        </div>
        <div className={styles.card}>
          <dt className={styles.title}>검사진행 수</dt>
          <dd className={styles.count}>12345677</dd>
          <dd className={styles.sub}>+3232</dd>
        </div>
        <div className={styles.card}>
          <dt className={styles.title}>사망자 수</dt>
          <dd className={styles.count}>12345677</dd>
          <dd className={styles.sub}>+33</dd>
        </div>
        <div className={styles.card}>
          <dt className={styles.title}>치료중 환자 수</dt>
          <dd className={styles.count}>12345677</dd>
          <dd className={styles.sub}>+422</dd>
        </div>
      </dl>
    </section>
  );
};

export default ContentPanel;
