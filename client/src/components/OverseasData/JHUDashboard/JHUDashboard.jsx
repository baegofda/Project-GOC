import React, { useEffect, useState } from "react";
import styles from "./JHUDashboard.module.css";
import debounce from "lodash.debounce";

const JHUDashboard = () => {
  const [display, setCurrentWidth] = useState(true);

  const handleResize = debounce(() => {
    const currentWidth = window.innerWidth;
    setCurrentWidth(currentWidth >= 768 ? true : false);
  }, 300);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.addEventListener("resize", handleResize);
    };
  }, []);

  return (
    <article className={styles.container}>
      <h2 className={styles.title}>전 세계 대시보드</h2>
      <div className={styles.wrap}>
        <iframe
          className={styles.dashboard}
          width="625"
          height="500"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          title="COVID-19"
          src={
            display
              ? "https://www.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6"
              : "https://www.arcgis.com/apps/opsdashboard/index.html#/85320e2ea5424dfaaa75ae62e5c06e61"
          }
        ></iframe>
        <p className={styles.resource}>
          출처 :
          <cite title="존스홉킨스 대학">
            Johns Hopkins University & Medicine(JHU)
          </cite>
        </p>
      </div>
    </article>
  );
};

export default JHUDashboard;