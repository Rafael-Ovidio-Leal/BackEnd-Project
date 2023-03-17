const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
const routes = require("./router");
app.use("/api", routes);

//services
const crons = require("./app/services/CronService");
crons();

module.exports = app;