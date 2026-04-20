const mongoose = require('mongoose');

const userSchema  = mongoose.Schema({

name:{
type:String,
trim:'true',
required:true 
},
email:{
type:String,
required:true,
lowercase:true,
trim:'true'


},
password:{

    type:String,
    required:'true , "password is required"',
}

});

const userModel = mongoose.model(userSchema,'user');

module.exports = userModel;