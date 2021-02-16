const express = require("express");
const router= express.Router();
const validator=require("../controllers/validator");
const passport= require("passport");
require("../config/passport");
const userController=require("../controllers/userController");

// RUTAS PARA USUARIOS
router.route("/user/signUp")
    .post(userController.signUp)
    // .post(validator.validateNewAccount,userController.signUp) SIGN UP CON JOI
router.route("/user/logIn")
    .post(userController.logIn)
// RUTAS PARA VIDEOJUEGOS


module.exports=router;