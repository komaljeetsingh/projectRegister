const mongoose=require("mongoose");
const HospitalAdd=mongoose.model("HospitalDetails", new mongoose.Schema({
    hos_name: {type: String, required: true},
    hos_Location: {type: String, required: true},
    hos_img: {type: String, required: true}
}))