var express = require("express");
var router = express.Router();

const { userRegister, updateUser } = require("../controllers/userController");
const { validateToken } = require("../helpers/auth");
const { findById, compareHashPassword } = require("../helpers/user");

router.post("/register", compareHashPassword, validateToken, userRegister);

router.put(
  "/update/:id",
  findById,
  validateToken,
  compareHashPassword,
  updateUser
);

module.exports = router;
