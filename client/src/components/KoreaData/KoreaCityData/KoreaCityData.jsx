import React, { useEffect, useState } from "react";
import ContentTitle from "../../ContentTitle/ContentTitle";
import Err from "../../Err/Err";
import Loading from "../../Loading/Loading";
import styles from "./KoreaCityData.module.css";

const KoreaCityData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState(true);
  const [title, setTitle] = useState({
    title: "시도별 현황",
    desc: "시도별 현황 차트를 제공합니다. (단위: 명)",
  });
  useEffect(() => {
    // const callPanelData = () => {
    //   axios
    //     .get("/api/city")
    //     .then((res) => {
    //       setIsLoading(false);
    //     })
    //     .catch((err) => {
    //       setStatus(false);
    //       console.log(err);
    //     });
    // };
    // callPanelData();
    setIsLoading(false);
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
              <div>ddddddddddddddddddddd</div>
            </>
          )}
        </>
      ) : (
        <Err />
      )}
    </>
  );
};

export default KoreaCityData;
