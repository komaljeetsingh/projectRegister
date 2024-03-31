const express = require('express');
const userController = require('../Controllers/User.js');
const addDoctorController = require('../Controllers/Doctor.js');
const router=express.Router();
const multer=require("multer");
const app=express();
const {storage}=require("../cloudConfig");
const upload=multer({ storage });

router.route("/signup")
.post(upload.single("profileimg"),userController.signUp);

router.route("/login")
.post(userController.login);

router.route("/details")
.post(addDoctorController.addDoctor);

module.exports=router;
