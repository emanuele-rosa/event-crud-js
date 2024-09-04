var express = require("express");
var router = express.Router();

const {
  userRegister,
  userLogin,
  updateUser,
} = require("../controllers/userController");

router.post("/register", userRegister);

router.post("/login", userLogin);

router.put("/update/:id", updateUser);

module.exports = router;
