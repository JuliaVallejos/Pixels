const express = require("express");
const router= express.Router();
const GameController = require('../controllers/GameController')
const validator=require("../controllers/validator");
const passport= require("passport");
require("../config/passport");

// RUTAS PARA USUARIOS



// RUTAS PARA VIDEOJUEGOS
router.route('/games')
.post(GameController.addGame)


module.exports=router;