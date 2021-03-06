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
          <dl className={styles.legends}>
            {item.labels.map((label, idx) => (
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
                    (
                    {((item.datasets[0].data[idx] / item.total) * 100).toFixed(
                      1
                    )}
                    %)
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </article>
      ))}
    </>
  );
};

export default DoughnutChart;
