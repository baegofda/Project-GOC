const express = require("express");
const router = express.Router();
const request = require("request");
const converter = require("xml-js");
require("dotenv").config({ path: "../.env" });

// 날짜 구하기 위함
const date = new Date();
const year = date.getFullYear();
const month =
  date.getMonth() + 1 > 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
const day = date.getDate() > 10 ? date.getDate() : "0" + date.getDate();
const today = year + "" + month + "" + day;

// api url
var url =
  "http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson";
var queryParams =
  "?" + encodeURIComponent("ServiceKey") + `=${process.env.OPENAPI_KEY}`;
queryParams +=
  "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /* */
queryParams +=
  "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("10"); /* */
queryParams +=
  "&" +
  encodeURIComponent("startCreateDt") +
  "=" +
  encodeURIComponent(today - 6); /* */
queryParams +=
  "&" +
  encodeURIComponent("endCreateDt") +
  "=" +
  encodeURIComponent(today); /* */

router.get("/", (req, res) => {
  request(
    {
      url: url + queryParams,
      method: "GET",
    },
    (error, response, body) => {
      const xmlToJson = converter.xml2json(body);
      res.send(xmlToJson);
    }
  );
});

module.exports = router;
