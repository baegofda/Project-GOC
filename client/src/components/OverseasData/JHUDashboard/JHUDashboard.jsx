import React, { useEffect, useState } from "react";
import styles from "./JHUDashboard.module.css";
import debounce from "lodash.debounce";
import ContentTitle from "../../ContentTitle/ContentTitle";
import Loading from "../../Loading/Loading";
import { titleContents } from "../../../const";

const JHUDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [display, setCurrentWidth] = useState(true);
  setInterval(() => {
    setIsLoading(false);
  }, 500);
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
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <ContentTitle data={titleContents.Overseas.Dashboard} />
          <article className={styles.wrap}>
            <h3 className="sr-only">전 세계 대시보드</h3>
            <iframe
              className={styles.dashboard}
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
      )}
    </>
  );
};

export default JHUDashboard;
