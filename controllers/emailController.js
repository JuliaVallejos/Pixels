require('dotenv').config()
var nodemailer = require('nodemailer')
const User = require('../models/User')
const bcrypt=require("bcryptjs")
const emailController = {

    sendEmail: (req, res) =>{
        console.log(req.body)
        var transporter = nodemailer.createTransport({
            port: 465,
            host: 'smtp.gmail.com',
            auth: {
                user: 'proyectopixels0@gmail.com',
                pass: 'pixels123'
            },
            tls: {
                  rejectedUnauthorized:false
                } 
        })
        
        const email=req.body.userName
        
        var mailOptions = {
            from: 'proyectopixels0@gmail.com <don`t reply>',
            to: email,
            subject:"Welcome to Pixels!",
            html: `<div style="text-align:center; padding:20px; min-heigth: 250px; background-color:#11050F">
                        <h1 style="color:#FFB5FF">Hi! Greetings from Pixels!</h1>
                        <link href="http://localhost:3000/passwordReset/${email}"></link>
                    </div>`
        }
        transporter.sendMail(mailOptions, (error, info) =>{
            if(error){
                console.log(error)
                res.status(500).send(error.message)
            }else {
                console.log("Email enviado.")
                res.status(200).json(req.body)
            }
        })
    },
    resetPassword: (req,res)=> {
        var transporter = nodemailer.createTransport({
            port: 465,
            host: 'smtp.gmail.com',
            auth: {
                user: 'proyectopixels0@gmail.com',
                pass: 'pixels123'
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
    console.log(req.body)
    const passHasheado= await bcrypt.hashSync(req.body.userPass,10)
    console.log(passHasheado)
    User.findOneAndUpdate({'userName':req.body.userName}, {
     $set:{
        userPass:userPass=(req.body.userPass=passHasheado)
     }
 })

 .then(respuesta =>{
     return res.json({success:true, response:respuesta})
 })
 .catch(error=>{
     return res.json({success:false, response:error})
 })  

}
}
module.exports = emailController