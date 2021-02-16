const { string, date } = require('joi')
const mongoose = require('mongoose')

const newsSchema = new mongoose.Schema({

    newsTitle :{type: String, required: true},
    newsImg: {type: String, required: true},
    newDescription: {type:String, required: true},
    newsBody: {type: String, required: true},
    newsAuthor: {type:String, required: true},
    dateOfTheNews:{type:Date, required:true}
})
const News = mongoose.model('news',newsSchema)

module.exports =News