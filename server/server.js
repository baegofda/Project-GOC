const express = require("express");
const app = express();
const cors = require("cors");
const koreaAllRoute = require("./Router/KoreaAllRoute");
const naverNewsRoute = require("./Router/NaverNewsRoute");
const daumNewsRoute = require("./Router/DaumNewsRoute");
const centerRoute = require("./Router/CenterRoute");
const overseasAllRoute = require("./Router/OverseasAllRoute");

app.use(cors());

app.use("/api", koreaAllRoute);
app.use("/api/center", centerRoute);
app.use("/api/news/naver", naverNewsRoute);
app.use("/api/news/daum", daumNewsRoute);
app.use("/api/all", overseasAllRoute);

const port = 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
