const User=require("../models/User");
const bcryptjs=require("bcryptjs");
const jasonWebToken=require("jsonwebtoken");

const userController={
    signUp: async (req,res)=>{
        var errors=[];
        const {userName,userPass,userFirstName,userLastName,userImg,userPhone,userPayPal}=req.body;
        const userExists=await User.findOne({userName});
        if(userExists){errors.push("User already Exists")};
        if(errors.length===0){
            const passHashed=bcryptjs.hashSync(userPass,10);
            var newUser= new User({userName,userPass:passHashed,userFirstName,userLastName,userImg,userPhone,userPayPal});
            const newUserSaved=await newUser.save()
            var token= jasonWebToken.sign({...newUserSaved},process.env.JWT_SECRET_KEY,{})
        }
        console.log(token)
        return res.json({
            sucess: errors.length===0 ? true : false,
            errors,
            response: errors.length===0 && {token,userFirstName,userImg}
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
            sucess:errors.length===0? true : false,
            errors,
            response:errors.length===0 && {token, id: userExists._id, userFirstName: userExists.firstName, userImg: userExists.userImg }
        })
    },
    logInLS:(req,res)=>{
        res.json({
            sucess:true, 
            response:{token: req.body.token, userFirstName: req.user.firstName, userImg: req.user.userPic, id:req.user._id}})
    }
}

module.exports=(userController);