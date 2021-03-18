const express = require("express");
const router = express.Router();
const request = require("request");
const query = encodeURI("코로나백신");
const config = require("../config/key");
// require("dotenv").config({ path: "../.env" });

const options = {
  method: "GET",
  url: `https://openapi.naver.com/v1/search/news.json?query=${query}&sort=date`,
  headers: {
    "X-Naver-Client-Id": `${config.NAVERAPI_ID}`,
    "X-Naver-Client-Secret": `${config.NAVERAPI_SECRET}`,
  },
};

router.get("/", (req, res) => {
  request(options, (error, response, body) => {
    if (error) throw new Error(error);
    res.send(body);
  });
});

module.exports = router;
