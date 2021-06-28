import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./OverseasCountryData.module.css";
import ContentTitle from "../../ContentTitle/ContentTitle";
import Err from "../../Err/Err";
import Loading from "../../Loading/Loading";
import DoughnutChart from "../../DoughnutChart/DoughnutChart";
import { titleContents, OverseasCountryOptions } from "../../../const";

const OverseasCountryData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isStatus, setIsStatus] = useState(true);
  const [data, setData] = useState({});
  useEffect(() => {
    const OverseasCountryDataHandler = (items) => {
      const arr = items.reduce((prev, curr) => {
        const country = curr.country;
        const cases = curr.timeline.cases[Object.keys(curr.timeline.cases)];
        const deaths = curr.timeline.deaths[Object.keys(curr.timeline.deaths)];
        const recovered =
          curr.timeline.recovered[Object.keys(curr.timeline.recovered)];
        prev.push({
          country: country || 0,
          cases: cases || 0,
          deaths: deaths || 0,
          recovered: recovered || 0,
        });
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
      const sumFirmeCnt = cases.reduce(
        (prev, curr) => Number(prev) + Number(curr)
      );
      const sumDeathsCnt = deaths.reduce(
        (prev, curr) => Number(prev) + Number(curr)
      );
      const sumClearCnt = recovered.reduce(
        (prev, curr) => Number(prev) + Number(curr)
      );
      setData([
        {
          key: 0,
          total: sumFirmeCnt,
          labels: country,
          datasets: [
            {
              label: country,
              data: cases,
              backgroundColor: [
                "rgba(0,0,128,0.6)",
                "rgba(255,198,0,0.6)",
                "rgba(0,0,255,0.6)",
                "rgba(255,0,0,0.6)",
                "rgba(139,0,255,0.6)",
              ],
              hoverBackgroundColor: [
                "rgba(0,0,128,1)",
                "rgba(255,198,1)",
                "rgba(0,0,255,1)",
                "rgba(255,0,0,1)",
                "rgba(139,0,255,1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        {
          key: 1,
          total: sumClearCnt,
          labels: country,
          datasets: [
            {
              label: country,
              data: recovered,
              backgroundColor: [
                "rgba(0,0,128,0.6)",
                "rgba(255,198,0,0.6)",
                "rgba(0,0,255,0.6)",
                "rgba(255,0,0,0.6)",
                "rgba(139,0,255,0.6)",
              ],
              hoverBackgroundColor: [
                "rgba(0,0,128,1)",
                "rgba(255,198,1)",
                "rgba(0,0,255,1)",
                "rgba(255,0,0,1)",
                "rgba(139,0,255,1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        {
          key: 2,
          total: sumDeathsCnt,
          labels: country,
          datasets: [
            {
              label: country,
              data: deaths,
              backgroundColor: [
                "rgba(0,0,128,0.6)",
                "rgba(255,206,0,0.6)",
                "rgba(0,0,255,0.6)",
                "rgba(255,0,0,0.6)",
                "rgba(139,0,255,0.6)",
              ],
              hoverBackgroundColor: [
                "rgba(0,0,128,1)",
                "rgba(255,206,1)",
                "rgba(0,0,255,1)",
                "rgba(255,0,0,1)",
                "rgba(139,0,255,1)",
              ],
              borderWidth: 1,
            },
          ],
        },
      ]);
    };
    axios
      .get("https://projectgoc.herokuapp.com/api/country")
      .then((res) => {
        const items = res.data;
        OverseasCountryDataHandler(items);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsStatus(false);
        console.log(err);
      });
  }, []);
  return (
    <>
      {isStatus ? (
        <>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <ContentTitle data={titleContents.Overseas.Country} />
              <section className={styles.wrap}>
                <DoughnutChart data={data} options={OverseasCountryOptions} />
              </section>
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
