const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const UserSchema = require("../model/User");
const UserModel = mongoose.model("User", UserSchema);

createUserToken = async (user, req, res) => {
  try {
    const token = jwt.sign(
      {
        name: user.email,
      },
      process.env.NEXT_PUBLIC_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    return token;
  } catch (error) {
    res
      .status(400)
      .json({ status: false, error: "An error occured when creating token" });
  }
};

exports.userRegister = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
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
    const confirmPasswordHash = await bcrypt.hash(confirmPassword, salt);

    const newUser = await new UserModel({
      name,
      password: passwordHash,
      confirmPassword: confirmPasswordHash,
      email,
      isAdmin: false,
    });

    let token = await createUserToken(newUser, req, res);

    newUser.token = token;

    await newUser.save();
    return res.json({ status: true, token: token });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, error: "An error occurred during registration" });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(422).json({ message: "Email is mandatory!" });
      return;
    }
    if (!password) {
      return res.status(422).json({ message: "Password is mandatory!" });
      return;
    }

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(422).json({
        message: "No users found with this email",
      });
      return;
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(422).json({
        message: "Invalid password",
      });
      return;
    }

    await user.save();

    const token = await createUserToken(user, req, res);

    return res.status(200).json({
      message: "Successful login",
      token: token,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "An error occured during the login" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, confirmPassword } = req.body;

    const salt = await bcrypt.genSalt(6);
    const passwordHash = await bcrypt.hash(password, salt);
    const confirmPasswordHash = await bcrypt.hash(confirmPassword, salt);

    const userId = id;
    const newUser = {
      name: name,
      email: email,
      password: passwordHash,
      confirmPassword: confirmPasswordHash,
    };

    await UserModel.findByIdAndUpdate(userId, newUser);
    return res.json({ status: true, msg: "User updated", user: newUser });
  } catch (error) {
    return res.status(404).json({
      status: false,
      error: "An error occurred during the update! Please, try again!",
    });
  }
};
