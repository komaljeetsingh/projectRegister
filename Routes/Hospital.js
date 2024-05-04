const express = require('express');
const multer=require("multer");
const router=express.Router();
const {storage}=require("../cloudConfig");
const addHospitalController = require('../Controllers/Hospital');
const upload=multer({ storage });
const app=express();

router.route("/add")
.post(upload.single("hos_img"),addHospitalController.addHospital);

module.exports=router;