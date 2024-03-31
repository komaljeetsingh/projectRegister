const AddDoctor = require("../Models/AddDoctor");
const bcrypt = require('bcryptjs');
const multer=require("multer");
const {storage}=require("../cloudConfig");
const upload=multer({ storage });

module.exports.addDoctor=async(req,res,next)=>{
    try{
        let img=await req.file.path;
        let {name,docId,mobile,education,specializations,experience,consultationFee}=req.body;
        let password=await bcrypt.hash(req.body.password, 12);
        let result=await new AddDoctor({name,img,docId,mobile,education,specializations,experience,consultationFee,password});
        const data=await result.save();
        res.json({msg: "Add Successful"});
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