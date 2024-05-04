const mongoose=require("mongoose");

const doctorAppointment=mongoose.model("DoctorAppointment", new mongoose.Schema({
    patientName: {type: String, required: true},
    patientNumber: {type: Number, required: true},
    patientGender: {type: String, required: true},
    appointmentDate: {type: Date, required: true},
    timeSchedule: {type: String, required: true},
    appointmentStatus: {type: String, default:'pending', enum: ['pending', 'confirmed', 'cancelled']}
}))
module.exports=doctorAppointment;

