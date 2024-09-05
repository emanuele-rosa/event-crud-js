var express = require("express");
var router = express.Router();

const { createAdmin, deleteUser } = require("../controllers/adminController");
const { userIsAdmin } = require("../helpers/user");

router.patch("/createAdmin", userIsAdmin, createAdmin);

router.delete("/delete/:id", userIsAdmin, deleteUser);

module.exports = router;
