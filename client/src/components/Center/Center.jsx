import React, { useEffect, useState } from "react";
import axios from "axios";
import ContentTitle from "../ContentTitle/ContentTitle";
import styles from "./Center.module.css";
import Err from "../Err/Err";
const { kakao } = window;

const Center = () => {
  const [status, setStatus] = useState(true);
  const [title, setTitle] = useState({
    title: "백신 접종센터 정보",
    desc: "국내 백신 접종 센터의 위치를 지도에 표시해 줍니다.",
  });
  const [centers, setCenters] = useState([]);
  // const centerPosi = (item) => {
  //   const container = document.querySelector("#map");
  //   const options = {
  //     //지도를 생성할 때 필요한 기본 옵션
  //     center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
  //     level: 3, //지도의 레벨(확대, 축소 정도)
  //   };
  //   const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

  //   // 지도에 마커와 인포윈도우를 표시하는 함수입니다
  //   const displayMarker = (locPosition, message) => {
  //     // 마커를 생성합니다
  //     const marker = new kakao.maps.Marker({
  //       map: map,
  //       position: locPosition,
  //     });

  //     const iwContent = message; // 인포윈도우에 표시할 내용
  //     const iwRemoveable = true;

  //     // 인포윈도우를 생성합니다
  //     const infowindow = new kakao.maps.InfoWindow({
  //       content: iwContent,
  //       removable: iwRemoveable,
  //     });

  //     // 인포윈도우를 마커위에 표시합니다
  //     infowindow.open(map, marker);

  //     // 지도 중심좌표를 접속위치로 변경합니다
  //     map.setCenter(locPosition);
  //   };

  //   // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
  //   if (navigator.geolocation) {
  //     // GeoLocation을 이용해서 접속 위치를 얻어옵니다
  //     navigator.geolocation.getCurrentPosition(function (position) {
  //       const lat = position.coords.latitude; // 위도
  //       const lon = position.coords.longitude; // 경도

  //       const locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
  //       const message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다

  //       // 마커와 인포윈도우를 표시합니다
  //       displayMarker(locPosition, message);
  //     });
  //   } else {
  //     // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

  //     const locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
  //     const message = "geolocation을 사용할수 없어요..";

  //     displayMarker(locPosition, message);
  //   }
  //   const points = [new kakao.maps.LatLng(33.450701, 126.570667)];
  //   // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
  //   const bounds = new kakao.maps.LatLngBounds();

  //   let marker;
  //   const makeMaker = () => {
  //     for (let i = 0; i < points.length; i++) {
  //       // 배열의 좌표들이 잘 보이게 마커를 지도에 추가합니다
  //       marker = new kakao.maps.Marker({ position: points[i] });
  //       marker.setMap(map);
  //       // LatLngBounds 객체에 좌표를 추가합니다
  //       bounds.extend(points[i]);
  //     }
  //   };
  //   makeMaker();
  //   const setBounds = () => {
  //     // LatLngBounds 객체에 추가된 좌표들을 기준으로 지도의 범위를 재설정합니다
  //     // 이때 지도의 중심좌표와 레벨이 변경될 수 있습니다
  //     map.setBounds(bounds);
  //   };
  // };
  useEffect(() => {
    axios
      .get("/api/center")
      .then((res) => {
        const items = res.data.data;
        setCenters(items);
      })
      .catch((err) => {
        setStatus(false);
        console.log(err);
      });
  }, []);

  return (
    <>
      {status ? (
        <>
          <ContentTitle data={title} />
          <div id="map" className={styles.map}></div>
        </>
      ) : (
        <Err />
      )}
    </>
  );
};

export default Center;
