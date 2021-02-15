const News = require('../models/News')

const newsController ={
    addNews : (req,res)=>{
       const {newsTitle, newsImg, newDescription, newsBody, newsAuthor,dateOfTheNews} = req.body 
       const creatNews =  new News ({
        newsTitle, newsImg, newDescription, newsBody, newsAuthor,dateOfTheNews
       })
       creatNews.save()
       .then(savedNews=>{
           return res.json({success:true, response:savedNews})
       })
       .catch(error =>{
           return res.json({success: false, response: error})
       })
    },
    allNews : (req, res)=>{
        News.find()
        .then(news =>{
            return res.json({success: true, response:news})
        })
        .catch(error =>{
            return res.json({success:false, response:error})
        })
    }
}
module.exports = newsController