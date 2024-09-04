const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const UserSchema = require("../model/User");
const UserModel = mongoose.model("Usuario", UserSchema);

createUserToken = async (user, req, res) => {
  const token = jwt.sign(
    {
      name: user.name,
    },
    "secret",
    {
      expiresIn: "1h",
    }
  );

  return token;
};

exports.userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        status: false,
        error: "There is already a user with this e-mail!",
      });
    }
    const salt = await bcrypt.genSalt(6);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      name,
      password: passwordHash,
      confirmPassword: passwordHash,
      email,
      isAdmin: false,
    });

    let token = await createUserToken(newUser, req, res);

    newUser.token = token;

    await newUser.save();
    res.json({ status: true, token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};

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

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    res.status(422).json({ message: "Email is mandatory!" });
    return;
  }
  if (!password) {
    res.status(422).json({ message: "Password is mandatory!" });
    return;
  }

  const user = await UserModel.findOne({ email: email });

  if (!user) {
    res.status(422).json({
      message: "No users found with this email",
    });
    return;
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    res.status(422).json({
      message: "Invalid password",
    });
    return;
  }

  await user.save();

  const token = await createUserToken(user, req, res);

  res.status(200).json({
    message: "Successful login",
    token: token,
  });
};

exports.updateUser = async (req, res) => {
  try {
    const { id, name, email, password, confirmPassword } = req.body;

    let obj = {};
    if (name) obj.name = name;
    if (email) obj.email = email;
    if (password) obj.password = password;
    if (confirmPassword) obj.confirmPassword = confirmPassword;

    if (obj == {}) {
      return res.status(500).json(fail("No changes detected"));
    }

    const newUser = await UserModel.findByIdAndUpdate(id, obj);

    res.json({ status: true, msg: "User updated", user: newUser });
  } catch (error) {
    res.status(404).json({
      status: false,
      error: "An error occurred during the update! Please, try again!",
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
