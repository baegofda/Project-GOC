import axios from "axios";
import React, { useEffect, useState } from "react";
import ContentTitle from "../../ContentTitle/ContentTitle";
import Err from "../../Err/Err";
import Loading from "../../Loading/Loading";
import styles from "./OverseasAllData.module.css";
import { titleContents } from "../../../const";

const OverseasAllData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isStatus, setIsStatus] = useState(true);
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    const OverseasAllDataHandler = (item) => {
      setCardsData([
        {
          id: "1",
          title: "전 세계 확진자 수",
          count: Number(item.cases).toLocaleString(),
        },
        {
          id: "2",
          title: "전 세계 환자 수",
          count: Number(item.active).toLocaleString(),
        },
        {
          id: "3",
          title: "전 세계 완치자 수",
          count: Number(item.recovered).toLocaleString(),
        },
        {
          id: "4",
          title: "전 세계 사망자 수",
          count: Number(item.deaths).toLocaleString(),
        },
      ]);
    };

    axios
      .get("https://projectgoc.herokuapp.com/api/all")
      .then((res) => {
        const item = res.data;
        OverseasAllDataHandler(item);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsStatus(false);
        console.log(err);
      });
  }, []);

  return (
    <>
      {isStatus ? (
        <>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <ContentTitle data={titleContents.Overseas.All} />
              <section className={styles.wrap}>
                <h3 className="sr-only">전 세계 현황 수</h3>
                <dl className={styles.cards}>
                  {cardsData.map((card) => (
                    <div key={card.id} className={styles.card}>
                      <dt className={styles.title}>{card.title}</dt>
                      <dd className={styles.count}>{card.count}</dd>
                    </div>
                  ))}
                </dl>
              </section>
              <div className={styles.tooltip}>
                <span className={styles.text}>지도로 확인하고 싶으신가요?</span>
                <a
                  className={styles.link}
                  href="https://covid19.who.int/"
                  title="WHO지도에서 알아보기"
                  target="blank"
                >
                  <dfn>
                    <abbr
                      className={styles.desc}
                      title="World Health Organization - 세계보건기구"
                    >
                      WHO
                    </abbr>
                  </dfn>{" "}
                  에서 알아보기
                </a>
              </div>
            </>
          )}
        </>
      ) : (
        <Err />
      )}
    </>
  );
};

export default OverseasAllData;
