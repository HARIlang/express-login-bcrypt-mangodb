const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const userModel = require('./usermodel');


const adminSchema = mongoose.Schema({

  name:{
    type:String,
    required:true,

  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  password
  :{

    type:String,
    required:true,
    
  }

},


{
    timestamp : true
}
);


const adminModel = mongoose.model('admin',adminSchema);

module.exports = adminModel;