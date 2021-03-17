import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import ContentTitle from "../ContentTitle/ContentTitle";
import styles from "./News.module.css";
import Err from "../Err/Err";
import Loading from "../Loading/Loading";

const News = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState(true);
  let i = 0;
  const [title, setTitle] = useState({
    title: "주요 소식",
    desc:
      "'코로나 백신'과 관련된 웹 문서들을 보여줍니다. (최신 문서 10개 기준)",
  });
  const [news, setNews] = useState({});

  useEffect(() => {
    setInterval(() => {
      setIsLoading(false);
    }, 500);

    const dataHandler = (items) => {
      const arr = items.reduce((prev, curr) => {
        const reg = /[<b>|</b>|&qout|amp|lt|gt;]/g;
        const regTitle = curr.title
          .replace(reg, "")
          .replace(/#39/g, "'")
          .replace(/#34/g, '"');
        const itemDate = moment(curr.date).format("L");
        const itemYear = itemDate.split("/")[2];
        const itemMonth = itemDate.split("/")[0];
        const itemDay = itemDate.split("/")[1];
        const itemDesc = curr.desc;
        const articleDate = `${itemYear}.${itemMonth}.${itemDay}`;
        const articleDesc = itemDesc
          .replace(reg, "")
          .replace(/#39/g, "'")
          .replace(/#34/g, '"');
        const articleUrl = curr.url;
        const articleSite = curr.site;

        prev.push({
          id: i++,
          title: regTitle,
          desc: articleDesc,
          url: articleUrl,
          date: articleDate,
          site: articleSite,
        });

        return prev;
      }, []);

      setNews({
        categories: [
          { id: "1", name: "네이버 검색 목록", site: "naver" },
          { id: "2", name: "다음 문서 목록", site: "daum" },
        ],
        articles: arr,
      });
    };

    axios
      .all([axios.get("/api/news/naver"), axios.get("/api/news/daum")])
      .then(
        axios.spread((res1, res2) => {
          const naverArr = res1.data.items.reduce((prev, curr) => {
            prev.push({
              title: curr.title,
              desc: curr.description,
              url: curr.link,
              date: curr.pubDate,
              site: "naver",
            });

            return prev;
          }, []);

          const daumArr = res2.data.documents.reduce((prev, curr) => {
            prev.push({
              title: curr.title,
              desc: curr.contents,
              url: curr.url,
              date: curr.datetime,
              site: "daum",
            });
            return prev;
          }, []);

          const arr = [...naverArr, ...daumArr];

          dataHandler(arr);
        })
      )
      .catch((err) => {
        setStatus(false);
        console.log(err);
      });
  }, [i]);

  return (
    <>
      {status ? (
        <>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <ContentTitle data={title} />
              {news.categories.map((category) => (
                <section key={category.id} className={styles.wrap}>
                  <h3 className={styles.category}>{category.name}</h3>
                  <ul className={styles.items}>
                    {news.articles
                      .filter((item) => item.site === category.site)
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
                            <span className={styles.date}>
                              {" "}
                              - {article.date}
                            </span>
                            <span className={styles.desc}>{article.desc}</span>
                          </a>
                        </li>
                      ))}
                  </ul>
                </section>
              ))}
            </>
          )}
        </>
      ) : (
        <Err />
      )}
    </>
  );
};

export default News;
