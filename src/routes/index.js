var express = require("express");
var router = express.Router();

const { userLogin } = require("../controllers/userController");

router.get("/", (req, res) => {
  res.json({ status: true, msg: "Welcome to your events management!" });
});
router.post("/login", userLogin);

module.exports = router;
