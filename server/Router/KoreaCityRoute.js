const express = require("express");
const router = express.Router();
const request = require("request");
const converter = require("xml-js");
const config = require("../config/key");
const moment = require("moment");

const today = moment().format("YYYYMMDD");
const week = moment(moment().subtract(2, "day")).format("YYYYMMDD");
const options = {
  method: "GET",
  url: `http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson?serviceKey=${config.OPENAPI_KEY}&pageNo=1&numOfRows=10&startCreateDt=${week}&endCreateDt=${today}`,
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
