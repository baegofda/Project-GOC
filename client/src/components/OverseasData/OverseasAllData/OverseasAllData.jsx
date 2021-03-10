import React, { useState } from "react";
import ContentTitle from "../../ContentTitle/ContentTitle";
import styles from "./OverseasAllData.module.css";

const OverseasAllData = () => {
  const [title, setTitle] = useState({
    title: "해외 종합 현황",
    desc: "해외 코로나 종합 현황판과 일별 현황 차트를 제공합니다.",
  });
  return (
    <>
      <ContentTitle data={title} />
      <div></div>
    </>
  );
};

export default OverseasAllData;
