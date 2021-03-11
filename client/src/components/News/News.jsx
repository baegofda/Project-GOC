import React, { useEffect, useState } from "react";
import axios from "axios";
import ContentTitle from "../ContentTitle/ContentTitle";
import styles from "./News.module.css";
import Err from "../Err/Err";

const News = () => {
  const [status, setStatus] = useState(true);
  let i = 0;
  const newsArticles = [];
  const [title, setTitle] = useState({
    title: "주요 뉴스",
    desc: "코로나 백신과 관련된 주요 뉴스들을 보여줍니다.",
  });
  const [news, setNews] = useState({
    categories: [
      { id: "1", name: "네이버 뉴스 목록", type: "naver" },
      { id: "2", name: "다음 뉴스 목록", type: "daum" },
    ],
    articles: newsArticles,
  });
  const naverArticleHandler = (item) => {
    const reg = /[<b>|<\/b>|&qout|amp|lt|gt;]/g;
    const regTitle = item.title.replace(reg, "");
    console.log(item.pubDate);
    const data = {
      id: i++,
      title: regTitle,
      url: item.link,
      type: "naver",
    };

    newsArticles.push(data);

    setNews((news) => {
      const updated = { ...news };
      return updated;
    });
  };
  useEffect(() => {
    axios
      .get("/api/news")
      .then((res) => {
        const items = res.data.items;
        items.map((item) => naverArticleHandler(item));
      })
      .catch((err) => {
        setStatus(false);
        console.log(err);
      });
  }, []);

  return (
    <>
      {status ? (
        <>
          <ContentTitle data={title} />
          {news.categories.map((category) => (
            <section key={category.id} className={styles.wrap}>
              <h3 className={styles.category}>{category.name}</h3>
              <ul className={styles.items}>
                {news.articles
                  .filter((item) => item.type === category.type)
                  .map((article) => (
                    <li key={article.id} className={styles.item}>
                      <a
                        className={styles.link}
                        href={article.url}
                        target="blank"
                      >
                        <strong className={styles.title}>
                          {article.title}
                        </strong>
                        <span className={styles.date}></span>
                      </a>
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </>
      ) : (
        <Err />
      )}
    </>
  );
};

export default News;
