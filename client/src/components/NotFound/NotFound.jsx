import React, { useEffect } from "react";
import Swal from "sweetalert2";

const NotFound = (props) => {
  useEffect(() => {
    let timerInterval;
    Swal.fire({
      title: "잘못된 접근입니다 !",
      html: "<b></b>초 후에 자동으로 닫힙니다.",
      timer: 5000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        timerInterval = setInterval(() => {
          const content = Swal.getContent();
          if (content) {
            const b = content.querySelector("b");
            if (b) {
              b.textContent = (Swal.getTimerLeft() / 1000).toFixed(0);
            }
          }
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      props.history.push("/");
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
  });

  return <></>;
};

export default NotFound;
