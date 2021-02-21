const mongoose=require("mongoose");

const userSchema= new mongoose.Schema({
    userName:String,
    userPass:String,
    userFirstName:String,
    userLastName:String,
    userImg:{type:String, default: "no-usuario.png"},
    userPhone:Number,
    userPayPal:String,
    userGoogle:Boolean,
    userRol:{type:String,default: "User"},
})

const User=mongoose.model("user",userSchema);

module.exports=User;