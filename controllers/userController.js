const User=require("../models/User");
const bcryptjs=require("bcryptjs");
const jasonWebToken=require("jsonwebtoken");

const userController={
    signUp: async (req,res)=>{
        var errors=[];
        
        const {userName,userPass,userFirstName,userLastName,userPhone,userPayPal,userRol,userGoogle}=req.body;
        const {imgFile}= req.files;

        const imgType=imgFile.name.split(".").slice(-1).join(" ");
        
        const userExists=await User.findOne({userName});
        if(userExists){errors.push("User already Exists")};
        
        if(errors.length===0){
            var passHashed=await bcryptjs.hashSync(userPass,10);
            var newUser= new User({userName,userPass:passHashed,userFirstName,userLastName,userPhone,userPayPal,userRol,userGoogle});
            var imgName= `${newUser._id}.${imgType}`
            var imgPath= `${__dirname}/../client/build/userImages/${newUser._id}.${imgType}`
            await imgFile.mv(imgPath,error=>{
                if(error){
                 
                    errors.push(error)}
                else{
            
                }})
            newUser.userImg=imgName;
            if(errors.length===0){

            const newUserSaved=await newUser.save()
            var token= jasonWebToken.sign({...newUserSaved},process.env.JWT_SECRET_KEY,{})
            }
        }
        return res.json({
            success: errors.length===0 ? true : false,
            errors: errors.length=== 0 ? null : errors,
            response: errors.length===0 && {token,id: newUser._id,userFirstName,userLastName,userImg:newUser.userImg,userRol}
        })
        
    },
    logIn: async (req,res)=>{
        var errors=[];
        const {userName,userPass,loginGoogle}=req.body;
        
        const userExists= await User.findOne({userName})
       
        if(!userExists){
            errors.push("User doesn't exist");
        }else if (userExists){
            if (!loginGoogle && userExists.userGoogle ){
                errors.push("You must logged with google")
            }
            else if(errors.lenght!==0){
                const passwordMatches= bcryptjs.compareSync(userPass,userExists.userPass);
                if(!passwordMatches){errors.push("Incorrect username or password, please try again ");}
                var token=jasonWebToken.sign({...userExists}, process.env.JWT_SECRET_KEY, {});
            }
        
        }
        return res.json({
            success: errors.length===0 ? true : false,
            errors:errors,
            response:errors.length===0 && {token, id: userExists._id,
                 userFirstName: userExists.userFirstName,userLastName:userExists.userLastName, userImg: userExists.userImg, userRol:userExists.userRol }
        })
    },
    logInLS:(req,res)=>{
        res.json({
            success:true,
            response:{token: req.body.token, userFirstName: req.user.userFirstName,userLastName:req.user.userLastName,
                 userImg: req.user.userImg, id:req.user._id, userRol: req.user.userRol}})
    }
}

module.exports=(userController);