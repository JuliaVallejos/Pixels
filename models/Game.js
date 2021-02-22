const mongoose = require('mongoose')

const GameSchema = new mongoose.Schema({
    gameImg: {type: String, required:true},
    gameTitle: {type: String, required: true},
    gameCategories:[String],
    gameInfo: {type:String},

    valoration: {type:[{
        idUser: {type:mongoose.Schema.ObjectId, ref:'user', required:true},
        valoration: {type:Number , required:false, default:0},
    }]},

    prom:Number,
    userComments: {type:[{
        idUser: {type:mongoose.Schema.ObjectId, ref:'user'},
        comment: String
    }]},
    clasificationPEGI: {type:Number},
    
    idUser: {type:mongoose.Schema.ObjectId, ref:'user'}
    
})

const Game = mongoose.model('game',GameSchema)
module.exports =Game