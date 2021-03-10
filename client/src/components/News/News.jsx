import React, { useEffect, useState } from "react";
import axios from "axios";
import ContentTitle from "../ContentTitle/ContentTitle";
import styles from "./News.module.css";

const News = () => {
  const [title, setTitle] = useState({
    title: "주요 뉴스",
    desc: "코로나 백신과 관련된 주요 뉴스들을 보여줍니다.",
  });

  useEffect(() => {
    axios
      .get("/api/news")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  });

  return (
    <>
      <ContentTitle data={title} />
      <section className={styles.wrap}>
        <h3 className={styles.title}>네이버 뉴스 목록</h3>
        <ul className={styles.items}>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </section>
    </>
  );
};

export default News;
