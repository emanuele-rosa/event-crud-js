var express = require("express");
var swaggerUi = require("swagger-ui-express");
var swaggerFile = require("../swagger_output.json");

var indexRouter = require("./routes/index");
var eventRouter = require("./routes/EventRoutes");
var userRoutes = require("./routes/UserRoutes");

var app = express();

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/event", eventRouter);
app.use("/user", userRoutes)

module.exports = app;
