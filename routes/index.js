const express = require("express");
const router= express.Router();
const GameController = require('../controllers/GameController')
const newsController= require('../controllers/newsController')
const validator=require("../controllers/validator");
const passport= require("passport");
require("../config/passport");

// RUTAS PARA USUARIOS


const userController=require("../controllers/userController");

// RUTAS PARA USUARIOS
router.route("/user/signUp")
    .post(validator.validateNewAccount,userController.signUp)
router.route("/user/logIn")
    .post(userController.logIn)
// RUTAS PARA VIDEOJUEGOS
router.route('/games')
.get(GameController.allGames)
.post(GameController.addGame)
//ruta para noticia 
router.route("/news")
.post(newsController.addNews)


module.exports=router;