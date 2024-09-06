var express = require("express");
var router = express.Router();

const { userLogin } = require("../controllers/userController");
const { createAdminUser } = require("../controllers/indexController");
const { validateToken } = require("../helpers/auth");

router.post("/", validateToken, createAdminUser);
router.post("/login", userLogin);

module.exports = router;
