const mongoose=require("mongoose");

const userSchema= new mongoose.Schema({
    userName:String,
    userPass:String,
    userFirstName:String,
    userLastName:String,
    userImg:String,
    userPhone:Number,
    userPayPal:String,
    userRol:{type:String,default: "User"},
})

const User=mongoose.model("user",userSchema);

module.exports=User;