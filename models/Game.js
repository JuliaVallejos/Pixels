const mongoose = require('mongoose')

const GameSchema = new mongoose.Schema({
    gameImg: {type: String, required:true},
    gameTitle: {type: String, required: true},
    gameCategory:[String],
    gameInfo: String,
    valoration:[{type:mongoose.Schema.ObjectId, ref:'user'}],
    userComment:[{type:mongoose.Schema.ObjectId, ref:'user', comment: String}],
    clasificationPEGI: Number,
    idUser: {type:mongoose.Schema.ObjectId, ref:'user'}
    
})

const Game = mongoose.model('game',GameSchema)
module.exports =Game