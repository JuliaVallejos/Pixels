const User=require("../models/User");
const bcryptjs=require("bcryptjs");
const jasonWebToken=require("jsonwebtoken");

const userController={
    signUp: async (req,res)=>{
        var errors=[];
        // const {userName,userPass,userFirstName,userLastName,userImg,userPhone,userPayPal,userRol}=req.body;
        const {userName,userPass,userFirstName,userLastName,userPhone,userPayPal,userRol}=req.body;
        const {imgFile}= req.files;

        const imgType=imgFile.name.split(".").slice(-1).join(" ");
        
        const userExists=await User.findOne({userName});
        if(userExists){errors.push("User already Exists")};
        
        if(errors.length===0){
            var passHashed=await bcryptjs.hashSync(userPass,10);
            var newUser= new User({userName,userPass:passHashed,userFirstName,userLastName,userPhone,userPayPal,userRol});
            var imgName= `${newUser._id}.${imgType}`
            var imgPath= `${__dirname}/../frontend/public/userImages/${newUser._id}.${imgType}`
            await imgFile.mv(imgPath,error=>{
                if(error){
                    console.log(error)
                    errors.push(error)}
                else{
                    console.log(newUser)
                }})
            newUser.userImg=imgName;
            if(errors.length===0){
            const newUserSaved=await newUser.save()
            var token= jasonWebToken.sign({...newUserSaved},process.env.JWT_SECRET_KEY,{})
            }
        }
        return res.json({
            sucess: errors.length===0 ? true : false,
            errors:errors,
            response: errors.length===0 && {token,id: newUser._id,userFirstName,userImg:newUser.userImg,userRol}
        })
    },
    logIn: async (req,res)=>{
        var errors=[];
        const {userName,userPass}=req.body;
        const userExists= await User.findOne({userName})
        if(!userExists){
            errors.push("Incorrect username or password, please try again");
        }else if (userExists){
            const passwordMatches= bcryptjs.compareSync(userPass,userExists.userPass);
            if(!passwordMatches){errors.push("Incorrect username or password, please try again");}
            var token=jasonWebToken.sign({...userExists}, process.env.JWT_SECRET_KEY, {});
        }
        return res.json({
            sucess: errors.length===0 ? true : false,
            errors:errors,
            response:errors.length===0 && {token, id: userExists._id,
                 userFirstName: userExists.userFirstName, userImg: userExists.userImg, userRol:userExists.userRol }
        })
    },
    logInLS:(req,res)=>{
        res.json({
            sucess:true,
            response:{token: req.body.token, userFirstName: req.user.userFirstName,
                 userImg: req.user.userImg, id:req.user._id, userRol: req.user.userRol}})
    }
}

module.exports=(userController);