const mongoose=require("mongoose");

const doctorLogin=mongoose.model("DoctorLogin", new mongoose.Schema({
    docIdocId: {type: String, required: true},
    password: {type: String, required: true}
}))
module.exports=doctorLogin;

