import React from "react";
import styles from "./Err.module.css";

const Err = () => {
  return (
    <div className={styles.err}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="#ff0000"
        width="20"
        height="20"
      >
        <title>error</title>
        <path
          d="M2,16H2A14,14,0,1,0,16,2,14,14,0,0,0,2,16Zm23.15,7.75L8.25,6.85a12,12,0,0,1,16.9,16.9ZM8.24,25.16A12,12,0,0,1,6.84,8.27L23.73,25.16a12,12,0,0,1-15.49,0Z"
          data-name="Icon"
        />
        <rect
          width="32"
          height="32"
          fill="none"
          data-name="&lt;Transparent Rectangle>"
        />
      </svg>{" "}
      죄송합니다. 에러가 발생하였습니다. 나중에 다시 시도하거나 다른 서비스를
      이용해주세요.
    </div>
  );
};

export default Err;
