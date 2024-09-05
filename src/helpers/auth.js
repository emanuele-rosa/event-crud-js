const jwt = require("jsonwebtoken");

exports.validaToken = async (req, res, next) => {
  let token = req.headers["authorization"];

  let cleanedToken = token.split(" ")[1];

  jwt.verify(
    cleanedToken,
    process.env.NEXT_PUBLIC_SECRET_KEY,
    (err, decoded) => {
      if (err) {
        res.status(401).json({ status: false, error: "Invalid token!" });
      } else {
        req.user = decoded.user;
        next();
      }
    }
  );
};
