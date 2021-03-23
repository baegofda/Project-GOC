import React from "react";
import styles from "./Err.module.css";
import swal from "sweetalert2";

const Err = () => {
  swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Something went wrong!",
  });

  return (
    <>
      <div className={styles.err}>
        <p className={styles.text}>
          🚫 에러가 발생하였습니다. 나중에 다시 시도하시거나 다른 서비스를
          이용해 주세요.
        </p>
        <a
          className={styles.link}
          href="https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=%EC%BD%94%EB%A1%9C%EB%82%98"
          title="코로나 현황 보러가기"
          target="blank"
        >
          코로나 현황 보러가기
        </a>
      </div>
    </>
  );
};

export default Err;
