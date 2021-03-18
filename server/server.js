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

app.use("/", koreaAllRoute);
app.use("/city", koreaCityRoute);
app.use("/center", centerRoute);
app.use("/news/naver", naverNewsRoute);
app.use("/news/daum", daumNewsRoute);
app.use("/all", overseasAllRoute);
app.use("/country", overseasCountryRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
