const express = require("express");
const router= express.Router();
const GameController = require('../controllers/GameController')
const newsController= require('../controllers/newsController')
const validator=require("../controllers/validator");
const passport= require("passport");
require("../config/passport");
const userController=require("../controllers/userController");


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
.get(GameController.gameForId)

//ruta para noticia 
router.route("/news")
.post(newsController.addNews)
.get(newsController.allNews)

router.route("/news/:idNews")
.delete(newsController.deleteNews)
.get(newsController.newsForId)


module.exports=router;