const express = require("express");
const router = express.Router();
const request = require("request");
const query = encodeURI("코로나백신");
require("dotenv").config({ path: "../.env" });

const options = {
  method: "GET",
  url: `https://openapi.naver.com/v1/search/news.json?query=${query}&sort=date`,
  headers: {
    "X-Naver-Client-Id": "3UJ_EgTOt276KolXyflE",
    "X-Naver-Client-Secret": "5hm30IFys0",
  },
};

router.get("/", (req, res) => {
  request(options, (error, response, body) => {
    if (error) throw new Error(error);
    console.log(body);
  });
});

module.exports = router;
