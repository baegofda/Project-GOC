import React, { useState } from "react";
import ContentTitle from "../ContentTitle/ContentTitle";
import styles from "./Other.module.css";

const Other = () => {
  const [title, setTitle] = useState({
    title: "데이터 출처",
    desc: "사이트에 사용된 자료 & 데이터들의 출처등을 나타냅니다.",
  });
  const [resource, setResource] = useState({
    title: [
      { id: "1", title: "데이터시각화", category: "visual" },
      {
        id: "2",
        title: "데이터 출처",
        category: "resource",
      },
    ],
    link: [
      {
        id: "1",
        name: "TOAST UI",
        url: "https://ui.toast.com/",
        desc:
          "Data Visualisation을 위한 BarChart, ColumnChart, PieChart 라이브러리",
        category: "visual",
      },
      {
        id: "2",
        name: "공공데이터포털 OPEN API",
        url: "https://www.data.go.kr/",
        desc: "국내 종합현황, 시도별 현황, 백신 접종 센터 정보",
        category: "resource",
      },
      {
        id: "3",
        name: "NovelCOVID API",
        url: "https://github.com/disease-sh/API",
        desc: "해외 종합현황, 주변국가별 현황",
        category: "resource",
      },
      {
        id: "4",
        name: "Johns Hopkins CSSE",
        url: "https://systems.jhu.edu/",
        desc: "전 세계 대시보드",
        category: "resource",
      },
      {
        id: "5",
        name: "네이버 뉴스 API",
        url: "https://developers.naver.com/docs/search/news/",
        desc: "주요 뉴스 (네이버 뉴스)",
        category: "resource",
      },
      {
        id: "6",
        name: "다음 뉴스 API",
        url:
          "https://developers.kakao.com/docs/latest/ko/daum-search/dev-guide",
        desc: "주요 뉴스 (다음 뉴스)",
        category: "resource",
      },
    ],
  });
  return (
    <>
      <ContentTitle data={title} />
      {resource.title.map((title) => (
        <article key={title.id} className={styles.wrap}>
          <h3 className={styles.title}>{title.title}</h3>
          <ul className={styles.items}>
            {resource.link
              .filter((link) => link.category === title.category)
              .map((link) => (
                <li key={link.id} className={styles.items}>
                  <a className={styles.link} href={link.url} target="blank">
                    <span className={styles.site}>{link.name}</span> -{" "}
                    {link.desc}
                  </a>
                </li>
              ))}
          </ul>
        </article>
      ))}
    </>
  );
};

export default Other;
