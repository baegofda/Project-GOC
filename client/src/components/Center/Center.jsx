import React, { useEffect, useState } from "react";
import axios from "axios";
import ContentTitle from "../ContentTitle/ContentTitle";
import styles from "./Center.module.css";
import Err from "../Err/Err";
import Loading from "../Loading/Loading";
const { kakao } = window;

const Center = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState(true);
  const [title, setTitle] = useState({
    title: "백신 접종센터 정보",
    desc: "국내 백신 접종 센터의 위치를 지도에 표시해 줍니다.",
  });
  const [centers, setCenters] = useState([]);
  useEffect(() => {
    const kakaoMaps = (centers) => {
      const mapContainer = document.getElementById("map"); // 지도를 표시할 div
      const mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 10, // 지도의 확대 레벨
      };
      const map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
      // ------------------- 다중마커 생성
      centers.forEach((center) => {
        //마커 이미지 url
        const imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

        // 마커 이미지의 이미지 크기 입니다
        const imageSize = new kakao.maps.Size(24, 35);

        // 마커 이미지를 생성합니다
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        // 마커를 생성합니다
        const marker = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: center.latlng, // 마커를 표시할 위치
          clickable: true,
          image: markerImage, // 마커 이미지
        });

        // 마커를 지도에 표시합니다.
        marker.setMap(map);

        const iwRemoveable = true;

        // 인포윈도우를 생성합니다
        const infowindow = new kakao.maps.InfoWindow({
          content: center.info,
          removable: iwRemoveable,
        });

        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, "click", () => {
          // 마커 위에 인포윈도우를 표시합니다
          infowindow.open(map, marker);
        });
      });

      // --------------------------- 사용자 위치 인식
      // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
      if (navigator.geolocation) {
        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition((position) => {
          let lat = position.coords.latitude; // 위도
          let lon = position.coords.longitude; // 경도

          let locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
          const message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다

          // 마커와 인포윈도우를 표시합니다
          displayMarker(locPosition, message);
        });
      } else {
        // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

        const locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
        const message = "geolocation을 사용할수 없어요..";

        displayMarker(locPosition, message);
      }

      // 지도에 마커와 인포윈도우를 표시하는 함수입니다
      function displayMarker(locPosition, message) {
        // 마커를 생성합니다
        const marker = new kakao.maps.Marker({
          map: map,
          position: locPosition,
        });

        const iwContent = message; // 인포윈도우에 표시할 내용
        const iwRemoveable = true;

        // 인포윈도우를 생성합니다
        const infowindow = new kakao.maps.InfoWindow({
          content: iwContent,
          removable: iwRemoveable,
        });

        // 인포윈도우를 마커위에 표시합니다
        infowindow.open(map, marker);

        // 지도 중심좌표를 접속위치로 변경합니다
        map.setCenter(locPosition);
      }
    };
    const dataHandler = (items) => {
      const arr = items.map((item) => {
        const name = item.centerName;
        const sp = name.split("코로나19")[1];
        const center = {
          id: item.id,
          centerName: sp,
          orgName: item.org,
          centerType: item.centerType,
          facilityName: item.facilityName,
          address: item.address,
          sido: item.sido,
          sigungu: item.sigungu,
          zipCode: item.zipCode,
          url: `https://map.kakao.com/link/map/${item.org || sp},${item.lng},${
            item.lat
          }`,
          latlng: new kakao.maps.LatLng(item.lng, item.lat),
          info: `<div style="width:200px; padding:5px; font-size:12px;">${
            item.org || sp
          } <br><a href="https://map.kakao.com/link/map/${item.org || sp},${
            item.lng
          },${
            item.lat
          }" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/${
            item.org || sp
          },${item.lng},${
            item.lat
          }" style="color:blue" target="_blank">길찾기</a></div>`,
        };
        return center;
      });
      setCenters(arr);
      kakaoMaps(arr);
    };
    axios
      .get("https://projectgoc.herokuapp.com/api/center")
      .then((res) => {
        const items = res.data.data;
        setIsLoading(false);
        dataHandler(items);
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
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <ContentTitle data={title} />
              <section className={styles.container}>
                <h3 className="sr-only">백신 접종센터 정보</h3>
                <div className={styles.wrap}>
                  <div id="map" className={styles.map}></div>
                </div>
                <ul className={styles.items}>
                  {centers.map((center) => (
                    <li key={center.id} className={styles.item}>
                      <dl className={styles.contents}>
                        <div className={styles.content}>
                          <dt className={styles.title}>센터 이름</dt>
                          <dd className={styles.desc}>
                            {center.orgName || center.centerName}
                          </dd>
                        </div>
                        <div className={styles.content}>
                          <dt className={styles.title}>센터종류</dt>
                          <dd className={styles.desc}>{center.centerType}</dd>
                        </div>
                        <div className={styles.content}>
                          <dt className={styles.title}>센터 주소</dt>
                          <dd className={styles.desc}>{center.address}</dd>
                        </div>
                        <div className={styles.content}>
                          <dt className={styles.title}>시설 위치</dt>
                          <dd className={styles.desc}>{center.facilityName}</dd>
                        </div>
                      </dl>
                      <a
                        className={styles.link}
                        href={center.url}
                        target="blank"
                      >
                        <span className={styles.text}>지도로 확인하기</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            </>
          )}
        </>
      ) : (
        <Err />
      )}
    </>
  );
};

export default Center;
