const express = require("express");
const router = express.Router();
const request = require("request");
const config = require("./config/key");
// require("dotenv").config({ path: "../.env" });

const options = {
  method: "GET",
  url: `https://api.odcloud.kr/api/15077586/v1/centers?serviceKey=${config.OPENAPI_KEY}`,
  headers: {},
};

router.get("/", (req, res) => {
  request(options, (error, response, body) => {
    if (error) throw new Error(error);
    res.send(body);
  });
});

module.exports = router;
