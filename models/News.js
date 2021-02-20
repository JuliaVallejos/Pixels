
const mongoose = require('mongoose')

const newsSchema = new mongoose.Schema({

    newsTitle :{type: String, required: true},
    newsImg: {type: String, required: true},
    newsDescription: {type:String, required: true},
    newsBody: {type: String, required: true},
    newsAuthor: {type:String, required: true},
    newsDate:{type:Date, default: Date.now}
})
const News = mongoose.model('news',newsSchema)

module.exports =News