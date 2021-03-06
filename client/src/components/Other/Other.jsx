import React, { useState } from "react";
import ContentTitle from "../ContentTitle/ContentTitle";
import styles from "./Other.module.css";

const Other = () => {
  const [title, setTitle] = useState({
    title: "데이터 출처",
    desc: "사이트에 사용된 자료 & 데이터들의 출처를 나타냅니다.",
  });

  return <ContentTitle data={title} />;
};

export default Other;
