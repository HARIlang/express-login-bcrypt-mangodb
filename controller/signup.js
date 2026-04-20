const userModel = require("../models/usermodel.js");

const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  // creating the controller
  try {
    let { name, email, password } = req.body; //  destructuring the req    name = name.trim();
    email = email.trim();
    password = password.trim();

    if (!name || !email || !password) {
      // validating the empty and and no fields
      return res.status(400).json({
        message: "all filed should be filled",
      });
    }

    const existingUser = userModel.findOne({email});

    if(existingUser){              // check the existing user by the email

       return res.status(409).json({
        message:'the user is already exist in given email',
        success:false
       });}

    const hashedPassword = await bcrypt.hash(password, 11); // hashing and salting the password by bcrypting

    const user = userModel.create({
      name,
      email,
      password: hashedPassword, // setting the hashed password
    });

    res.status(200).json({
      // user is created
      message: "the user is created",
      data: user,
      success: true,
    });
  } catch (error) {
    // throw the error
    res.status(500).json({
      message: "internal server error",
      error: error.message,
      success: false,
    });
  }
};

module.exports = {signUp};