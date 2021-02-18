var nodemailer = require('nodemailer')
const emailController = {
    sendEmail: (req, res) =>{
        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                type: 'OAuth2',
                user: 'user@example.com',
                accessToken: 'ya29.Xx_XX0xxxxx-xX0X0XxXXxXxXXXxX0x'}
        })
        var mailOptions = {
            from: "Remitente",
            to: "jorte.03@gmail.com",
            subject:"Enviado desde nodemailer",
            text: "Hola Mundo!"
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