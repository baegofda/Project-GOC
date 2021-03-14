import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./OverseasCountryData.module.css";
import ContentTitle from "../../ContentTitle/ContentTitle";
import Err from "../../Err/Err";
import Loading from "../../Loading/Loading";
import moment from "moment";
import DoughnutChart from "../../DoughnutChart/DoughnutChart";

const OverseasCountryData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState(true);
  const [title, setTitle] = useState({
    title: "주변 국가별 현황",
    desc:
      "주변 국가(미국, 일본, 중국, 러시아)의 현황 차트를 제공합니다. (단위: 명)",
  });
  const [data, setData] = useState({});
  const [options, setOptions] = useState([
    {
      title: {
        display: true,
        text: "주변 국가별 확진자 비율",
      },
      legend: {
        position: "right",
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const dataset = data.datasets[tooltipItem.datasetIndex];
            const meta = dataset._meta[Object.keys(dataset._meta)[0]];
            const total = meta.total;
            const currentValue = dataset.data[tooltipItem.index];
            const percentage = parseFloat(
              ((currentValue / total) * 100).toFixed(1)
            );
            return currentValue + " (" + percentage + "%)";
          },
          title: function (tooltipItem, data) {
            return data.labels[tooltipItem[0].index];
          },
        },
      },
    },
    {
      title: {
        display: true,
        text: "주변 국가별 완치자 비율",
      },
      legend: {
        position: "right",
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const dataset = data.datasets[tooltipItem.datasetIndex];
            const meta = dataset._meta[Object.keys(dataset._meta)[0]];
            const total = meta.total;
            const currentValue = dataset.data[tooltipItem.index];
            const percentage = parseFloat(
              ((currentValue / total) * 100).toFixed(1)
            );
            return currentValue + " (" + percentage + "%)";
          },
          title: function (tooltipItem, data) {
            return data.labels[tooltipItem[0].index];
          },
        },
      },
    },
    {
      title: {
        display: true,
        text: "주변 국가별 사망자 비율",
      },
      legend: {
        position: "right",
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const dataset = data.datasets[tooltipItem.datasetIndex];
            const meta = dataset._meta[Object.keys(dataset._meta)[0]];
            const total = meta.total;
            const currentValue = dataset.data[tooltipItem.index];
            const percentage = parseFloat(
              ((currentValue / total) * 100).toFixed(1)
            );
            return currentValue + " (" + percentage + "%)";
          },
          title: function (tooltipItem, data) {
            return data.labels[tooltipItem[0].index];
          },
        },
      },
    },
  ]);
  useEffect(() => {
    const dataHandler = (items) => {
      const arr = items.reduce((prev, curr) => {
        const date = moment()
          .subtract(1, "day")
          .format("l")
          .split("20")
          .join("");
        const beforeDate = moment()
          .subtract(2, "day")
          .format("l")
          .split("20")
          .join("");
        const country = curr.country;
        const cases = curr.timeline.cases[date]
          ? curr.timeline.cases[date]
          : curr.timeline.cases[beforeDate];
        const deaths = curr.timeline.deaths[date]
          ? curr.timeline.deaths[date]
          : curr.timeline.deaths[beforeDate];
        const recovered = curr.timeline.recovered[date]
          ? curr.timeline.recovered[date]
          : curr.timeline.recovered[beforeDate];
        prev.push({ country, cases, deaths, recovered });
        return prev;
      }, []);
      const reArr = arr.reverse();
      const country = reArr.map((item) => {
        return item.country;
      });
      const cases = reArr.map((item) => {
        return item.cases;
      });
      const deaths = reArr.map((item) => {
        return item.deaths;
      });
      const recovered = reArr.map((item) => {
        return item.recovered;
      });
      setData([
        {
          key: 0,
          labels: country,
          datasets: [
            {
              label: country,
              data: cases,
              backgroundColor: [
                "rgba(0,0,128,0.6)",
                "rgba(0,0,255,0.6)",
                "rgba(255,0,0,0.6)",
                "rgba(255,255,255,0.6)",
                "rgba(139,0,255,0.6)",
              ],
              hoverBackgroundColor: [
                "rgba(0,0,128,1)",
                "rgba(0,0,255,1)",
                "rgba(255,0,0,1)",
                "rgba(255,255,255,1)",
                "rgba(139,0,255,1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        {
          key: 1,
          labels: country,
          datasets: [
            {
              label: country,
              data: recovered,
              backgroundColor: [
                "rgba(0,0,128,0.6)",
                "rgba(0,0,255,0.6)",
                "rgba(255,0,0,0.6)",
                "rgba(255,255,255,0.6)",
                "rgba(139,0,255,0.6)",
              ],
              hoverBackgroundColor: [
                "rgba(0,0,128,1)",
                "rgba(0,0,255,1)",
                "rgba(255,0,0,1)",
                "rgba(255,255,255,1)",
                "rgba(139,0,255,1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        {
          key: 2,
          labels: country,
          datasets: [
            {
              label: country,
              data: deaths,
              backgroundColor: [
                "rgba(0,0,128,0.6)",
                "rgba(0,0,255,0.6)",
                "rgba(255,0,0,0.6)",
                "rgba(255,255,255,0.6)",
                "rgba(139,0,255,0.6)",
              ],
              hoverBackgroundColor: [
                "rgba(0,0,128,1)",
                "rgba(0,0,255,1)",
                "rgba(255,0,0,1)",
                "rgba(255,255,255,1)",
                "rgba(139,0,255,1)",
              ],
              borderWidth: 1,
            },
          ],
        },
      ]);
    };
    axios
      .get("/api/country")
      .then((res) => {
        const items = res.data;
        dataHandler(items);
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
              <DoughnutChart data={data} options={options} />
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
