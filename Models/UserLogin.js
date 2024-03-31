const mongoose=require("mongoose");

const loginModel=mongoose.model("userlogin", new mongoose.Schema({
    useremail: {type: String, required: true},
    password: {type: String, required: true}
}));
module.exports=loginModel;