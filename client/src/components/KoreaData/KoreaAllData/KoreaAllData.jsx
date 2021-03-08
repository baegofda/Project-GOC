import React, { useEffect } from "react";
import axios from "axios";
import styles from "./KoreaAllData.module.css";

const KoreaAllData = () => {
  useEffect(() => {
    axios.get("/").then((res) => console.log(res));
  });

  return <div></div>;
};

export default KoreaAllData;
