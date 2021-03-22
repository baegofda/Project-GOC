const express = require("express");
const router = express.Router();
const request = require("request");
const query = encodeURI("코로나백신");
const config = require("../config/key");

const options = {
  method: "GET",
  url: `https://dapi.kakao.com/v2/search/web?sort=accuracy&page=1&size=10&query=${query}`,
  headers: {
    Authorization: `KakaoAK ${config.KAKAOAPI_AK}`,
  },
};

router.get("/", (req, res) => {
  request(options, (error, response, body) => {
    if (error) throw new Error(error);
    res.send(body);
  });
});

module.exports = router;
