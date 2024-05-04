const mongoose=require("mongoose");

const signUpModel=mongoose.model("usersignup", new mongoose.Schema({
    username: {type: String, required: true},
    useremail: {type: String, required: true, unique: true},
    number: {type: Number, required: true},
    profileimg: {type: String},
    age: {type: Number},
    gender: {type: String},
    dob: {type: Date},
    address: {type: String},
    password: {type: String, required: true}
}));
module.exports=signUpModel;
