const express = require("express");
const app = express();
const cors = require("cors");
const koreaAllRoute = require("./Router/KoreaAllRoute");
const naverNewsRoute = require("./Router/NaverNewsRoute");
const centerRoute = require("./Router/CenterRoute");

app.use(cors());

app.use("/api", koreaAllRoute);
app.use("/api/center", centerRoute);
app.use("/api/news", naverNewsRoute);

const port = 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
