const express = require('express');
const addDoctorController = require('../Controllers/Doctor.js');
const multer=require("multer");
const router=express.Router();
const {storage}=require("../cloudConfig");
const upload=multer({ storage });
const app=express();

router.route("/details")
.post(upload.single("img"),addDoctorController.addDoctor);

router.route("/login")
.post(addDoctorController.LoginDoctor);

module.exports=router;
