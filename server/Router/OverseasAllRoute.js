const express = require("express");
const router = express.Router();
const request = require("request");

const options = {
  method: "GET",
  url: "https://corona.lmao.ninja/v2/all?yesterday=",
  headers: {},
};
router.get("/", (req, res) => {
  request(options, (error, response, body) => {
    if (error) throw new Error(error);
    res.send(body);
  });
});

module.exports = router;
