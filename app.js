const express = require("express");
const app = express();
const cors = require("cors");
const customer = require("./src/routes/customer");
require("./src/config/db");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/customer", customer);

module.exports = app;