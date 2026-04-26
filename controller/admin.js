const { model } = require("mongoose");
const adminModel = require("../models/adminmodel.js");
const { logIn } = require("./signup.js");
const userModel = require("../models/usermodel.js");

const createAdmin = async (req, res) => {
  try {
    let { name, email, password } = req.body; // destructuring

    name = name.trim();
    email = email.trim(); // trim for avoiding the extra space
    password = password.trim();

    if (!email || !password || !name) {
      // logic for handling the empty fields

      return res.status(400).json({
        message: "all filed should be filled",
        success: false,
      });
    }

    const existingUser = await adminModel.findOne({ email }); // check with email

    if (existingUser) {
      return res.status(409).json({
        // return if email already exist
        message: "the is already exist",
        status: false,
      });
    }

    const admin = await adminModel.create({
      // create admin
      name,
      email,
      password,
    });

    return res.status(200).json({
      message: "admin is created",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error form create admin", // return server error
      error: error.message,
    });
  }
};

const adminLogin = async (req, res) => { // admin login module
 try{

     let { email, password } = req.body;    // destructuring 

  email = email.trim();
  password = password.trim();      // using trim function for avoid extra space

  if (!email || !password) {       // validate the empty fields
    return res.status(400).json({
      message: "all the fields should be filled ",
      success: false,
    });
  }

  const admin = await adminModel.findOne({ email }).select("+password");    // find the email
  if (!admin) {
    return res.status(409).json({      // if the email not exist
      message: "invalid email",
      success: false,
    });
  }

  return res.status(200).json({        // if the email is exist the admin is logged in 
    message: `welcome back ${admin.name}`,
    success: true,
    admin:{
      name: admin.name,
      email: admin.email,
    },
  });
 }

 catch(error){
    res.status(500).json({
        message:'internal server error form login admin module',
        status:false,

    })
 }
};

module.exports = { createAdmin, adminLogin };
