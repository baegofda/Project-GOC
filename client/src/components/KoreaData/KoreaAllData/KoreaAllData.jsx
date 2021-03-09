import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./KoreaAllData.module.css";
import ContentTitle from "../../ContentTitle/ContentTitle";

const KoreaAllData = () => {
  const [title, setTitle] = useState({
    title: "국내 종합 현황",
    desc: "국내 코로나 종합 현황판과 일주일 현황 차트를 제공합니다.",
  });

  useEffect(() => {
    const callApi = async () => {
      axios
        .get("/api")
        .then((res) =>
          console.log(res.data.elements[0].elements[1].elements[0].elements)
        )
        .catch((err) => console.log(err));
    };

    callApi();
  }, []);

  return (
    <>
      <ContentTitle data={title} />
    </>
  );
};

export default KoreaAllData;
