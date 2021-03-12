import React from "react";
import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Loading;
