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
exports.validaToken = async (req, res, next) => {
  let token = req.headers["authorization"];

  let cleanedToken = token.split(" ")[1];

  jwt.verify(cleanedToken, "#aBcDeFgH", (err, decoded) => {
    if (err) {
      res.status(401).json({ status: false, error: "Invalid token!" });
    } else {
      req.user = decoded.user;
      next();
    }
  });
};
