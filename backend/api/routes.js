const express = require("express");
const app = express();
const routes = require("../routes/routes");
app.use("/api/", routes);
module.exports = app;