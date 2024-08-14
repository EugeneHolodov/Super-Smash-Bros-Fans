const express = require("express");
const bodyParser = require("body-parser");

const fs = require("fs");
const path = require("path");
require("dotenv").config();
const fightersRoutes = require("./routes/fighters");
const teamsRoutes = require("./routes/teams");

const app = express();
const apiRoutes = require("./routes/apiRoutes");

// Создание папки для загрузок, если её нет
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Использование маршрутов

app.use("/api", fightersRoutes);
app.use("/api", teamsRoutes);

app.listen(8081, () =>
  console.log("API Server listening on port 8081! in server.js")
);
