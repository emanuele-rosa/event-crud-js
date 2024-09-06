const mongoose = require("mongoose");
const UserSchema = require("../model/User");
const UserModel = mongoose.model("User", UserSchema);

exports.getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();

    if (users.length === 0) {
      return res.status(404).json({ status: false, error: "No users found!" });
    }

    return res.json({ status: true, users });
  } catch (error) {
    return res.status(400).json({
      status: false,
      error: "An error occurred while fetching the users!",
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ status: false, error: "User not found!" });
    }

    return res.json({ status: true, user: user });
  } catch (error) {
    return res.status(400).json({
      status: false,
      error: "An error occurred while fetching the user!",
    });
  }
};

exports.createAdmin = async (req, res) => {
  const { id } = req.body;
  try {
    await UserModel.findByIdAndUpdate(id, { isAdmin: true });

    return res.json({ status: true, msg: "Admin created successfully!" });
  } catch (error) {
    return res.status(400).json({
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

    if (user?.isAdmin === true) {
      return res
        .status(403)
        .json({ status: false, error: "You can't delete an admin user!" });
    }

    await UserModel.findByIdAndDelete(id).then((user) => {
      if (user) {
        return res.json({ status: true, msg: "User deleted successfully!" });
      }
    });
  } catch (error) {
    return res.json({
      status: false,
      error: "An error occurred during deletion. Please, try again!",
    });
  }
};
