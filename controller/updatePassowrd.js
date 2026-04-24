const bcrypt = require("bcrypt");
const userModel = require("../models/usermodel.js");

const updatePassword = async (req, res) => {


   const validateNewPassword = (newPassword) =>{
 
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
    return regex.test(newPassword);



   }

  try {
    let { email, oldPassword, newPassword } = req.body;
   
      email = email.trim().toLowerCase();
      oldPassword = oldPassword.trim();
      newPassword = newPassword.trim();


      console.log(typeof(email))

      
    if (!email || !oldPassword || !newPassword) {     // test passed
      return res.status(400).json({
        message: "All fields are required",    
        success: false,
      });
    }


      const user = await userModel.findOne({email}).select('+password');

      if(!user){
      return  res.status(404).json({       // test passed
            message:'the user is not registered , first create a account',  
            success:false
        })
      }

   
    if(!validateNewPassword(newPassword)){

        res.status(400).json({
             message:'the password should contain at least 6 character , one special character , one uppercase and one lowercase '
        })
    }

      const isMatch =  await bcrypt.compare(oldPassword,user.password);   // test passed

      if(!isMatch){

        return res.status(401).json({
            message:'the old password is incorrect ',
            success:false,
        })
      }

     const salt = await bcrypt.genSalt(11);     
     const hashedPassword = await bcrypt.hash(newPassword,salt);
     user.password = hashedPassword
     await user.save();

     return res.status(200).json({
        message:'password is updated',
        success:true,
     })


  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      error: error.message,
      success: false,
    });
  }
};

module.exports = {updatePassword}