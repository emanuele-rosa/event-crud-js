var express = require("express");
var router = express.Router();

const {
  getUserById,
  getUsers,
  createAdmin,
  deleteUser,
} = require("../controllers/adminController");
const { userIsAdmin } = require("../helpers/user");
const { validateToken } = require("../helpers/auth");

router.get("/users", validateToken, userIsAdmin, getUsers);

router.get("/users/:id", validateToken, userIsAdmin, getUserById);

router.patch("/createAdmin", validateToken, userIsAdmin, createAdmin);

router.delete("/delete/:id", validateToken, userIsAdmin, deleteUser);

module.exports = router;
