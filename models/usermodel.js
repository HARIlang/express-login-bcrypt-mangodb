const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: "true",
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: "true",
    },
    password: {
      type: String,
      required: 'true , "password is required"',
      select:false
    },
    isLogin:{
      type:Boolean,
      required:true,
      default:false
    }
  },
  {
    timestamp: true,
  },
);

const userModel = mongoose.model("user", userSchema);   //('collection name', schema)

module.exports = userModel;
