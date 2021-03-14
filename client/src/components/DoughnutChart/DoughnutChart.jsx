import React from "react";
import styles from "./DoughnutChart.module.css";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = ({ data, options }) => {
  return (
    <>
      {data.map((item, index) => (
        <article key={item.key} className={styles.wrap}>
          <h3 className="sr-only">{options[index].title.text}</h3>
          <Doughnut data={item} options={options[index]} />
        </article>
      ))}
    </>
  );
};

export default DoughnutChart;
