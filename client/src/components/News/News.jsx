import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import ContentTitle from "../ContentTitle/ContentTitle";
import styles from "./News.module.css";
import Err from "../Err/Err";
import Loading from "../Loading/Loading";
import { titleContents } from "../../const";

const News = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isStatus, setIsStatus] = useState(true);
  let i = 0;
  const [news, setNews] = useState({});

  useEffect(() => {
    const newsDataHandler = (items) => {
      const arr = items.reduce((prev, curr) => {
        const reg = /[<b>|</b>|&qout|amp|lt|gt;]/g;
        const regTitle = curr.title
          .replace(reg, "")
          .replace(/#39/g, "'")
          .replace(/#34/g, '"');
        const itemDesc = curr.desc;
        const articleDate = moment(curr.date).format("YYYY.MM.DD");
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
      .all([
        axios.get("https://projectgoc.herokuapp.com/api/news/naver"),
        axios.get("https://projectgoc.herokuapp.com/api/news/daum"),
      ])
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
          newsDataHandler(arr);
          setIsLoading(false);
        })
      )
      .catch((err) => {
        setIsStatus(false);
        console.log(err);
      });
  }, [i]);

  return (
    <>
      {isStatus ? (
        <>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <ContentTitle data={titleContents.News} />
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
                            title={article.title}
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
