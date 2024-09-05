var express = require("express");
var router = express.Router();

const {
  getUserById,
  getUsers,
  createAdmin,
  deleteUser,
} = require("../controllers/adminController");
const { userIsAdmin } = require("../helpers/user");

router.get("/users", userIsAdmin, getUsers);

router.get("/users/:id", userIsAdmin, getUserById);

router.patch("/createAdmin", userIsAdmin, createAdmin);

router.delete("/delete/:id", userIsAdmin, deleteUser);

module.exports = router;
