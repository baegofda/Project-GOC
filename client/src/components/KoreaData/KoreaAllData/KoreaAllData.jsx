import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import debounce from "lodash.debounce";
import axios from "axios";
import styles from "./KoreaAllData.module.css";
import ContentTitle from "../../ContentTitle/ContentTitle";
import ContentPanel from "./ContentPanel/ContentPanel";
import Err from "../../Err/Err";
import Loading from "../../Loading/Loading";

const KoreaAllData = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [display, setDisplay] = useState();
  const [status, setStatus] = useState(true);
  const [title, setTitle] = useState({
    title: "국내 종합 현황",
    desc: "국내 코로나 종합 현황판과 일별 현황 차트를 제공합니다. (단위: 명)",
  });
  const [panelData, setPanelData] = useState([]);
  const [cardsData, setCardsData] = useState([]);
  const [chartData, setChartData] = useState([]);

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
          id: "1",
          category: "일일 현황",
          cnt: totalIncCnt,
        },
        { id: "2", category: "지역 발생", cnt: totalLocalCnt },
        {
          id: "3",
          category: "해외 유입",
          cnt: totalOverflowCnt,
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
          id: "1",
          title: "확진자 수",
          count: totalDefCnt,
          new: newDefCnt,
        },
        { id: "2", title: "치료 중", count: totalIngCnt, new: newIngCnt },
        {
          id: "3",
          title: "완치자 수",
          count: totalClearCnt,
          new: newClearCnt,
        },
        {
          id: "4",
          title: "사망자 수",
          count: totalDeathCnt,
          new: newDeathCnt,
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
        const localData = curr.elements[9].elements[0].text;
        const overFlowData = curr.elements[10].elements[0].text;
        const category = curr.elements[3].elements[0].text;
        prev.push({ localData, overFlowData, date, category });
        return prev;
      }, []);
      const objs = arr
        .filter((item) => item.category === "합계")
        .map((item) => {
          return item;
        });
      const objsRe = objs.reverse();
      const date = objsRe.map((obj) => {
        return obj.date;
      });
      const localData = objsRe.map((obj) => {
        return obj.localData;
      });
      const overFlowData = objsRe.map((obj) => {
        return obj.overFlowData;
      });

      setChartData({
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
      .get("/api")
      .then((res) => {
        const totalData =
          res.data.elements[0].elements[1].elements[0].elements[18].elements;
        const yesterDayData =
          res.data.elements[0].elements[1].elements[0].elements[37].elements;
        const resData = res.data.elements[0].elements[1].elements[0].elements;
        panelDataHandler(totalData);
        cardsDataHandler(totalData, yesterDayData);
        chartDataHandler(resData);
        setIsLoading(false);
      })
      .catch((err) => {
        setStatus(false);
        console.log(err);
      });
  }, []);
  const [chartOptions, setChartOptions] = useState({
    title: {
      display: true,
      text: "일일 차트 현황",
      padding: 20,
    },
    legend: {
      position: "bottom",
      padding: 20,
    },
  });
  return (
    <>
      {status ? (
        <>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <ContentTitle data={title} />
              <ContentPanel panelData={panelData} cardsData={cardsData} />
              <div className={styles.container}>
                <article className={styles.wrap}>
                  <h3 className="sr-only">국내 종합 현황</h3>
                  {display >= 500 ? (
                    <Bar data={chartData} options={chartOptions} />
                  ) : (
                    <div className={styles.tooltip}>
                      <span className={styles.text}>
                        일일 현황 차트 보러가기
                      </span>
                      <a
                        className={styles.link}
                        href="https://www.naver.com"
                        target="blank"
                      >
                        Naver
                      </a>
                      에서 알아보기
                    </div>
                  )}
                </article>
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

export default KoreaAllData;
