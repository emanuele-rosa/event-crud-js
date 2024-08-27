const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const UserSchema = require("../model/User");
const UsuarioModel = mongoose.model("Usuario", UserSchema);

exports.createLogin = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  try {
    const existingUser = await UsuarioModel.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ status: false, error: "User already exists!" });
    }

    const newUser = new UsuarioModel({ name, password, email, isAdmin });

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
