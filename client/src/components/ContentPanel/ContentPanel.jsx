import React from "react";
import styles from "./ContentPanel.module.css";

const ContentPanel = ({ data }) => {
  return (
    <section className={styles.wrap}>
      <dl className={styles.panels}>
        <div className={styles.panel}>
          <dt className={styles.category}>일일 현황</dt>
          <dd className={styles.cnt}>444</dd>
        </div>
        <div className={styles.panel}>
          <dt className={styles.category}>국내 발생</dt>
          <dd className={styles.cnt}>422</dd>
        </div>
        <div className={styles.panel}>
          <dt className={styles.category}>해외 유입</dt>
          <dd className={styles.cnt}>22</dd>
        </div>
      </dl>
      <h3 className="sr-only">국내 종합 현황 수</h3>
      <dl className={styles.cards}>
        {data.map((item) => (
          <div key={item.id} className={styles.card}>
            <dt className={styles.title}>{item.title}</dt>
            <dd className={styles.count}>{item.count}</dd>
            <dd className={styles.sub}>+ {item.new}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default ContentPanel;
