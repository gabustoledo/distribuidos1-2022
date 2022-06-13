const express = require("express");

const app = express();
require("dotenv").config();
app.set("port", process.env.PORT || 8080);
app.use(express.urlencoded({ extended: false }));

module.exports = app;
