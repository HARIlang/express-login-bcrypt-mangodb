const reteLimit = require('express-rate-limit');



const globalLimiter = reteLimit({
    windowMs: 15 * 60 *1000,  // millisecond convertion for 15 minutes
    max:100,
     message:{
      success:false,
      message:'too many request , please try again 60 minutes'    
    },
    standardHeaders:true,
    legacyHeaders:false 
});
module.exports = { globalLimiter }