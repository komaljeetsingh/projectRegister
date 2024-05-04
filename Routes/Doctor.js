const express = require('express');
const addDoctorController = require('../Controllers/Doctor.js');
const multer=require("multer");
const router=express.Router();
const {storage}=require("../cloudConfig");
const upload=multer({ storage });
const app=express();

router.route("/details")
.post(upload.single("img"),addDoctorController.addDoctor);

router.route("/update")
.put(upload.single("img"),addDoctorController.updateDoctor);

router.route("/login")
.post(addDoctorController.LoginDoctor);

router.route("/docpro")
.post(addDoctorController.docpro);

router.route("/topdoc")
.get(addDoctorController.topDoc);

router.route("/bookapp")
.post(addDoctorController.docAppointment);

router.route("/getdocapp")
.post(addDoctorController.getDocAppointment);

router.route("/getapp")
.get(addDoctorController.getAppointment);

router.route("/updateapp")
.put(addDoctorController.updateAppointment);

router.route("/updatePassword")
.patch(addDoctorController.updatePassword);

module.exports=router;
