const mongoose=require("mongoose");
const HospitalAdd=mongoose.model("HospitalDetails", new mongoose.Schema({
    hos_name: {type: String, required: true},
    hos_location: {type: String, required: true},
    hos_img: {type: String, required: true},
    hos_facility: {type: String, required: true},
    hos_nearby: {type: String, required: true}
}))
module.exports=HospitalAdd;