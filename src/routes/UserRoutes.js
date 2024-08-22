var express = require("express");
var router = express.Router();

const { login } = require("../controllers/userController");

router.post("/login", login);

module.exports = router;
