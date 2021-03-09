import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./KoreaAllData.module.css";
import ContentTitle from "../../ContentTitle/ContentTitle";
import ContentPanel from "../../ContentPanel/ContentPanel";

const KoreaAllData = () => {
  const [title, setTitle] = useState({
    title: "국내 종합 현황",
    desc: "국내 코로나 종합 현황판과 일주일 현황 차트를 제공합니다.",
  });
  const [panelData, setPanelData] = useState([]);
  const [cardsData, setCardsData] = useState([]);

  // // 전일대비증감
  // const totalIncCnt = totalData[6].elements[0].text;
  // // 지역발생
  // const totalLocalCnt = totalData[9].elements[0].text;
  // // 해외유입
  // const totalOverflowCnt = totalData[10].elements[0].text;

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

  useEffect(() => {
    const callApi = async () => {
      axios
        .get("/api")
        .then((res) => {
          const totalData =
            res.data.elements[0].elements[1].elements[0].elements[18].elements;
          const yesterDayData =
            res.data.elements[0].elements[1].elements[0].elements[37].elements;
          cardsDataHandler(totalData, yesterDayData);
          console.log(totalData);
        })
        .catch((err) => console.log(err));
    };

    callApi();
  }, []);

  return (
    <>
      <ContentTitle data={title} />
      <ContentPanel data={cardsData} />
    </>
  );
};

export default KoreaAllData;
