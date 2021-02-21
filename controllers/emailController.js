require('dotenv').config()
var nodemailer = require('nodemailer')
const User = require('../models/User')
const bcrypt=require("bcryptjs")
const emailController = {

   sendEmail: async (req, res) =>{
       console.log(req)

       const email=req.body.userName

       const userAwait = await User.findOne({userName:email})
        if(!userAwait){ 
            res.json({success: false, errors:[{message:"User don't exist"}]})
        }
        else{     
        var transporter = nodemailer.createTransport({
            port: 465,
            host: 'smtp.gmail.com',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            },
            tls: {
                  rejectedUnauthorized:false
                } 
        })
                
        var mailOptions = {
            from: 'proyectopixels0@gmail.com <don`t reply>',
            to: email,
            subject:"Welcome to Pixels!",
            html: `<div style="text-align:center; padding:20px; min-heigth: 250px; background-color:#11050F">
                        <h1 style="color:#FFB5FF">Hi! Greetings from Pixels!</h1>
                        <h1 style="color:#FFB5FF">please click below to change your password!</h1>
                        <link href="http://localhost:3000/passwordReset/${email}"><button style="padding:20px; text-decoration:none" >http://localhost:3000/enterNewPassword</button></link>
                        <h3 style="color:#FFB5FF">If the button does not work, copy and paste the following link in your browser http://localhost:3000/enterNewPassword </h3>
                        <h5 style="color:#FFB5FF">If you did not ask for a password change ignore this email :)</h5>
                    </div>`
        }
        transporter.sendMail(mailOptions, (error, info) =>{
            if(error){
                res.status(500).send(error.message)
            }else {
                console.log("Email enviado.")
                res.status(200).json({respuesta:req.body})
            }
        })} 
    
    },
    resetPassword: (req,res)=> {
        var transporter = nodemailer.createTransport({
            port: 465,
            host: 'smtp.gmail.com',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            },
            tls: {
                  rejectedUnauthorized:false
                } 
        })
        const {email}=req.body
        var mailOptions = {
            from: 'proyectopixels0@gmail.com <don`t reply>',
            to: email,
            subject:"Welcome to Pixels!",
            html: `<div style="text-align:center; padding:20px; min-heigth: 250px; background-color:#11050F">
                        <h1 style="color:#FFB5FF">Password Recovery</h1>
                        <link href="http://localhost:3000/enternewpassword/${email}"></link>
                    </div>`
        }
        transporter.sendMail(mailOptions, (error, info) =>{
            if(error){
                res.status(500).send(error.message)
            }else {
                console.log("Email enviado.")
                res.status(200).json(req.body)
            }
        })
    },
    
recoverPassword: async (req, res) =>{

    const passHasheado= await bcrypt.hashSync(req.body.userPass,10)
    User.findOneAndUpdate({"userName":req.body.userName}, {

     $set:{
        userPass:userPass=(req.body.userPass=passHasheado)
     }
 })

    .then(respuesta =>{
        if(!respuesta){
            return res.json({success:false, response:'non-existent user'})
        }
        else{
            return res.json({success:true, response:respuesta})
        }
    })
    .catch(error=>{
        return res.json({success:false, response:error})
    })  

}
}
module.exports = emailController