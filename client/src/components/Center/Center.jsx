import React, { useEffect, useState } from "react";
import ContentTitle from "../ContentTitle/ContentTitle";
import styles from "./Center.module.css";
const { kakao } = window;

const Center = () => {
  const [title, setTitle] = useState({
    title: "백신 접종센터 정보",
    desc: "국내 백신 접종 센터의 위치를 지도에 표시해 줍니다.",
  });

  useEffect(() => {
    const container = document.querySelector("#map");
    var options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };
    var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
  }, []);

  return (
    <>
      <ContentTitle data={title} />
      <div id="map" className={styles.map}></div>
    </>
  );
};

export default Center;
