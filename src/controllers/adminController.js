const mongoose = require("mongoose");
const UserSchema = require("../model/User");
const UserModel = mongoose.model("User", UserSchema);

exports.createAdmin = async (req, res) => {
  const { id } = req.body;
  try {
    await UserModel.findByIdAndUpdate(id, { isAdmin: true });

    return res.json({ status: true, msg: "Admin created successfully!" });
  } catch (error) {
    res.status(400).json({
      status: false,
      error: "An error occurred during the admin creation! Please, try again!",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ status: false, error: "User not found!" });
    }

    if (user.isAdmin === true) {
      return res
        .status(403)
        .json({ status: false, error: "You can't delete an admin user!" });
    }

    await UserModel.findByIdAndDelete(id).then((user) => {
      if (user) {
        res.json({ status: true, msg: "User deleted successfully!" });
      }
    });
  } catch {
    res.json({
      status: false,
      error: "An error occurred during deletion. Please, try again!",
    });
  }
};
