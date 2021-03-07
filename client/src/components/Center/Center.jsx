/*global daum*/
import React, { useEffect } from "react";
import styles from "./Center.module.css";
const { kakao } = window;

const Center = () => {
  useEffect(() => {
    let el = document.getElementById("map");
    var options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };
    var map = new kakao.maps.Map(el, options); //지도 생성 및 객체 리턴
  }, []);

  return <div id="map" className={styles.map}></div>;
};

export default Center;
