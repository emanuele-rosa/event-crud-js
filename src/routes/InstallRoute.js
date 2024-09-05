const express = require("express");
var router = express.Router();

const { install } = require("../controllers/installController");

router.get("/", install);

module.exports = router;
