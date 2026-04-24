const userModel = require("../models/usermodel.js");

const bcrypt = require("bcrypt"); //

const validatePassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/; //
  return regex.test(password);
};

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

    const existingUser = await userModel.findOne({ email });    // find the user by email

    if (existingUser) {
      // check the existing user by the email

      return res.status(409).json({
        message: "the user is already exist in given email",
        success: false,
      });
    }

    if (!validatePassword(password)) {
      // validating the password

    return res.status(400).json({
        message:
          "the password should at least 6 characters one uppercase , lowercase and one special character",
        success: false,
      });
    }


    const hashedPassword = await bcrypt.hash(password, 11); // hashing and salting the password by bcrypting

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword, // setting the hashed password   
    });

   return res.status(200).json({
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

const logIn = async (req, res) => {    
  // login

  try {
    let { email, password } = req.body;

    email = email.trim();
    password = password.trim();

    if (!email || !password) {       // checking the fields
      return res.status(400).json({
        message: "email and password is required for login ",
        success: false,
      });
    }

    const user = await userModel.findOne({email}).select('+password')     // find the user by email

    if(!user){                                 // if user not found in the given email
     return res.status(404).json({
            message:'the user is not found first signup',
            success:false
        })
    }

    const isMatch = await bcrypt.compare(password,user.password);


    if(!isMatch){

     return  res.status(400).json({
            message:'incorrect password',
            success:false,
        });
    }

   return res.status(200).json({
        message:`welcome ${user.name}`,
        success: true,
        user : {
          name:user.name,
          email:user.email
        }
       })

  } catch (error) {
  return  res.status(500).json({
      message: "internal server error",
      error: error.message,
      success: false,
      stack : error.stack,
    });
  }
};

module.exports = { signUp ,logIn};
