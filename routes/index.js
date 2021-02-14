const express = require("express");
const router= express.Router();
const validator=require("../controllers/validator");
const passport= require("passport");
require("../config/passport");
const userController=require("../controllers/userController");

// RUTAS PARA USUARIOS
router.route("/user/signUp")
    .post(validator.validateNewAccount,userController.signUp)
router.route("/user/logIn")
    .post(userController.logIn)
    //hola
// RUTAS PARA VIDEOJUEGOS


module.exports=router;