import React, { useState } from "react";
import ContentTitle from "../ContentTitle/ContentTitle";
import Loading from "../Loading/Loading";
import styles from "./Other.module.css";

const Other = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState({
    title: "데이터 출처",
    desc: "사이트에 사용된 자료와 데이터들의 출처등을 나타냅니다.",
  });
  const [resource, setResource] = useState({
    title: [
      { id: "1", title: "데이터 시각화", category: "visual" },
      {
        id: "2",
        title: "데이터 출처",
        category: "resource",
      },
    ],
    link: [
      {
        id: "1",
        name: "Chart.js",
        url: "https://www.chartjs.org/",
        desc: "Data Visualisation을 위한 라이브러리",
        category: "visual",
      },
      {
        id: "2",
        name: "카카오맵 API",
        url: "https://apis.map.kakao.com/",
        desc: "백신 예방센터 위치를 표시하기 위한 지도 API",
        category: "visual",
      },
      {
        id: "3",
        name: "공공데이터포털 OPEN API",
        url: "https://www.data.go.kr/",
        desc: "국내 종합현황, 시도별 현황, 백신 접종 센터 정보",
        category: "resource",
      },
      {
        id: "4",
        name: "NovelCOVID API",
        url: "https://github.com/disease-sh/API",
        desc: "해외 종합현황, 주변국가별 현황",
        category: "resource",
      },
      {
        id: "5",
        name: "Johns Hopkins CSSE",
        url: "https://systems.jhu.edu/",
        desc: "전 세계 대시보드",
        category: "resource",
      },
      {
        id: "6",
        name: "네이버 뉴스 API",
        url: "https://developers.naver.com/docs/search/news/",
        desc: "주요 뉴스 (네이버 뉴스)",
        category: "resource",
      },
      {
        id: "7",
        name: "다음 검색 API",
        url:
          "https://developers.kakao.com/docs/latest/ko/daum-search/dev-guide",
        desc: "웹 문서 (다음 뉴스, 글, 문서)",
        category: "resource",
      },
    ],
  });
  setTimeout(() => {
    console.log("loading");
    setIsLoading(false);
  }, 500);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
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
      )}
    </>
  );
};

export default Other;
