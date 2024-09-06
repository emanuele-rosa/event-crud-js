const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const UserSchema = require("../model/User");
const UserModel = mongoose.model("User", UserSchema);

exports.createAdminUser = async (user, req, res) => {
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
    const adminEmail = process.env.ADMIN_EMAIL;

    const existingAdmin = await UserModel.findOne({ email: adminEmail });
    if (existingAdmin === null) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(
        process.env.ADMIN_PASSWORD,
        salt
      );
      const hashedConfirmPassword = await bcrypt.hash(
        process.env.ADMIN_PASSWORD,
        salt
      );

      const adminUser = await new UserModel({
        name: "Admin",
        email: adminEmail,
        password: hashedPassword,
        confirmPassword: hashedConfirmPassword,
        isAdmin: true,
        token: token,
      });

      await adminUser.save();
      return req.status(201).json({
        status: true,
        msg: "Admin user created successfully!",
      });
    } else {
      return req.status(400).json({
        status: false,
        msg: "Admin user already exists!",
      });
    }
  } catch (error) {
    console.log(error);
    return req.status(500).json({
      status: false,
      error: "An error occured during admin user creation",
    });
  }
};
