const express = require("express");
const app = express();
const cors = require("cors");
const koreaAllRoute = require("./Router/KoreaAllRoute");
const koreaCityRoute = require("./Router/KoreaCityRoute");
const naverNewsRoute = require("./Router/NaverNewsRoute");
const daumNewsRoute = require("./Router/DaumNewsRoute");
const centerRoute = require("./Router/CenterRoute");
const overseasAllRoute = require("./Router/OverseasAllRoute");
const overseasCountryRoute = require("./Router/OverseasCountryRoute");
app.use(cors());

app.get("/", (req, res) => {
  res.send("server testing ok");
});

app.use("/api", koreaAllRoute);
app.use("/api/city", koreaCityRoute);
app.use("/api/center", centerRoute);
app.use("/api/news/naver", naverNewsRoute);
app.use("/api/news/daum", daumNewsRoute);
app.use("/api/all", overseasAllRoute);
app.use("/api/country", overseasCountryRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
