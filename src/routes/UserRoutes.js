var express = require("express");
var router = express.Router();

const { userRegister, updateUser } = require("../controllers/userController");
const { validateToken } = require("../helpers/auth");
const {
  findById,
  compareHashPassword,
  userRequirements,
} = require("../helpers/user");

router.post(
  "/register",
  validateToken,
  compareHashPassword,
  userRequirements,
  userRegister
);

router.put(
  "/update/:id",
  validateToken,
  findById,
  compareHashPassword,
  updateUser
);

module.exports = router;
