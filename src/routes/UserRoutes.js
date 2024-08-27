var express = require("express");
var router = express.Router();

const { createLogin } = require("../controllers/userController");

router.post("/login", createLogin);

module.exports = router;
