const userModel = require("../models/usermodel.js");

const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "all filed should be filled",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 11);

    const user = userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status.json({
      message: "the user is created",
      data: user,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      error: error.message,
      success: false,
    });
  }
};
