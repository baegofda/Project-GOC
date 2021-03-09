import React, { useEffect, useState } from "react";
import styles from "./JHUDashboard.module.css";
import debounce from "lodash.debounce";
import ContentTitle from "../../ContentTitle/ContentTitle";

const JHUDashboard = () => {
  const [display, setCurrentWidth] = useState(true);
  const [title, setTitle] = useState({
    title: "전 세계 대시보드",
    desc:
      "Johns Hopkins CSSE(존스 홉킨스 대학교)의 전세계 코로나 현황판을 보여줍니다.",
  });

  useEffect(() => {
    const handleResize = debounce(() => {
      const currentWidth = window.innerWidth;
      setCurrentWidth(currentWidth >= 768 ? true : false);
    }, 300);

    window.addEventListener("resize", handleResize);
    return () => {
      window.addEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <ContentTitle data={title} />
      <article className={styles.wrap}>
        <h3 className="sr-only">전 세계 대시보드</h3>
        <iframe
          className={styles.dashboard}
          width="auto"
          height="auto"
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
          <cite>
            <a href="https://systems.jhu.edu/" target="blank">
              Johns Hopkins CSSE
            </a>
          </cite>
        </p>
      </article>
    </>
  );
};

export default JHUDashboard;
