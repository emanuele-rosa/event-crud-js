var express = require("express");
var router = express.Router();

const { userRegister, deleteUser } = require("../controllers/userController");
const { userIsAdmin } = require("../helpers/user");

router.post("/register", userIsAdmin, userRegister);

router.delete("/delete/:id", userIsAdmin, deleteUser);

module.exports = router;
