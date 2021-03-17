const express = require("express");
const router = express.Router();
const request = require("request");

const options = {
  method: "GET",
  url:
    "https://corona.lmao.ninja/v2/historical/Japan,China,USA,Russia,kr?lastdays=1",
  headers: {
    Cookie: "__cfduid=d58c27a867343ef9ed1741405f09c6e8e1614119574",
  },
};

router.get("/", (req, res) => {
  request(options, (error, response, body) => {
    if (error) throw new Error(error);
    res.send(body);
  });
});

module.exports = router;
