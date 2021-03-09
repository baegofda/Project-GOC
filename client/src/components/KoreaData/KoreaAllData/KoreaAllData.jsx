import React, { useEffect } from "react";
import axios from "axios";
import styles from "./KoreaAllData.module.css";

const KoreaAllData = () => {
  const callApi = async () => {
    axios.get("/api").then((res) => console.log(res));
  };

  useEffect(() => {
    callApi();
  }, []);

  return <div>test</div>;
};

export default KoreaAllData;
