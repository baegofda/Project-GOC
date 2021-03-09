const express = require("express");
const app = express();
const cors = require("cors");
const koreaAllRoute = require("./Router/KoreaAllRoute");

app.use(cors());

app.use("/api", koreaAllRoute);

const port = 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
