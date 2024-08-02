var express = require("express");
var path = require("path");

var indexRouter = require("./routes/index");
var eventRouter = require("./routes/event");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/event", eventRouter);

module.exports = app;
