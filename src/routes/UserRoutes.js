var express = require("express");
var router = express.Router();

const { userRegister } = require("../controllers/userController");

router.post("/register", userRegister);

module.exports = router;
