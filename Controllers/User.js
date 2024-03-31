const signUpModel = require("../Models/UserSignUp");
const bcrypt = require('bcryptjs');
const multer=require("multer");
const {storage}=require("../cloudConfig");
const upload=multer({ storage });

module.exports.signUp=async(req,res,next)=>{
    try{
        let profileimg=await req.file.path;
        console.log(profileimg);
        let {username, useremail, number}=req.body;
        console.log(username);
        let password=await bcrypt.hash(req.body.password, 12);
        let result=await new signUpModel({username,useremail,password,number,profileimg});
        const data=await result.save();
        res.json({msg: "SignUp Successful"});
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
        res.json({msg:"Error"});
    }
}