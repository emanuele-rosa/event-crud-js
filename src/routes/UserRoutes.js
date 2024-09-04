var express = require("express");
var router = express.Router();

const {
  userRegister,
  updateUser,
} = require("../controllers/userController");

router.post("/register", userRegister);

router.put("/update/", updateUser);

module.exports = router;
