import React from "react";
import styles from "./ContentPanel.module.css";

const ContentPanel = ({ panelData, cardsData }) => {
  return (
    <section className={styles.wrap}>
      <dl className={styles.panels}>
        {panelData.map((item) => (
          <div key={item.id} className={styles.panel}>
            <dt className={styles.category}>{item.category}</dt>
            <dd className={styles.cnt}>{item.cnt}</dd>
          </div>
        ))}
      </dl>
      <h3 className="sr-only">국내 종합 현황 수</h3>
      <dl className={styles.cards}>
        {cardsData.map((item) => (
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
