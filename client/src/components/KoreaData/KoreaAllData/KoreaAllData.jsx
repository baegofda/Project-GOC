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

  const panelDataHandler = (totalData, yesterDayData) => {
    const totalDecideCnt = totalData[7].elements[0].text;
    const totalExamCnt = totalData[8].elements[0].text;
    const totalCareCnt = totalData[3].elements[0].text;
    const totalClearCnt = totalData[4].elements[0].text;
    const totalDeathCnt = totalData[6].elements[0].text;

    const yesterDayDecideCnt = yesterDayData[7].elements[0].text;
    const yesterDayExamCnt = yesterDayData[8].elements[0].text;
    const yesterDayCareCnt = yesterDayData[3].elements[0].text;
    const yesterDayClearCnt = yesterDayData[4].elements[0].text;
    const yesterDayDeathCnt = yesterDayData[6].elements[0].text;

    const newDecideCnt = totalDecideCnt - yesterDayDecideCnt;
    const newDayExamCnt = totalExamCnt - yesterDayExamCnt;
    const newCareCnt = totalCareCnt - yesterDayCareCnt;
    const newClearCnt = totalClearCnt - yesterDayClearCnt;
    const newDeathCnt = totalDeathCnt - yesterDayDeathCnt;
    setPanelData([
      { id: "1", title: "확진자 수", count: totalDecideCnt, new: newDecideCnt },
      { id: "2", title: "검사진행", count: totalExamCnt, new: newDayExamCnt },
      { id: "3", title: "치료 중", count: totalCareCnt, new: newCareCnt },
      { id: "4", title: "완치자 수", count: totalClearCnt, new: newClearCnt },
      { id: "5", title: "사망자 수", count: totalDeathCnt, new: newDeathCnt },
    ]);
  };

  useEffect(() => {
    const callApi = async () => {
      axios
        .get("/api")
        .then((res) => {
          const totalData =
            res.data.elements[0].elements[1].elements[0].elements[0].elements;
          const yesterDayData =
            res.data.elements[0].elements[1].elements[0].elements[1].elements;
          panelDataHandler(totalData, yesterDayData);
        })
        .catch((err) => console.log(err));
    };

    callApi();
  }, []);

  return (
    <>
      <ContentTitle data={title} />
      <ContentPanel data={panelData} />
    </>
  );
};

export default KoreaAllData;
