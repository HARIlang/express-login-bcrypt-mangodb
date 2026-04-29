const reteLimit = require('express-rate-limit');



const globalLimiter = reteLimit({
    windowMs: 15 * 60 *1000,  // millisecond convertion for 15 minutes
    max:100,       // max 100 req for 15 mins
     message:{
      success:false,
      message:'too many request , please try again 60 minutes'    
    },
    standardHeaders:true,
    legacyHeaders:false 
});


const loginLimit = reteLimit({

  windowMs: 15*60*1000 ,
  max: 5 ,
  message:{
    message:'more than 5 logins are not allwoed for single user',
    success:false
  }


})
module.exports = { globalLimiter,loginLimit}