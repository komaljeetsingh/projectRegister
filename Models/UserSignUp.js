const mongoose=require("mongoose");

const signUpModel=mongoose.model("usersignup", new mongoose.Schema({
    username: {type: String, required: true},
    useremail: {type: String, required: true},
    number: {type: Number, required: true},
    profileimg: {type: String, required: true},
    // age: {type: Number, required: true},
    password: {type: String, required: true}
}));
module.exports=signUpModel;
