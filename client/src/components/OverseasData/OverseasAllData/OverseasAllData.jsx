import axios from "axios";
import React, { useEffect, useState } from "react";
import ContentTitle from "../../ContentTitle/ContentTitle";
import styles from "./OverseasAllData.module.css";

const OverseasAllData = () => {
  const [cardsData, setCardsData] = useState([]);
  const [title, setTitle] = useState({
    title: "해외 종합 현황",
    desc: "해외 코로나 종합 현황판과 일별 현황 차트를 제공합니다.",
  });

  useEffect(() => {
    const dataHandler = (item) => {
      setCardsData([
        {
          id: "1",
          title: "전 세계 확진자 수",
          count: item.cases,
        },
        {
          id: "2",
          title: "전 세계 환자 수",
          count: item.active,
        },
        {
          id: "3",
          title: "전 세계 완치자 수",
          count: item.recovered,
        },
        {
          id: "4",
          title: "전 세계 사망자 수",
          count: item.deaths,
        },
      ]);
    };

    axios.get("/api/all").then((res) => {
      const item = res.data;
      dataHandler(item);
    });
  }, []);

  return (
    <>
      <ContentTitle data={title} />
      <section className={styles.wrap}>
        <h3 className="sr-only">전 세계 현황 수</h3>
        <dl className={styles.cards}>
          {cardsData.map((card) => (
            <div key={card.id} className={styles.card}>
              <dt className={styles.title}>{card.title}</dt>
              <dd className={styles.count}>{card.count} 명</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
};

export default OverseasAllData;
