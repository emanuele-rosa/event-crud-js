const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const UserSchema = require("../model/User");
const UserModel = mongoose.model("User", UserSchema);

exports.findById = async (req, res, next) => {
  try {
    let { id } = req.params;

    const event = await UserModel.findById(id);

    if (event === null) {
      return res
        .status(404)
        .json({ status: false, error: "User doesn't exists" });
    }

    next();
  } catch {
    return res.status(404).json({
      status: false,
      error: "An error occurred while locating the user",
    });
  }
};

exports.userIsAdmin = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];

    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_SECRET_KEY);
    req.user = decoded;

    const user = UserModel.findOne({ token: token });

    if (user?.isAdmin === false) {
      return res.status(403).json({
        status: false,
        error: "Non-administrator users are not allowed to access this route",
      });
    }
    next();
  } catch (error) {
    res.status(401).json({
      status: false,
      error: "An error occured when validating administrator access",
    });
  }
};

exports.compareHashPassword = async (req, res, next) => {
  try {
    const { password, confirmPassword } = req.body;

    const salt = await bcrypt.genSalt(6);
    const confirmPasswordHash = await bcrypt.hash(confirmPassword, salt);

    const matchPasswords = await bcrypt.compare(password, confirmPasswordHash);

    if (matchPasswords === false) {
      return res.status(400).json({
        status: false,
        error: "Password and Confirm Password do not match",
      });
    }
    next();
  } catch (error) {
    return res.status(400).json({
      status: false,
      error: "An error occurred while comparing the passwords",
    });
  }
};
