const express = require("express");
const router = express.Router();
const request = require("request");
const converter = require("xml-js");

var url =
  "http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson";
var queryParams =
  "?" +
  encodeURIComponent("ServiceKey") +
  "=gpSyPXPYCk9xr1O7VtI5ttMqiLU9SMZgCvwMQ2%2BgVbxlDXEGxjj%2BjaYPHk3DndqxVEDroD70wv2XItDpRCPF4A%3D%3D"; /* Service Key*/
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
  // res.send({ test: "hihi" });
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
