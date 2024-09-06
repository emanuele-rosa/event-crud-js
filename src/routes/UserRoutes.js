var express = require("express");
var router = express.Router();

const { userRegister, updateUser } = require("../controllers/userController");
const { validateToken } = require("../helpers/auth");
const { findById } = require("../helpers/user");

router.post("/register", validateToken, userRegister);

router.put("/update/:id", findById, validateToken, updateUser);

module.exports = router;
