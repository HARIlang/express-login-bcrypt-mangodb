const adminModel = require("../models/adminmodel.js");

const createAdmin = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    name = name.trim();
    email = email.trim();
    password = password.trim();

    if(!email||!password||!name){

     return res.status(400).json({
        message:'all filed should be filled',
        success:false
     })

    }

    const existingUser = await adminModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "the is already exist",
        status: false,
      });
        }

      const admin = await adminModel.create({
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
      message: "internal server error form create admin",
      error: error.message,
    });
  }
};

module.exports = createAdmin
