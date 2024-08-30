const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const UserSchema = require("../model/User");
const UserModel = mongoose.model("Usuario", UserSchema);

exports.userRegister = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ status: false, error: "User already exists!" });
    }
    const salt = await bcrypt.genSalt(6);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      name,
      password: passwordHash,
      email,
      isAdmin,
    });

    let token = jwt.sign({ name: newUser.name }, "#aBcDeFgH", {
      expiresIn: "1h",
    });

    newUser.token = token;

    await newUser.save();
    res.json({ status: true, token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, error: "Internal Server Error" });
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
