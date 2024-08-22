const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { user, password } = req.body;
  if (user === password) {
    let token = jwt.sign({ user: user }, "#aBcDeFgH", { expiresIn: "1h" });
    res.json({ status: true, token: token });
  } else {
    return res
      .status(401)
      .json({ status: false, error: "Invalid credentials!" });
  }
};
