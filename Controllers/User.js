const signUpModel = require("../Models/UserSignUp");
const bcrypt = require('bcryptjs');
const multer=require("multer");
const {storage}=require("../cloudConfig");
const doctorAppointment = require("../Models/DoctorAppointment");
const upload=multer({ storage });

module.exports.signUp=async(req,res,next)=>{
    try{
        // let profileimg=await req.file.path;
        // console.log(profileimg);
        let {username, useremail, number}=req.body;
        // console.log(username);
        const rec=await signUpModel.findOne({useremail});
        if(rec.useremail){
            res.json({msg: "User already exist"});
        }else{
            let password=await bcrypt.hash(req.body.password, 12);
            let result=await new signUpModel({username,useremail,password,number});
            const data=await result.save();
            res.json({msg: "SignUp Successful", msg1:data});
        }
    }catch(err){
        res.json({msg: "Error"});
    }
}

module.exports.login=async(req,res,next)=>{
    try{
        let {useremail, password}=req.body;
        let rec=await signUpModel.findOne({useremail});
        if(rec){
            if(await bcrypt.compare(password, rec.password)){
                res.json({msg: "Login Successful", msg1:rec});
            }
            else{
                res.json({msg: "Invalid Login"});
            }
        }
        else{
            res.json({msg: "Invalid Login"});
        }
    }catch(err){
        res.json({msg:"Error"});
    }
}
module.exports.getpro=async(req,res,next)=>{
    try{
        const data=await signUpModel.findOne({useremail:req.body.useremail});
        res.json({msg:data});
    }catch(err){
        res.json({msg:"Error"});
    }
}

module.exports.userAppointment=async(req,res)=>{
    try{
        const data=await doctorAppointment.find({patientNumber:req.body.patientNumber});
        res.json({msg:data});
    }catch(err){
        res.json({msg:"Error"});
    }
}
module.exports.userDelAppointment=async(req,res)=>{
    try{
        const data=await doctorAppointment.findByIdAndDelete({_id:req.body.id});
        res.json({msg:"Delete Successful"});
    }catch(err){
        res.json({msg:"Error"});
    }
}

module.exports.updatePassword=async(req,res)=>{
    try{
        const newPassword=await bcrypt.hash(req.body.newPassword, 12);
        const oldPassword=req.body.password;
        const data=await signUpModel.findOne({useremail:req.body.useremail});
        if(data){
            if(await bcrypt.compare(oldPassword, data.password)){
                const result=await signUpModel.findOneAndUpdate({useremail:req.body.useremail},{password:newPassword});
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
module.exports.updateProfile=async(req,res)=>{
    try{
        let profileimg=await req.file.path;
        const {useremail,username,age,address,gender,dob,number}=req.body;
        const rec=await signUpModel.findOneAndUpdate({useremail},{useremail,username,age,address,gender,dob,number,profileimg});
        res.json({msg:"Updated", msg1: rec});
    }catch(err){
        res.json({msg:"Error"});
    }
}