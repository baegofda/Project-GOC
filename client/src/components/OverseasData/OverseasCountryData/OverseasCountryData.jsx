import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./OverseasCountryData.module.css";
import ContentTitle from "../../ContentTitle/ContentTitle";
import Err from "../../Err/Err";
import Loading from "../../Loading/Loading";

const OverseasCountryData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState(true);
  const [title, setTitle] = useState({
    title: "주변 국가별 현황",
    desc:
      "주변 국가(미국, 일본, 중국, 러시아)의 현황 차트를 제공합니다. (단위: 명)",
  });

  useEffect(() => {
    axios
      .get("/api/country")
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setStatus(false);
        console.log(err);
      });
  }, []);
  return (
    <>
      {status ? (
        <>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <ContentTitle data={title} />
            </>
          )}
        </>
      ) : (
        <Err />
      )}
    </>
  );
};

export default OverseasCountryData;
