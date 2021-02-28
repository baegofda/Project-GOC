import React, { useEffect } from "react";
import axios from "axios";
import styles from "./Header.module.css";

const Header = (props) => {
  const callApi = () => {
    axios.get("/api").then((res) => console.log(res.data.test));
  };

  useEffect(() => {
    callApi();
  }, []);

  return <div className={styles.test}>hi</div>;
};

export default Header;
