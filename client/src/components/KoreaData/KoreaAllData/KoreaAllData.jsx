import React, { useEffect, useState } from "react";
import { Bar } from "@reactchartjs/react-chart.js";
import debounce from "lodash.debounce";
import axios from "axios";
import styles from "./KoreaAllData.module.css";
import ContentTitle from "../../ContentTitle/ContentTitle";
import ContentPanel from "./ContentPanel/ContentPanel";
import Err from "../../Err/Err";
import Loading from "../../Loading/Loading";

const KoreaAllData = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [display, setDisplay] = useState();
  const [status, setStatus] = useState(true);
  const [title, setTitle] = useState({
    title: "국내 종합 현황",
    desc: "국내 코로나 종합 현황판과 일별 현황 차트를 제공합니다. (단위: 명)",
  });
  const chartDate = [];
  const chartLocal = [];
  const chartOverFlow = [];
  const [panelData, setPanelData] = useState([]);
  const [cardsData, setCardsData] = useState([]);
  const [chartData, setChartData] = useState({
    categories: chartDate,
    series: [
      {
        name: "지역 발생",
        data: chartLocal,
      },
      {
        name: "해외 유입",
        data: chartOverFlow,
      },
    ],
  });
  const [columnOptions, setColumnOptions] = useState({
    chart: {
      animation: { duration: 600 },
      height: 600,
      title: {
        text: "일별 현황",
        align: "center",
      },
    },
    lang: {
      noData: "😭No Data!!😭",
    },
    legend: {
      align: "bottom",
    },
    series: {
      dataLabels: {
        visible: true,
      },
      eventDetectType: "grouped",
    },
    xAxis: {
      title: "날짜",
      height: 20,
    },
    yAxis: {
      title: "0 명",
      width: 40,
    },
    tooltip: {
      template: (model, defaultTooltipTemplate, theme) => {
        const local = Number(model.data[0].value);
        const over = Number(model.data[1].value);
        const dayCnt = local + over;
        const { background } = theme;
        return `
       <div style="
       background: ${background};
       width: 120px;
       padding: 10px;
       font-size : 14px;
       text-align: center;
       color: #fff;
       ">
         <p style="margin-bottom:10px;">📅 ${model.category} </p>
         <p style="margin-bottom:5px;">일일 현황
          <span style="color: #ff4949;">
           ${dayCnt}
          </span>
         </p>
         <p style="margin-bottom:5px;">${model.data[0].label} <span style="color: ${model.data[0].color};"> ${model.data[0].value}</span></p>
         <p>${model.data[1].label} <span style="color: ${model.data[1].color};"> ${model.data[1].value}</span></p>
       </div>`;
      },
      offsetX: 30,
      offsetY: -60,
    },
    theme: {
      chart: {
        fontFamily: "Spoqa Han Sans Neo",
        color: "#333",
      },
      series: {
        colors: ["#118eff", "#bc31e0"],
      },
      legend: {
        label: {
          fontSize: 15,
        },
      },
      noData: {
        fontSize: 30,
      },
    },
  });
  const [barOptions, setBarOptions] = useState({
    chart: {
      animation: { duration: 500 },
      width: "100%",
      height: 400,
      title: {
        text: "일별 현황",
        offsetX: 0,
        offsetY: 0,
        align: "center",
      },
    },
    legend: {
      align: "bottom",
    },
    series: {
      dataLabels: {
        visible: true,
      },
      eventDetectType: "grouped",
    },
    xAxis: {
      title: "날짜",
      height: 30,
    },
    yAxis: {
      title: "0 명",
    },
    tooltip: {
      template: (model, defaultTooltipTemplate, theme) => {
        const local = Number(model.data[0].value);
        const over = Number(model.data[1].value);
        const dayCnt = local + over;
        const { background } = theme;
        return `
       <div style="
       background: ${background};
       width: 120px;
       padding: 10px;
       font-size : 14px;
       text-align: center;
       color: #fff;
       ">
         <p style="margin-bottom:10px;">📅 ${model.category} </p>
         <p style="margin-bottom:5px;">일일 현황
          <span style="color: #ff4949;">
           ${dayCnt}
          </span>
         </p>
         <p style="margin-bottom:5px;">${model.data[0].label} <span style="color: ${model.data[0].color};"> ${model.data[0].value}</span></p>
         <p>${model.data[1].label} <span style="color: ${model.data[1].color};"> ${model.data[1].value}</span></p>
       </div>`;
      },
      offsetX: 30,
      offsetY: -60,
    },
    theme: {
      chart: {
        fontFamily: "Spoqa Han Sans Neo",
        color: "#333",
      },
      series: {
        colors: ["#118eff", "#bc31e0"],
      },
      legend: {
        label: {
          fontSize: 15,
        },
      },
      noData: {
        fontSize: 30,
      },
    },
  });

  const panelDataHandler = (data) => {
    // 전일대비증감
    const totalIncCnt = data[6].elements[0].text;
    // 지역발생
    const totalLocalCnt = data[9].elements[0].text;
    // 해외유입
    const totalOverflowCnt = data[10].elements[0].text;

    setPanelData([
      {
        id: "1",
        category: "일일 현황",
        cnt: totalIncCnt,
      },
      { id: "2", category: "지역 발생", cnt: totalLocalCnt },
      {
        id: "3",
        category: "해외 유입",
        cnt: totalOverflowCnt,
      },
    ]);
  };

  const cardsDataHandler = (totalData, yesterDayData) => {
    const totalDefCnt = totalData[2].elements[0].text;
    const totalIngCnt = totalData[8].elements[0].text;
    const totalClearCnt = totalData[7].elements[0].text;
    const totalDeathCnt = totalData[1].elements[0].text;

    const yesterDayDefCnt = yesterDayData[2].elements[0].text;
    const yesterDayIngCnt = yesterDayData[8].elements[0].text;
    const yesterDayClearCnt = yesterDayData[7].elements[0].text;
    const yesterDayDeathCnt = yesterDayData[1].elements[0].text;

    //확진자
    const newDefCnt = totalDefCnt - yesterDayDefCnt;
    //검사진행
    const newIngCnt = totalIngCnt - yesterDayIngCnt;
    //격리해제
    const newClearCnt = totalClearCnt - yesterDayClearCnt;
    //사망자
    const newDeathCnt = totalDeathCnt - yesterDayDeathCnt;

    setCardsData([
      {
        id: "1",
        title: "확진자 수",
        count: totalDefCnt,
        new: newDefCnt,
      },
      { id: "2", title: "치료 중", count: totalIngCnt, new: newIngCnt },
      {
        id: "3",
        title: "완치자 수",
        count: totalClearCnt,
        new: newClearCnt,
      },
      {
        id: "4",
        title: "사망자 수",
        count: totalDeathCnt,
        new: newDeathCnt,
      },
    ]);
  };

  const resChartData = (item) => {
    //지역 발생
    const localData = item.elements[9].elements[0].text;
    // 해외유입
    const overFlowData = item.elements[10].elements[0].text;
    // 날짜
    const date = item.elements[13].elements[0].text;
    const split = date.split(" ").slice(1, 3);
    const month = split[0].split("월").slice(0, 1);
    const day = split[1].split("일").slice(0, 1);
    const newDate = `${month}.${day}`;

    chartOverFlow.unshift(overFlowData);
    chartDate.unshift(newDate);
    chartLocal.unshift(localData);

    setChartData((chartData) => {
      const updated = { ...chartData };
      return updated;
    });
  };

  const chartDataHandler = (datas) => {
    // data
    //   .filter((item) => item.elements[3].elements[0].text === "합계")
    //   .map((item) => resChartData(item));
    console.log(datas);
    // const arr = datas
  };

  useEffect(() => {
    setDisplay(window.innerWidth);

    const handleResize = debounce(() => {
      const resizeWidth = window.innerWidth;
      setDisplay(resizeWidth);
    }, 300);

    window.addEventListener("resize", () => {
      handleResize();
    });
    return () => {
      window.addEventListener("resize", () => {
        handleResize();
      });
    };
  }, []);

  useEffect(() => {
    axios
      .get("/api")
      .then((res) => {
        const totalData =
          res.data.elements[0].elements[1].elements[0].elements[18].elements;
        const yesterDayData =
          res.data.elements[0].elements[1].elements[0].elements[37].elements;
        const resData = res.data.elements[0].elements[1].elements[0].elements;
        panelDataHandler(totalData);
        cardsDataHandler(totalData, yesterDayData);
        chartDataHandler(resData);
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
              <ContentPanel panelData={panelData} cardsData={cardsData} />
              <article className={styles.wrap}>
                <h3 className="sr-only">국내 종합 현황</h3>
                {display >= 768 ? (
                  // <ColumnChart data={chartData} options={columnOptions} />
                  <div></div>
                ) : (
                  // <BarChart data={chartData} options={barOptions} />
                  <div></div>
                )}
              </article>
            </>
          )}
        </>
      ) : (
        <Err />
      )}
    </>
  );
};

export default KoreaAllData;
