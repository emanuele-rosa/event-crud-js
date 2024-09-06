var express = require("express");
var router = express.Router();

const { userLogin } = require("../controllers/userController");
const { createAdminUser } = require("../controllers/indexController");

router.post("/", createAdminUser);
router.post("/login", userLogin);

module.exports = router;
