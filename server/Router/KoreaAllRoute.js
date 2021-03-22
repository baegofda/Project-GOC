const express = require("express");
const router = express.Router();
const request = require("request");
const converter = require("xml-js");
const config = require("../config/key");

// 날짜 구하기 위함
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

module.exports = router;
