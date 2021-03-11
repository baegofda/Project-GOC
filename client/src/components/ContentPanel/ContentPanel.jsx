import React from "react";
import styles from "./ContentPanel.module.css";

const ContentPanel = ({ cardsData }) => {
  return (
    <dl className={styles.cards}>
      {cardsData.map((item) => (
        <div key={item.id} className={styles.card}>
          <dt className={styles.title}>{item.title}</dt>
          <dd className={styles.count}>{item.count}</dd>
          <dd className={styles.sub}>+ {item.new}</dd>
        </div>
      ))}
    </dl>
  );
};

export default ContentPanel;
