import axios from "axios";
import React, { useEffect, useState } from "react";
import ContentPanel from "../../ContentPanel/ContentPanel";
import ContentTitle from "../../ContentTitle/ContentTitle";
import styles from "./OverseasAllData.module.css";

const OverseasAllData = () => {
  const [panelData, setPanelData] = useState([]);
  const [title, setTitle] = useState({
    title: "해외 종합 현황",
    desc: "해외 코로나 종합 현황판과 일별 현황 차트를 제공합니다.",
  });

  useEffect(() => {
    axios.get("/api/all").then((res) => console.log(res));
  });

  return (
    <>
      <ContentTitle data={title} />
      <ContentPanel />
      <div></div>
    </>
  );
};

export default OverseasAllData;
