import React, { useEffect, useState } from "react";
import { ColumnChart, PieChart } from "@toast-ui/react-chart";
import axios from "axios";
import styles from "./KoreaAllData.module.css";
import ContentTitle from "../../ContentTitle/ContentTitle";
import ContentPanel from "../../ContentPanel/ContentPanel";

const KoreaAllData = () => {
  const [title, setTitle] = useState({
    title: "국내 종합 현황",
    desc: "국내 코로나 종합 현황판과 일별 현황 차트를 제공합니다.",
  });
  const [panelData, setPanelData] = useState([]);
  const [cardsData, setCardsData] = useState([]);
  const [chartData, setChartData] = useState({
    categories: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    series: [
      {
        name: "Income",
        data: [8000, 4000, 7000, 2000, 6000, 3000, 5000],
      },
      {
        name: "Expenses",
        data: [4000, 4000, 6000, 3000, 4000, 5000, 7000],
      },
      {
        name: "Debt",
        data: [3000, 4000, 3000, 1000, 2000, 4000, 3000],
      },
    ],
  });
  const [options, setOptions] = useState({
    chart: { animation: true, title: "일별 현황", height: 200 },
  });

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
      { id: "2", category: "국내 발생", cnt: totalLocalCnt },
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

  const chartDataHandler = (data) => {};
  useEffect(() => {
    const callPanelData = async () => {
      axios
        .get("/api")
        .then((res) => {
          const totalData =
            res.data.elements[0].elements[1].elements[0].elements[18].elements;
          const yesterDayData =
            res.data.elements[0].elements[1].elements[0].elements[37].elements;
          panelDataHandler(totalData);
          cardsDataHandler(totalData, yesterDayData);
          chartDataHandler();
        })
        .catch((err) => console.log(err));
    };

    callPanelData();
  }, []);

  return (
    <>
      <ContentTitle data={title} />
      <ContentPanel panelData={panelData} cardsData={cardsData} />
      <article className={styles.wrap}>
        <ColumnChart data={chartData} options={options} />
      </article>
    </>
  );
};

export default KoreaAllData;
