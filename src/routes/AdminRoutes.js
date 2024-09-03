var express = require("express");
var router = express.Router();

const { deleteUser } = require("../controllers/userController");
const { userIsAdmin } = require("../helpers/user");

router.delete("/delete/:id", userIsAdmin, deleteUser);

module.exports = router;
