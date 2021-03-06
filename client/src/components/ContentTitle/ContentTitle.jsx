import React from "react";
import styles from "./ContentTitle.module.css";

const ContentTitle = ({ data }) => {
  return (
    <dl className={styles.wrap}>
      <dt className={styles.title}>
        <h2 className={styles.item}>{data.title}</h2>
      </dt>
      <dd className={styles.description}>*{data.desc}</dd>
    </dl>
  );
};

export default ContentTitle;
