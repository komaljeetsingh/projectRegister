const AddDoctor = require("../Models/AddDoctor");
const bcrypt = require('bcryptjs');
const multer=require("multer");
const {storage}=require("../cloudConfig");
const doctorAppointment = require("../Models/DoctorAppointment");
const upload=multer({ storage });

module.exports.addDoctor=async(req,res,next)=>{
    try{
        let img=await req.file.path;
        let {name,email,address,mobile,education,specializations,experience,consultationFee}=req.body;
        let password=await bcrypt.hash(req.body.password, 12);
        let docId=`Dr.${name},${email},${Math.floor(Math.random() * 10) + 1}`;
        let result=await new AddDoctor({name,img,docId,mobile,education,specializations,experience,consultationFee,password,email,address});
        const data=await result.save();
        res.json({msg: "Add Successful"});
    }catch(err){
        res.json({msg: "Error"});
    }
}

module.exports.updateDoctor=async(req,res,next)=>{
    try{
        let img=await req.file.path;
        let {name,email,address,docId,mobile,education,specializations,experience,consultationFee}=req.body;
        let result=await AddDoctor.findOneAndUpdate({docId:docId},{name,img,mobile,education,specializations,experience,consultationFee,email,address});
        const data=await result.save();
        res.json({msg: "Update Successful"});
    }catch(err){
        res.json({msg: "Error"});
    }
}

module.exports.LoginDoctor=async(req,res,next)=>{
    try{
        let {docId, password}=req.body;
        let rec=await AddDoctor.findOne({docId});
        if(rec){
            if(await bcrypt.compare(password, rec.password)){
                res.json({msg: "Login Successful"});
            }
            else{
                res.json({msg: "Invalid Login"});
            }
        }
        else{
            res.json({msg: "Invalid Login"});
        }
    }catch(err){
        res.json({msg: "Error"});
    }
}
module.exports.docpro=async(req,res,next)=>{
    try{
        const data=await AddDoctor.findOne({docId:req.body.docId});
        res.json({msg:data});
    }catch(err){
        res.json({msg:"Error"});
    }
}
module.exports.topDoc=async(req,res,next)=>{
    try{
        const data=await AddDoctor.find();
        res.json({msg:data});
    }catch(err){
        res.json({msg:"Error"});
    }
}
module.exports.docAppointment=async(req,res,next)=>{
    try{
        let {patientName, patientNumber, patientGender, appointmentDate, timeSchedule, appointmentStatus}=req.body;
        let result=await new doctorAppointment({patientName, patientNumber, patientGender, appointmentDate, timeSchedule, appointmentStatus});
        const data=await result.save();
        res.json({msg: "Appointment Booked Successfully"});
    }catch(err){
        res.json({msg: "Some Went Wrong"});
    }
}
module.exports.getDocAppointment=async(req,res,next)=>{
    try{
        let {id}=req.body;
        let result=await doctorAppointment.find({_id:id});
        res.json({msg: result});
    }catch(err){
        res.json({msg: "Some Went Wrong"});
    }
}
module.exports.getAppointment=async(req,res,next)=>{
    try{
        let result=await doctorAppointment.find({});
        res.json({msg: result});
    }catch(err){
        res.json({msg: "Some Went Wrong"});
    }
}
module.exports.updateAppointment=async(req,res,next)=>{
    try{
        let {patientName, patientNumber, patientGender, appointmentDate, timeSchedule, appointmentStatus, id}=req.body;
        let result=await doctorAppointment.findOneAndUpdate({_id:id},{patientName, patientNumber, patientGender, appointmentDate, timeSchedule, appointmentStatus});
        const data=await result.save();
        res.json({msg: "Appointment Updated Successfully"});
    }catch(err){
        res.json({msg: "Some Went Wrong"});
    }
}
module.exports.updatePassword=async(req,res)=>{
    try{
        const newPassword=await bcrypt.hash(req.body.newPassword, 12);
        const oldPassword=req.body.password;
        const data=await AddDoctor.findOne({docId:req.body.docId});
        if(data){
            if(await bcrypt.compare(oldPassword, data.password)){
                const result=await AddDoctor.findOneAndUpdate({docId:req.body.docId},{password:newPassword});
                res.json({msg:"Update Successful"});
            }
            else{
                res.json({msg: "Your Old Password Is Incorrect"});
            }
        }
        else{
            res.json({msg: "User Doesn't exist"});
        }
    }catch(err){
        res.json({msg:"Error"});
    }
}