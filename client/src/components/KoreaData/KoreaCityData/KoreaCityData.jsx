import React, { useEffect, useState } from "react";
import ContentTitle from "../../ContentTitle/ContentTitle";
import Err from "../../Err/Err";
import Loading from "../../Loading/Loading";
import axios from "axios";
import styles from "./KoreaCityData.module.css";
import DoughnutChart from "../../DoughnutChart/DoughnutChart";
import { titleContents, koreaCityOptions } from "../../../const";

const KoreaCityData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isStatus, setIsStatus] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    const dataHandler = (items) => {
      const arr = items.reduce((prev, curr) => {
        const deathCnt = curr.elements[1].elements[0].text;
        const confirmeCnt = curr.elements[2].elements[0].text;
        const clearCnt = curr.elements[7].elements[0].text;
        const ingCnt = curr.elements[8].elements[0].text;
        const category = curr.elements[3].elements[0].text;
        prev.push({ deathCnt, confirmeCnt, clearCnt, ingCnt, category });
        return prev;
      }, []);

      // 기타 카테고리 배열
      const otherObjs = arr.slice(0, 9).map((item) => {
        return item;
      });
      // 기타 카테고리  확진자
      const confirmeCnt = otherObjs.map((obj) => {
        return obj.confirmeCnt;
      });
      const otherConfirmeCnt = confirmeCnt.reduce(
        (prev, curr) => Number(prev) + Number(curr)
      );
      // 기타 카테고리  치료중
      const ingCnt = otherObjs.map((obj) => {
        return obj.ingCnt;
      });
      const otherIngCnt = ingCnt.reduce(
        (prev, curr) => Number(prev) + Number(curr)
      );
      // 기타 카테고리  완치자
      const clearCnt = otherObjs.map((obj) => {
        return obj.clearCnt;
      });
      const otherClearCnt = clearCnt.reduce(
        (prev, curr) => Number(prev) + Number(curr)
      );
      //기타 카테고리  사망자
      const deathCnt = otherObjs.map((obj) => {
        return obj.deathCnt;
      });
      const otherDeathCnt = deathCnt.reduce(
        (prev, curr) => Number(prev) + Number(curr)
      );

      //주요 데이터 배열
      const mainObjs = arr.slice(9, 18).map((item) => {
        return item;
      });
      //주요 데이터 확진자
      const mainConfirmeCnt = mainObjs.map((obj) => {
        return Number(obj.confirmeCnt);
      });
      //주요 데이터 치료중
      const mainIngCnt = mainObjs.map((obj) => {
        return Number(obj.ingCnt);
      });
      //주요 데이터 완치자
      const mainClearCnt = mainObjs.map((obj) => {
        return Number(obj.clearCnt);
      });
      //주요 데이터 사망자
      const mainDeathCnt = mainObjs.map((obj) => {
        return Number(obj.deathCnt);
      });
      //주요 데이터 카테고리
      const category = mainObjs.map((obj) => {
        return obj.category;
      });
      //통합 데이터
      const totalCategory = [...category, "기타"];
      const totalConfirmeCnt = [...mainConfirmeCnt, otherConfirmeCnt];
      const totalIngCnt = [...mainIngCnt, otherIngCnt];
      const totalClearCnt = [...mainClearCnt, otherClearCnt];
      const totalDeathCnt = [...mainDeathCnt, otherDeathCnt];

      const sumFirmeCnt = totalConfirmeCnt.reduce(
        (prev, curr) => Number(prev) + Number(curr)
      );
      const sumIngCnt = totalIngCnt.reduce(
        (prev, curr) => Number(prev) + Number(curr)
      );
      const sumClearCnt = totalClearCnt.reduce(
        (prev, curr) => Number(prev) + Number(curr)
      );
      const sumDeathCnt = totalDeathCnt.reduce(
        (prev, curr) => Number(prev) + Number(curr)
      );

      setData([
        {
          key: 0,
          total: sumFirmeCnt,
          labels: totalCategory,
          datasets: [
            {
              label: totalCategory,
              data: totalConfirmeCnt,
              backgroundColor: [
                "rgba(255, 255, 0, 0.6)",
                "rgba(255, 153, 0, 0.6)",
                "rgba(153, 204, 0, 0.6)",
                "rgba(153, 153, 0, 0.6)",
                "rgba(51, 102, 0, 0.6)",
                "rgba(255, 102, 0, 0.6)",
                "rgba(153, 255, 0, 0.6)",
                "rgba(153, 51, 0, 0.6)",
                "rgba(255, 0, 0, 0.6)",
                "rgba(158, 158, 158, 0.6)",
              ],
              hoverBackgroundColor: [
                "rgba(255, 255, 0, 1)",
                "rgba(255, 153, 0, 1)",
                "rgba(153, 204, 0, 1)",
                "rgba(153, 153, 0, 1)",
                "rgba(51, 102, 0, 1)",
                "rgba(255, 102, 0, 1)",
                "rgba(153, 255, 0, 1)",
                "rgba(153, 51, 0, 1)",
                "rgba(255, 0, 0, 1)",
                "rgba(158, 158, 158, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        {
          key: 1,
          total: sumIngCnt,
          labels: totalCategory,
          datasets: [
            {
              label: totalCategory,
              data: totalIngCnt,
              backgroundColor: [
                "rgba(255, 255, 0, 0.6)",
                "rgba(255, 153, 0, 0.6)",
                "rgba(153, 204, 0, 0.6)",
                "rgba(153, 153, 0, 0.6)",
                "rgba(51, 102, 0, 0.6)",
                "rgba(255, 102, 0, 0.6)",
                "rgba(153, 255, 0, 0.6)",
                "rgba(153, 51, 0, 0.6)",
                "rgba(255, 0, 0, 0.6)",
                "rgba(158, 158, 158, 0.6)",
              ],
              hoverBackgroundColor: [
                "rgba(255, 255, 0, 1)",
                "rgba(255, 153, 0, 1)",
                "rgba(153, 204, 0, 1)",
                "rgba(153, 153, 0, 1)",
                "rgba(51, 102, 0, 1)",
                "rgba(255, 102, 0, 1)",
                "rgba(153, 255, 0, 1)",
                "rgba(153, 51, 0, 1)",
                "rgba(255, 0, 0, 1)",
                "rgba(158, 158, 158, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },

        {
          key: 2,
          total: sumClearCnt,
          labels: totalCategory,
          datasets: [
            {
              label: totalCategory,
              data: totalClearCnt,
              backgroundColor: [
                "rgba(255, 255, 0, 0.6)",
                "rgba(255, 153, 0, 0.6)",
                "rgba(153, 204, 0, 0.6)",
                "rgba(153, 153, 0, 0.6)",
                "rgba(51, 102, 0, 0.6)",
                "rgba(255, 102, 0, 0.6)",
                "rgba(153, 255, 0, 0.6)",
                "rgba(153, 51, 0, 0.6)",
                "rgba(255, 0, 0, 0.6)",
                "rgba(158, 158, 158, 0.6)",
              ],
              hoverBackgroundColor: [
                "rgba(255, 255, 0, 1)",
                "rgba(255, 153, 0, 1)",
                "rgba(153, 204, 0, 1)",
                "rgba(153, 153, 0, 1)",
                "rgba(51, 102, 0, 1)",
                "rgba(255, 102, 0, 1)",
                "rgba(153, 255, 0, 1)",
                "rgba(153, 51, 0, 1)",
                "rgba(255, 0, 0, 1)",
                "rgba(158, 158, 158, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },

        {
          key: 3,
          total: sumDeathCnt,
          labels: totalCategory,
          datasets: [
            {
              label: totalCategory,
              data: totalDeathCnt,
              backgroundColor: [
                "rgba(255, 255, 0, 0.6)",
                "rgba(255, 153, 0, 0.6)",
                "rgba(153, 204, 0, 0.6)",
                "rgba(153, 153, 0, 0.6)",
                "rgba(51, 102, 0, 0.6)",
                "rgba(255, 102, 0, 0.6)",
                "rgba(153, 255, 0, 0.6)",
                "rgba(153, 51, 0, 0.6)",
                "rgba(255, 0, 0, 0.6)",
                "rgba(158, 158, 158, 0.6)",
              ],
              hoverBackgroundColor: [
                "rgba(255, 255, 0, 1)",
                "rgba(255, 153, 0, 1)",
                "rgba(153, 204, 0, 1)",
                "rgba(153, 153, 0, 1)",
                "rgba(51, 102, 0, 1)",
                "rgba(255, 102, 0, 1)",
                "rgba(153, 255, 0, 1)",
                "rgba(153, 51, 0, 1)",
                "rgba(255, 0, 0, 1)",
                "rgba(158, 158, 158, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
      ]);
    };

    axios
      .get("https://projectgoc.herokuapp.com/api/city")
      .then((res) => {
        const data = res.data.elements[0].elements[1].elements[0].elements;
        const items = data.slice(0, 19);
        dataHandler(items);
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
              <ContentTitle data={titleContents.Korea.City} />
              <section className={styles.wrap}>
                <DoughnutChart data={data} options={koreaCityOptions} />
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

export default KoreaCityData;
