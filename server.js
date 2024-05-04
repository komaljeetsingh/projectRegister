if(process.env.NODE_ENV != "production") {
    require("dotenv").config();
}
// console.log(process.env);

const express=require("express");
const mongoose=require("mongoose");
const Razorpay=require("razorpay");
const path=require("path");
const cors=require("cors");
const userRouter=require("./Routes/User.js");
const doctorRouter=require("./Routes/Doctor.js");
const hospitalRouter=require("./Routes/Hospital.js");
const methodOverride=require("method-override");

const app=express();
app.use(express.json());
app.use(cors({ "origin": true, "credentials": true }));


app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

const con=async()=>{
    await mongoose.connect("mongodb+srv://komalweb1313:iGLL7dTg2zStekFw@cluster0.xgaj20k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
};
con().then(()=>{
    console.log("Connection Successful");
});
con().catch(()=>{
    console.log("Error");
});

app.use("/User", userRouter);
app.use("/Doctor", doctorRouter);
app.use("/Hospital", hospitalRouter);

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
  });

app.listen(8000,()=>{
    console.log("Server Started");
})