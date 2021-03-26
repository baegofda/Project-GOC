import React, { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import debounce from "lodash.debounce";
import axios from "axios";
import styles from "./KoreaAllData.module.css";
import ContentTitle from "../../ContentTitle/ContentTitle";
import ContentPanel from "./ContentPanel/ContentPanel";
import Err from "../../Err/Err";
import Loading from "../../Loading/Loading";

const KoreaAllData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [display, setDisplay] = useState();
  const [isStatus, setIsStatus] = useState(true);
  const [title, setTitle] = useState({
    title: "국내 종합 현황",
    desc:
      "국내 코로나 종합 현황판과 일일 시도별 확진자 증감 비율, 일별 현황 차트를 제공합니다. (단위: 명)",
  });
  const [panelData, setPanelData] = useState([]);
  const [cardsData, setCardsData] = useState([]);
  const [doughnutData, setDoughnutData] = useState({});
  const [barData, setBarData] = useState({});
  const [doughnutOptions, setDoughnutOptions] = useState({
    title: {
      display: true,
      text: "일일 시도별 확진자 증감 비율",
    },
    legend: {
      display: false,
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const meta = dataset._meta[Object.keys(dataset._meta)[0]];
          const total = meta.total;
          const currentValue = dataset.data[tooltipItem.index];
          const percentage = parseFloat(
            ((currentValue / total) * 100).toFixed(1)
          );
          return currentValue + " (" + percentage + "%)";
        },
        title: function (tooltipItem, data) {
          return data.labels[tooltipItem[0].index];
        },
      },
    },
  });
  const [barOptions, setBarOptions] = useState({
    title: {
      display: true,
      text: "일별 현황 차트",
      padding: 20,
    },
    legend: {
      position: "bottom",
    },
  });

  useEffect(() => {
    setDisplay(window.innerWidth);

    const handleResize = debounce(() => {
      const resizeWidth = window.innerWidth;
      setDisplay(resizeWidth);
    }, 300);

    window.addEventListener("resize", () => {
      handleResize();
    });
    return () => {
      window.addEventListener("resize", () => {
        handleResize();
      });
    };
  }, []);

  useEffect(() => {
    const panelDataHandler = (data) => {
      // 전일대비증감
      const totalIncCnt = data[6].elements[0].text;
      // 지역발생
      const totalLocalCnt = data[9].elements[0].text;
      // 해외유입
      const totalOverflowCnt = data[10].elements[0].text;

      setPanelData([
        {
          id: 0,
          category: "일일 현황",
          cnt: Number(totalIncCnt).toLocaleString(),
        },
        {
          id: 1,
          category: "지역 발생",
          cnt: Number(totalLocalCnt).toLocaleString(),
        },
        {
          id: 2,
          category: "해외 유입",
          cnt: Number(totalOverflowCnt).toLocaleString(),
        },
      ]);
    };

    const cardsDataHandler = (totalData, yesterDayData) => {
      const totalDefCnt = totalData[2].elements[0].text;
      const totalIngCnt = totalData[8].elements[0].text;
      const totalClearCnt = totalData[7].elements[0].text;
      const totalDeathCnt = totalData[1].elements[0].text;
      const yesterDayDefCnt = yesterDayData[2].elements[0].text;
      const yesterDayIngCnt = yesterDayData[8].elements[0].text;
      const yesterDayClearCnt = yesterDayData[7].elements[0].text;
      const yesterDayDeathCnt = yesterDayData[1].elements[0].text;

      //확진자
      const newDefCnt = totalDefCnt - yesterDayDefCnt;
      //검사진행
      const newIngCnt = totalIngCnt - yesterDayIngCnt;
      //격리해제
      const newClearCnt = totalClearCnt - yesterDayClearCnt;
      //사망자
      const newDeathCnt = totalDeathCnt - yesterDayDeathCnt;

      setCardsData([
        {
          id: 0,
          title: "확진자 수",
          count: Number(totalDefCnt).toLocaleString(),
          new: Number(newDefCnt).toLocaleString(),
        },
        {
          id: 1,
          title: "치료 중",
          count: Number(totalIngCnt).toLocaleString(),
          new: Number(newIngCnt).toLocaleString(),
        },
        {
          id: 2,
          title: "완치자 수",
          count: Number(totalClearCnt).toLocaleString(),
          new: Number(newClearCnt).toLocaleString(),
        },
        {
          id: 3,
          title: "사망자 수",
          count: Number(totalDeathCnt).toLocaleString(),
          new: Number(newDeathCnt).toLocaleString(),
        },
      ]);
    };

    const chartDataHandler = (items) => {
      const arr = items.reduce((prev, curr) => {
        const currDate = curr.elements[13].elements[0].text;
        const split = currDate.split(" ").slice(1, 3);
        const month = split[0].split("월").slice(0, 1);
        const day = split[1].split("일").slice(0, 1);
        const date = `${month}.${day}`;
        const confirmed = curr.elements[6].elements[0].text;
        const localData = curr.elements[9].elements[0].text;
        const overFlowData = curr.elements[10].elements[0].text;
        const category = curr.elements[3].elements[0].text;
        prev.push({ confirmed, localData, overFlowData, date, category });
        return prev;
      }, []);

      // 기타 카테고리 확진자
      const otherObjs = arr.slice(0, 9).map((item) => {
        return item;
      });
      const testConfirmed = otherObjs.map((obj) => {
        return obj.confirmed;
      });
      const otherConfirmed = testConfirmed.reduce(
        (prev, curr) => Number(prev) + Number(curr)
      );

      // 도넛 차트 데이터
      const doughnutObjs = arr.slice(9, 18).map((item) => {
        return item;
      });
      const category = doughnutObjs.map((obj) => {
        return obj.category;
      });
      const confirmed = doughnutObjs.map((obj) => {
        return obj.confirmed;
      });
      const totalCategory = [...category, "기타"];
      const totalConfirmed = [...confirmed, otherConfirmed];
      const total = totalConfirmed.reduce(
        (prev, curr) => Number(prev) + Number(curr)
      );

      //막대 차트 데이터
      const barObjs = arr
        .filter((item) => item.category === "합계")
        .map((item) => {
          return item;
        });
      const reBarObjs = barObjs.reverse();
      const date = reBarObjs.map((obj) => {
        return obj.date;
      });
      const localData = reBarObjs.map((obj) => {
        return Number(obj.localData).toLocaleString();
      });
      const overFlowData = reBarObjs.map((obj) => {
        return Number(obj.overFlowData).toLocaleString();
      });

      setDoughnutData({
        labels: totalCategory,
        total: total,
        datasets: [
          {
            label: totalCategory,
            data: totalConfirmed,
            backgroundColor: [
              "rgba(255, 255, 0, 0.6)",
              "rgba(255, 153, 0, 0.6)",
              "rgba(153, 204, 0, 0.6)",
              "rgba(153, 153, 0, 0.6)",
              "rgba(51, 102, 0, 0.6)",
              "rgba(255, 102, 0, 0.6)",
              "rgba(153, 255, 0, 0.6)",
              "rgba(153, 51, 0, 0.6)",
              "rgba(255, 0, 0, 0.6)",
              "rgba(158, 158, 158, 0.6)",
            ],
            hoverBackgroundColor: [
              "rgba(255, 255, 0, 1)",
              "rgba(255, 153, 0, 1)",
              "rgba(153, 204, 0, 1)",
              "rgba(153, 153, 0, 1)",
              "rgba(51, 102, 0, 1)",
              "rgba(255, 102, 0, 1)",
              "rgba(153, 255, 0, 1)",
              "rgba(153, 51, 0, 1)",
              "rgba(255, 0, 0, 1)",
              "rgba(158, 158, 158, 1)",
            ],
            borderWidth: 1,
          },
        ],
      });
      setBarData({
        labels: date,
        datasets: [
          {
            label: "지역 발생",
            data: localData,
            backgroundColor: "rgba(17,142,255,0.1)",
            hoverBackgroundColor: "rgba(17,142,255,0.4)",
            borderColor: "rgba(17,142,255,1)",
            borderWidth: "1",
            keepTooltipOpen: true,
          },
          {
            label: "해외 유입",
            data: overFlowData,
            backgroundColor: "rgba(188,49,224,0.1)",
            hoverBackgroundColor: "rgba(188,49,224,0.4)",
            borderColor: "rgba(188,49,224,1)",
            borderWidth: "1",
          },
        ],
      });
    };

    axios
      .get("https://projectgoc.herokuapp.com/api")
      .then((res) => {
        const data = res.data.elements[0].elements[1].elements[0].elements;
        const items = data.slice(0, 133);
        const totalData = items[18].elements;
        const yesterDayData = items[37].elements;
        panelDataHandler(totalData);
        cardsDataHandler(totalData, yesterDayData);
        chartDataHandler(items);
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
              <ContentTitle data={title} />
              <ContentPanel panelData={panelData} cardsData={cardsData} />
              {display >= 500 ? (
                <section className={styles.container}>
                  <article className={styles.wrap}>
                    <h3 className="sr-only">일일 시도별 확진자 증감 비율</h3>
                    <Doughnut data={doughnutData} options={doughnutOptions} />
                    <dl className={styles.legends}>
                      {doughnutData.labels.map((label, idx) => (
                        <div key={idx} className={styles.legend}>
                          <dt className={styles.label}>
                            <span
                              className={styles.color}
                              style={{
                                background:
                                  doughnutData.datasets[0].backgroundColor[idx],
                              }}
                            ></span>
                            {label}
                          </dt>
                          <dd className={styles.cnt}>
                            {doughnutData.datasets[0].data[
                              idx
                            ].toLocaleString()}{" "}
                            명
                            <span className={styles.per}>
                              (
                              {(
                                (doughnutData.datasets[0].data[idx] /
                                  doughnutData.total) *
                                100
                              ).toFixed(1)}
                              %)
                            </span>
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </article>
                  <article className={styles.wrap}>
                    <h3 className="sr-only">일별 현황 차트</h3>
                    <Bar data={barData} options={barOptions} />
                  </article>
                </section>
              ) : (
                <div className={styles.tooltip}>
                  <span className={styles.text}>일주일 현황 차트 보러가기</span>
                  <span>
                    <a
                      className={styles.link}
                      href="https://www.naver.com"
                      title="네이버 현황차트 보러가기"
                      target="blank"
                    >
                      Naver
                    </a>
                    에서 알아보기
                  </span>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <Err />
      )}
    </>
  );
};

export default KoreaAllData;
