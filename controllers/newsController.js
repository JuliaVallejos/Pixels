const News = require('../models/News')


const newsController ={
    addNews : (req,res)=>{
       const {newsTitle, newsImg, newsDescription, newsBody, newsAuthor,dateOfTheNews} = req.body 
       const creatNews =  new News ({
        newsTitle, newsImg, newsDescription, newsBody, newsAuthor,dateOfTheNews
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
    },
    deleteNews:(req, res) =>{
        const {idNews} = req.params
        News.findOneAndDelete(_id=idNews)
        .then(deletenews =>{
            return res.json({success: true, response: deletenews, message:"delete new"})
        })
        .catch(error =>{
            return res.json({success:false, response: error})
        })
    },
    newsForId: (req, res) =>{
        const id= req.params.idNews
        console.log(id)
        News.find({"_id":id})
        .then(respuesta =>{
            return res.json({success:true, response: respuesta})
        })
        .catch(error =>{
            return res.json({success:false, response: error})
        })
    }
}
module.exports = newsController