const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

async function registerUser(req, res) {
  try {
    const { userName, email, password, role = "user" } = req.body;

    const existingUser = await userModel.findOne({
      $or: [
            { userName }, 
            { email }
        ],
    });

    if (existingUser) {
      return res.status(409).json({
        message: "user already exist",
      });
    }

    const hash = await bcryptjs.hash(password, 10)

    const user = await userModel.create({
      userName,
      email,
      password: hash,
      role,
    });

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
    );

    res.cookie("token", token);

    res.status(201).json({
      message: "user register successfully",
      user,
    });

  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
}


module.exports = {registerUser}