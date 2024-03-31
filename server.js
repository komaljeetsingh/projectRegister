if(process.env.NODE_ENV != "production") {
    require("dotenv").config();
}
// console.log(process.env);

const express=require("express");
const mongoose=require("mongoose");
const path=require("path");
const userRouter=require("./Routes/User.js");
const doctorRouter=require("./Routes/Doctor.js");
const methodOverride=require("method-override");

const app=express();
app.use(express.json());

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

app.listen(8000,()=>{
    console.log("Server Started");
})