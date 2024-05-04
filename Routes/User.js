const express = require('express');
const userController = require('../Controllers/User.js');
const addDoctorController = require('../Controllers/Doctor.js');
const router=express.Router();
const multer=require("multer");
const app=express();
const {storage}=require("../cloudConfig");
const upload=multer({ storage });

// upload.single("profileimg"),

router.route("/signup")
.post(userController.signUp);

router.route("/login")
.post(userController.login);
router.route("/getpro")
.post(userController.getpro);

router.route("/details")
.post(addDoctorController.addDoctor);

router.route("/userApp")
.post(userController.userAppointment);

router.route("/userDelApp")
.delete(userController.userDelAppointment);

router.route("/updatePassword")
.patch(userController.updatePassword);

router.route("/updateProfile")
.patch(upload.single("img"), userController.updateProfile);

module.exports=router;
