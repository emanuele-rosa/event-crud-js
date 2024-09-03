const mongoose = require("mongoose");
const UserSchema = require("../model/User");
const UserModel = mongoose.model("Usuario", UserSchema);

exports.userIsAdmin = async (req, res, next) => {
  const { email } = req.body;

  const user = await UserModel.findOne({ email });

  if (user?.isAdmin === false) {
    return res.status(403).json({
      status: false,
      error: "Non-administrator users cannot delete other users",
    });
  }
  next();
};
