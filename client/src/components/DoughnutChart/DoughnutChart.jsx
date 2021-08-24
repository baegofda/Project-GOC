import React from "react";
import styles from "./DoughnutChart.module.css";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = ({ data, options }) => {
  return (
    <>
      {data.map((item) => (
        <article key={item.key} className={styles.wrap}>
          <h3 className="sr-only">{options[item.key].title.text}</h3>
          <Doughnut data={item} options={options[item.key]} />
          <dl className={styles.legends}>
            {item.labels.map((label, idx) => {
              let percent = (
                (item.datasets[0].data[idx] / item.total) *
                100
              ).toFixed(1);
              return (
                <div key={idx} className={styles.legend}>
                  <dt className={styles.label}>
                    <span
                      className={styles.color}
                      style={{
                        background: item.datasets[0].backgroundColor[idx],
                      }}
                    ></span>
                    {label}
                  </dt>
                  <dd className={styles.cnt}>
                    {item.datasets[0].data[idx].toLocaleString()} 명
                    <span className={styles.per}>
                      ({isNaN(percent) ? 0 : percent}%)
                    </span>
                  </dd>
                </div>
              );
            })}
          </dl>
        </article>
      ))}
    </>
  );
};

export default DoughnutChart;
