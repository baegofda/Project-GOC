import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import ContentTitle from "../../ContentTitle/ContentTitle";
import Err from "../../Err/Err";
import Loading from "../../Loading/Loading";
import axios from "axios";
import styles from "./KoreaCityData.module.css";

const KoreaCityData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState(true);
  const [title, setTitle] = useState({
    title: "시도별 현황",
    desc: "시도별 현황 차트를 제공합니다. (단위: 명)",
  });
  const [chartData, setChartData] = useState({});
  useEffect(() => {
    const dataHandler = (items) => {
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
      const category = arr.map((obj) => {
        return obj.category;
      });
      const localData = arr.map((obj) => {
        return Number(obj.localData).toLocaleString();
      });
      const overFlowData = arr.map((obj) => {
        return Number(obj.overFlowData).toLocaleString();
      });
      console.log(arr);

      // setChartData({
      // labels: category,
      // datasets: [
      //   {
      //     label: '# of Votes',
      //     data: localData,
      //     backgroundColor: [
      //       'rgba(255, 99, 132, 0.2)',
      //       'rgba(54, 162, 235, 0.2)',
      //       'rgba(255, 206, 86, 0.2)',
      //       'rgba(75, 192, 192, 0.2)',
      //       'rgba(153, 102, 255, 0.2)',
      //       'rgba(255, 159, 64, 0.2)',
      //     ],
      //     borderColor: [
      //       'rgba(255, 99, 132, 1)',
      //       'rgba(54, 162, 235, 1)',
      //       'rgba(255, 206, 86, 1)',
      //       'rgba(75, 192, 192, 1)',
      //       'rgba(153, 102, 255, 1)',
      //       'rgba(255, 159, 64, 1)',
      //     ],
      //     borderWidth: 1,
      //   },
      // ],
      // });
    };

    axios
      .get("/api/city")
      .then((res) => {
        const data = res.data.elements[0].elements[1].elements[0].elements;
        const items = data.slice(0, 19);
        dataHandler(items);
        setIsLoading(false);
      })
      .catch((err) => {
        setStatus(false);
        console.log(err);
      });

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
              {/* <Doughnut data={chartData} /> */}
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
