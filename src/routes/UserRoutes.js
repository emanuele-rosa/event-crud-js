var express = require("express");
var router = express.Router();

const { userLogin, updateUser } = require("../controllers/userController");

router.post("/login", userLogin);

router.put("/update/:id", updateUser);

module.exports = router;
