const express = require("express");
const router= express.Router();
const { Router } = require("express");
const GameController = require('../controllers/GameController')
const newsController= require('../controllers/newsController')
const validator=require("../controllers/validator");
const passport= require("passport");
require("../config/passport");
const userController=require("../controllers/userController");
const emailController= require('../controllers/emailController');


// RUTAS PARA USUARIOS
/*.post(userController.signUp) */
router.route("/user/signUp")
.post(validator.validateNewAccount,userController.signUp)
router.route("/user/logIn")
.post(userController.logIn)
    
router.route("/user/logInLS")
.post(passport.authenticate("jwt",{session:false}),userController.logInLS)

// RUTAS PARA VIDEOJUEGOS
router.route('/games')
.get(GameController.allGames)
.post(GameController.addGame)

router.route('/games/:idGame')
.delete(GameController.deleteGame)
.get(GameController.gameById)
.post(passport.authenticate("jwt",{session:false}),GameController.addCommentsGames)

router.route('/valoration/:idGame')
.post(GameController.setValoration)
//ruta para noticia 
router.route("/news")
.post(newsController.addNews)
.get(newsController.allNews)

router.route("/news/:idNews")
.delete(newsController.deleteNews)
.get(newsController.newsById)

//comentario
router.route('/comments')

router.route('/games/:idGame/:idComment')
.delete(GameController.deleteComment)
.put(GameController.editComment)

/* ruta para envío de emails */
router.route('/contact/send')
// .post(validator.validateEmail,emailController.sendEmail)
.post(validator.validateEmail,emailController.sendEmail)

//ruta para recuperar contraseña 
router.route('/recoverPassword')
.post(validator.validateNewPass,emailController.recoverPassword)

module.exports=router;