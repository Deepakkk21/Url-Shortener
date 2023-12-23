const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true,unique: true},
  password : {type :String, required:true , maxLength:15, minLength:3},
  resetToken: {type: String,default: null},
  resetTokenExpiry: {type: Date, default: null},
},{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports=User;