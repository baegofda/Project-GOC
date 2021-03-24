# Project GOC

![랜딩페이지](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbI9QAP%2Fbtq0Q9RoyVJ%2F1fL8gYzpfIianHr8NsPkI0%2Fimg.png)

[프로젝트 구경가기](https://project-goc.netlify.app/)

## **✨ 목표**

<br/>

- API를 활용한 국내외 코로나 통계 자료 제공
  - 국내
    - 국내 종합 현황
    - 시도별 현황
    - 거리두기 정보 (링크)
    - 백신 접종 센터 정보
    - 국내 주요 소식 ('코로나 백신' 네이버 뉴스, 다음 웹문서 결과)
  - 해외
    - 해외 종합현황
    - 주변 국가별 현황
    - 전 세계 대시보드
- 반응형 웹 구축 (Mobile First)

<br/>

## **🧰 사용기술**

<br/>

- HTML, CSS(PostCSS), Reactjs, Nodejs(Expressjs)
- 공공데이터포털 OPEN API (국내 종합현황, 시도별현황, 백신 접종 센터)
- 카카오맵 API (백신 접종 센터 위치제공)
- 네이버 뉴스 API (주요소식 - 네이버 검색결과)
- 다음 검색 API (주요소식 - 다음 검색결과)
- axios, xmltojson
- momentjs(날짜라이브러리), Chartjs , sweetalert2

<br/>

## **📅 소요기간**

<br/>

- 7일

<br/>

## **👀 주요기능 & 코드**

<br/>

```
💡 주요기능

- 국내 코로나 데이터 정보 제공
- 해외 코로나 데이터 정보 제공
- 백신 접종 센터 정보 제공
- '코로나 백신' 검색 결과 제공
- 로딩 스피너 및 에러페이지 구축
```

<br/>

&nbsp;파일 구조는 아래와 같습니다.

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcQCvqN%2Fbtq0Tv7k98Z%2FiIOO3YDQDcoV7y4M9keO20%2Fimg.png"/></p>

<br/>

## **1. 국내 코로나 데이터 정보 제공**

<br/>

### **💻 코드살펴보기 (국내 종합 현황)**

<br/>

> 공공데이터포털 OPEN API를 통하여 국내 종합 현황데이터를 제공하고있습니다.

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbI9QAP%2Fbtq0Q9RoyVJ%2F1fL8gYzpfIianHr8NsPkI0%2Fimg.png"/></p>

<br/>

### 📂 server>Router>KoreaAllRoute.js

---

<br/>

&nbsp;해당 API는 xml데이터 타입을 제공하기에 JSON타입의 데이터를 사용하기 위해 route 파일에서 xmltojson 라이브러리를 사용하여 json데이터로 파싱 후 데이터를 client로 response 해주고있습니다.

<br/>

```js
// 날짜 구하기 위함 (7~8일간의 데이터)
const date = new Date();
const year = date.getFullYear();
const month =
  date.getMonth() + 1 > 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
const day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
const today = year + "" + month + "" + day;

const options = {
  method: "GET",
  url: `http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson?serviceKey=${
    config.OPENAPI_KEY
  }&pageNo=1&numOfRows=10&startCreateDt=${today - 7}&endCreateDt=${today}`,
  headers: {},
};
router.get("/", (req, res) => {
  request(options, (error, response, body) => {
    if (error) throw new Error(error);
    const xmlToJson = converter.xml2json(body);
    res.send(xmlToJson);
  });
});
```

<br/>

### 📂 client>src>components>KoreaData>KoreaAllData>KoreaAllData.jsx

---

<br/>

&nbsp;파싱 데이터를 받은 client에서는 일일 지역발생 및 해외유입과 종합 확진자, 치료중, 완치자, 사망자의 데이터를 가공하여 state에 데이터를 set해주고 있습니다.

<br/>

```js
// 일일 현황 데이터제공을 위한 해당 데이터 가공
const cardsDataHandler = (totalData, yesterDayData) => {
  const totalDefCnt = totalData[2].elements[0].text;
  const totalIngCnt = totalData[8].elements[0].text;
  const totalClearCnt = totalData[7].elements[0].text;
  const totalDeathCnt = totalData[1].elements[0].text;
  const yesterDayDefCnt = yesterDayData[2].elements[0].text;
  const yesterDayIngCnt = yesterDayData[8].elements[0].text;
  const yesterDayClearCnt = yesterDayData[7].elements[0].text;
  const yesterDayDeathCnt = yesterDayData[1].elements[0].text;

  //확진자
  const newDefCnt = totalDefCnt - yesterDayDefCnt;
  //검사진행
  const newIngCnt = totalIngCnt - yesterDayIngCnt;
  //격리해제
  const newClearCnt = totalClearCnt - yesterDayClearCnt;
  //사망자
  const newDeathCnt = totalDeathCnt - yesterDayDeathCnt;

  // 천단위 콤마를 위해 toLocaleString() 사용
  setCardsData([
    {
      id: 0,
      title: "확진자 수",
      count: Number(totalDefCnt).toLocaleString(),
      new: Number(newDefCnt).toLocaleString(),
    },
    {
      id: 1,
      title: "치료 중",
      count: Number(totalIngCnt).toLocaleString(),
      new: Number(newIngCnt).toLocaleString(),
    },
    {
      id: 2,
      title: "완치자 수",
      count: Number(totalClearCnt).toLocaleString(),
      new: Number(newClearCnt).toLocaleString(),
    },
    {
      id: 3,
      title: "사망자 수",
      count: Number(totalDeathCnt).toLocaleString(),
      new: Number(newDeathCnt).toLocaleString(),
    },
  ]);
};

// 차트데이터 제공을 위한 reduce를 이용하여 데이터 가공
const chartDataHandler = (items) => {
  const arr = items.reduce((prev, curr) => {
    const currDate = curr.elements[13].elements[0].text;
    const split = currDate.split(" ").slice(1, 3);
    const month = split[0].split("월").slice(0, 1);
    const day = split[1].split("일").slice(0, 1);
    const date = `${month}.${day}`;
    const confirmed = curr.elements[6].elements[0].text;
    const localData = curr.elements[9].elements[0].text;
    const overFlowData = curr.elements[10].elements[0].text;
    const category = curr.elements[3].elements[0].text;
    prev.push({ confirmed, localData, overFlowData, date, category });
    return prev;
  }, []);

  // 기타 카테고리 확진자 데이터 취합
  const otherObjs = arr.slice(0, 9).map((item) => {
    return item;
  });
  const testConfirmed = otherObjs.map((obj) => {
    return obj.confirmed;
  });
  const otherConfirmed = testConfirmed.reduce(
    (prev, curr) => Number(prev) + Number(curr)
  );

  // 기타 카테고리 이외의 데이터 취합
  const doughnutObjs = arr.slice(9, 18).map((item) => {
    return item;
  });
  const category = doughnutObjs.map((obj) => {
    return obj.category;
  });
  const confirmed = doughnutObjs.map((obj) => {
    return obj.confirmed;
  });

  // 모든 카테고리의 데이터 취합
  const totalCategory = [...category, "기타"];
  const totalConfirmed = [...confirmed, otherConfirmed];
  const total = totalConfirmed.reduce(
    (prev, curr) => Number(prev) + Number(curr)
  );

  //막대 차트 데이터 (합계데이터만 취합)
  const barObjs = arr
    .filter((item) => item.category === "합계")
    .map((item) => {
      return item;
    });
  const reBarObjs = barObjs.reverse();
  const date = reBarObjs.map((obj) => {
    return obj.date;
  });
  const localData = reBarObjs.map((obj) => {
    return Number(obj.localData).toLocaleString();
  });
  const overFlowData = reBarObjs.map((obj) => {
    return Number(obj.overFlowData).toLocaleString();
  });

  setDoughnutData({
    // setDoughnutData
  });
  setBarData({
    // setBarData
  });
};

//7일간의 데이터만 Handler인자값으로 넣어줍니다.
axios
  .get("https://projectgoc.herokuapp.com/api")
  .then((res) => {
    const data = res.data.elements[0].elements[1].elements[0].elements;
    const items = data.slice(0, 133);
    const totalData = items[18].elements;
    const yesterDayData = items[37].elements;
    panelDataHandler(totalData);
    cardsDataHandler(totalData, yesterDayData);
    chartDataHandler(items);
    setIsLoading(false);
  })
  .catch((err) => {
    setStatus(false);
    console.log(err);
  });
```

<br/>

### **💻 코드살펴보기 (시도별 현황)**

<br/>

> 공공데이터포털 OPEN API를 통하여 국내 시도별 현황데이터를 제공하고있습니다.

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdECAxX%2Fbtq0UdS7ErL%2F8Ykd8Y9XDLgVoLV81nMTq1%2Fimg.png"/></p>

<br/>

### 📂 server>Router>KoreaCityRoute.js

---

<br/>

&nbsp;해당 API도 xmltojson 라이브러리를 사용합니다.

<br/>

```js
// 날짜 구하기 위함(당일 기준 2일전 까지의 데이터 로드)
const date = new Date();
const year = date.getFullYear();
const month =
  date.getMonth() + 1 > 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
const day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
const today = year + "" + month + "" + day;

const options = {
  method: "GET",
  url: `http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson?serviceKey=${
    config.OPENAPI_KEY
  }&pageNo=1&numOfRows=10&startCreateDt=${today - 2}&endCreateDt=${today}`,
  headers: {},
};
router.get("/", (req, res) => {
  request(options, (error, response, body) => {
    if (error) throw new Error(error);
    const xmlToJson = converter.xml2json(body);
    res.send(xmlToJson);
  });
});
```

<br/>

### 📂 client>src>components>KoreaData>KoreaCityData>KoreaCityData.jsx

---

<br/>

&nbsp;파싱 데이터를 받은 client에서는 시도별 확진자, 치료중, 완치자, 사망자 데이터를 제공합니다.

<br/>

```js
// 시도별 종합 데이터 가공
const dataHandler = (items) => {
  const arr = items.reduce((prev, curr) => {
    const deathCnt = curr.elements[1].elements[0].text;
    const confirmeCnt = curr.elements[2].elements[0].text;
    const clearCnt = curr.elements[7].elements[0].text;
    const ingCnt = curr.elements[8].elements[0].text;
    const category = curr.elements[3].elements[0].text;
    prev.push({ deathCnt, confirmeCnt, clearCnt, ingCnt, category });
    return prev;
  }, []);

  // 기타 카테고리 배열
  const otherObjs = arr.slice(0, 9).map((item) => {
    return item;
  });
  // 기타 카테고리  확진자
  const confirmeCnt = otherObjs.map((obj) => {
    return obj.confirmeCnt;
  });
  const otherConfirmeCnt = confirmeCnt.reduce(
    (prev, curr) => Number(prev) + Number(curr)
  );
  // 기타 카테고리  치료중
  const ingCnt = otherObjs.map((obj) => {
    return obj.ingCnt;
  });
  const otherIngCnt = ingCnt.reduce(
    (prev, curr) => Number(prev) + Number(curr)
  );
  // 기타 카테고리  완치자
  const clearCnt = otherObjs.map((obj) => {
    return obj.clearCnt;
  });
  const otherClearCnt = clearCnt.reduce(
    (prev, curr) => Number(prev) + Number(curr)
  );
  //기타 카테고리  사망자
  const deathCnt = otherObjs.map((obj) => {
    return obj.deathCnt;
  });
  const otherDeathCnt = deathCnt.reduce(
    (prev, curr) => Number(prev) + Number(curr)
  );

  //주요 데이터 배열
  const mainObjs = arr.slice(9, 18).map((item) => {
    return item;
  });
  //주요 데이터 확진자
  const mainConfirmeCnt = mainObjs.map((obj) => {
    return Number(obj.confirmeCnt);
  });
  //주요 데이터 치료중
  const mainIngCnt = mainObjs.map((obj) => {
    return Number(obj.ingCnt);
  });
  //주요 데이터 완치자
  const mainClearCnt = mainObjs.map((obj) => {
    return Number(obj.clearCnt);
  });
  //주요 데이터 사망자
  const mainDeathCnt = mainObjs.map((obj) => {
    return Number(obj.deathCnt);
  });
  //주요 데이터 카테고리
  const category = mainObjs.map((obj) => {
    return obj.category;
  });

  //통합 데이터
  const totalCategory = [...category, "기타"];
  const totalConfirmeCnt = [...mainConfirmeCnt, otherConfirmeCnt];
  const totalIngCnt = [...mainIngCnt, otherIngCnt];
  const totalClearCnt = [...mainClearCnt, otherClearCnt];
  const totalDeathCnt = [...mainDeathCnt, otherDeathCnt];

  const sumFirmeCnt = totalConfirmeCnt.reduce(
    (prev, curr) => Number(prev) + Number(curr)
  );
  const sumIngCnt = totalIngCnt.reduce(
    (prev, curr) => Number(prev) + Number(curr)
  );
  const sumClearCnt = totalClearCnt.reduce(
    (prev, curr) => Number(prev) + Number(curr)
  );
  const sumDeathCnt = totalDeathCnt.reduce(
    (prev, curr) => Number(prev) + Number(curr)
  );

  setData([
    // setData
  ]);
};

//가장 최근의 데이터만 Handler인자값으로 넣어줍니다.
axios
  .get("https://projectgoc.herokuapp.com/api/city")
  .then((res) => {
    const data = res.data.elements[0].elements[1].elements[0].elements;
    const items = data.slice(0, 19);
    dataHandler(items);
    setIsLoading(false);
  })
  .catch((err) => {
    setStatus(false);
    console.log(err);
  });
```

<br/>

## **2. 해외 코로나 데이터 정보 제공**

<br/>

### **💻 코드살펴보기 (주변 국가별 현황)**

<br/>

> NovelCOVID API를 통하여 주변 국가별 현황 데이터를 제공하고있습니다.

<br/>

### 📂 client>src>components>OverseasData>OverseasCountryData>OverseasCountryData.jsx

---

<br/>

&nbsp;받은 데이터를 client에서는 주변 국가별 데이터를 제공합니다.

<br/>

```js
// 주변 국가별 데이터 가공
const dataHandler = (items) => {
  const arr = items.reduce((prev, curr) => {
    const country = curr.country;
    const cases = curr.timeline.cases[Object.keys(curr.timeline.cases)];
    const deaths = curr.timeline.deaths[Object.keys(curr.timeline.deaths)];
    const recovered =
      curr.timeline.recovered[Object.keys(curr.timeline.recovered)];
    prev.push({
      country: country || 0,
      cases: cases || 0,
      deaths: deaths || 0,
      recovered: recovered || 0,
    });
    return prev;
  }, []);
  const reArr = arr.reverse();
  const country = reArr.map((item) => {
    return item.country;
  });
  const cases = reArr.map((item) => {
    return item.cases;
  });
  const deaths = reArr.map((item) => {
    return item.deaths;
  });
  const recovered = reArr.map((item) => {
    return item.recovered;
  });
  const sumFirmeCnt = cases.reduce((prev, curr) => Number(prev) + Number(curr));
  const sumDeathsCnt = deaths.reduce(
    (prev, curr) => Number(prev) + Number(curr)
  );
  const sumClearCnt = recovered.reduce(
    (prev, curr) => Number(prev) + Number(curr)
  );
  setData([
    // setData
  ]);
};
axios
  .get("https://projectgoc.herokuapp.com/api/country")
  .then((res) => {
    const items = res.data;
    dataHandler(items);
    setIsLoading(false);
  })
  .catch((err) => {
    setStatus(false);
    console.log(err);
  });
```

<br/>

## **3. 국내 코로나 관련 정보제공**

<br/>

### **💻 코드살펴보기 (백신 접종 센터 정보)**

<br/>

> 카카오맵 API와 공공데이터포털을 통하여 백신 접종 센터 정보를 제공하고있습니다.

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcAJAsf%2Fbtq0XoNpRQR%2FK3tpSxKfBJ30SOnTsKlPnK%2Fimg.png"/></p>

<br/>

### 📂 client>src>components>Center>Center.jsx

---

<br/>

&nbsp;받은 데이터를 기반으로 센터의 위치를 카카오map으로 전달하여 보여줍니다.

<br/>

```js
// 카카오맵 API 호출
const kakaoMaps = (centers) => {
  const mapContainer = document.getElementById("map"); // 지도를 표시할 div
  const mapOption = {
    center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
    level: 10, // 지도의 확대 레벨
  };
  const map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

  // set된 센터 데이터를 기반으로 map으로 전달
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

// 받은 데이터 가공 밑 state set
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

//API에서 받은 데이터 Handler에 인자값으로
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
```

<br/>

### **💻 코드살펴보기 (주요 소식)**

<br/>

> 네이버 뉴스 API와 다음 검색 API를 활용하여 '코로나 백신'관련 문서를 보여줍니다.

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fb6Hlpe%2Fbtq0Xpr2io1%2FqhGuNxMyw8fDqdDp1LHYrK%2Fimg.png"/></p>

<br/>

### 📂 client>src>components>News>News.jsx

---

<br/>

&nbsp;두개의 Router에서 데이터를 받아오기 때문에 Axios의 Multiple Request기능을 사용하였습니다.

<br/>

```js
// 받아온 문서데이터 가공
const dataHandler = (items) => {
  const arr = items.reduce((prev, curr) => {
    // 문서들의 title과 desc의 불필요한 특수문자를 제거하기위한 정규식
    const reg = /[<b>|</b>|&qout|amp|lt|gt;]/g;
    const regTitle = curr.title
      .replace(reg, "")
      .replace(/#39/g, "'")
      .replace(/#34/g, '"');
    const itemDesc = curr.desc;
    // 문서 날짜의 데이터 포맷 변경을 위한 momentjs라이브러리
    const articleDate = moment(curr.date).format("YYYY.MM.DD");
    const articleDesc = itemDesc
      .replace(reg, "")
      .replace(/#39/g, "'")
      .replace(/#34/g, '"');
    const articleUrl = curr.url;
    const articleSite = curr.site;
    prev.push({
      id: i++,
      title: regTitle,
      desc: articleDesc,
      url: articleUrl,
      date: articleDate,
      site: articleSite,
    });

    return prev;
  }, []);

  setNews({
    // setNews
  });
};

// 두개의 request를 위한 Axios Multiple Request기능 사용
axios
  .all([
    axios.get("https://projectgoc.herokuapp.com/api/news/naver"),
    axios.get("https://projectgoc.herokuapp.com/api/news/daum"),
  ])
  .then(
    axios.spread((res1, res2) => {
      const naverArr = res1.data.items.reduce((prev, curr) => {
        prev.push({
          title: curr.title,
          desc: curr.description,
          url: curr.link,
          date: curr.pubDate,
          site: "naver",
        });
        return prev;
      }, []);

      const daumArr = res2.data.documents.reduce((prev, curr) => {
        prev.push({
          title: curr.title,
          desc: curr.contents,
          url: curr.url,
          date: curr.datetime,
          site: "daum",
        });
        return prev;
      }, []);
      const arr = [...naverArr, ...daumArr];
      dataHandler(arr);
      setIsLoading(false);
    })
  )
  .catch((err) => {
    setStatus(false);
    console.log(err);
  });
```

<br/>

## **4. 로딩 스피너 및 에러페이지 구축**

<br/>

### **💻 코드살펴보기 (로딩스피너)**

<br/>

> state 관리를 통하여 데이터 로드전 로딩 스피너를 보여줍니다.

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcAJAsf%2Fbtq0XoNpRQR%2FK3tpSxKfBJ30SOnTsKlPnK%2Fimg.png"/></p>

<br/>

### 📂 client>src>components>Center>Center.jsx

---

<br/>

&nbsp;받은 데이터를 기반으로 센터의 위치를 카카오map으로 전달하여 보여줍니다.

<br/>

```js
// 카카오맵 API 호출
const kakaoMaps = (centers) => {
  const mapContainer = document.getElementById("map"); // 지도를 표시할 div
  const mapOption = {
    center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
    level: 10, // 지도의 확대 레벨
  };
  const map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

  // set된 센터 데이터를 기반으로 map으로 전달
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

// 받은 데이터 가공 밑 state set
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

//API에서 받은 데이터 Handler에 인자값으로
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
```
