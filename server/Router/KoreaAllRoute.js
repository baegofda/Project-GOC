const express = require("express");
const router = express.Router();
const request = require("request");
const converter = require("xml-js");

var url =
  "http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson";
var queryParams =
  "?" +
  encodeURIComponent("ServiceKey") +
  `=${process.env.OPENAPI_KEY}`; /* Service Key*/
queryParams +=
  "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /* */
queryParams +=
  "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("10"); /* */
queryParams +=
  "&" +
  encodeURIComponent("startCreateDt") +
  "=" +
  encodeURIComponent("20210308"); /* */
queryParams +=
  "&" +
  encodeURIComponent("endCreateDt") +
  "=" +
  encodeURIComponent("20210308"); /* */

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
