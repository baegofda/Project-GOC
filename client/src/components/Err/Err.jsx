import React, { useEffect } from "react";
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
        <p>
          🚫 죄송합니다. 에러가 발생하였습니다. 나중에 다시 시도하시거나 다른
          서비스를 이용해 주세요.
        </p>
      </div>
    </>
  );
};

export default Err;
