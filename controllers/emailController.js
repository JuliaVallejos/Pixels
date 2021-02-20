var nodemailer = require('nodemailer')
const emailController = {
    sendEmail: (req, res) =>{
        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            auth: {
                user: 'proyectopixels0@gmail.com    ',
                pass: 'pixels123'},
            tls: {
                  rejectedUnauthorized:false
                } 
        })
        const {email,content}=req.body
        console.log(email,content)
        var mailOptions = {
            from: 'proyectopixels0@gmail.com <don`t reply>',
            to: email,
            subject:"Welcome to Pixels!",
            html: `<div style="text-align:center; padding:20px; min-heigth: 250px; background-color:#11050F">
                        <h1 style="color:#FFB5FF">Hi! Greetings from Pixels!</h1>
                        <h2 style="color:#FFFFFF">${content}</h2>
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
    resetPassword: (req,res)=> {
        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            auth: {
                user: 'proyectopixels0@gmail.com    ',
                pass: 'pixels123'},
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
                        <link href="http://localhost:3000/passwordReset/${email}"></link>
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
    }
}
module.exports = emailController