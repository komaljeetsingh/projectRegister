const mongoose=require("mongoose");
const AddDoctor=mongoose.model("DoctorDetail", new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    address: {type: String, required: true},
    img: {type: String, required: true},
    docId: {type: String, required: true},
    mobile: {type: Number, required: true},
    education: {type: String, required: true},
    specializations: {type: String, required: true},
    experience: {type: Number, required: true},
    consultationFee: {type: Number, required: true},
    password: {type: String, required: true}
}))


module.exports=AddDoctor;