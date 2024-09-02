var express = require("express");
var router = express.Router();

const { deleteUser } = require("../controllers/userController");

router.delete("/delete/:id", deleteUser);

module.exports = router;
