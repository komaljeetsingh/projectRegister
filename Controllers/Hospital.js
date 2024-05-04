const HospitalAdd = require("../Models/HospitalAdd");

module.exports.addHospital=async(req,res,next)=>{
    try{
        let hos_img=await req.file.path;
        let {hos_name, hos_facility, hos_location, hos_nearby}=req.body;
        let result=await new HospitalAdd({hos_name, hos_facility, hos_location, hos_nearby, hos_img});
        const data=await result.save();
        res.json({msg: "Hospital Add Successful"});
    }catch(err){
        res.json({msg: "Error"});
    }
}