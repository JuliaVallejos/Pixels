const News = require('../models/News')


const newsController ={
    addNews : (req,res) =>{
       const {newsTitle, newsDescription, newsBody, newsAuthor,dateOfTheNews} = req.body 
       const {newsImg} = req.files;
       const imgType = newsImg.name.split(".").slice(-1).join(" ");
       var imgPath = `${__dirname}/../frontend/src/newsImages/${newsImg.md5}.${imgType} `

       const createNews =  new News ({
        newsTitle,newsImg:imgPath, newsDescription, newsBody, newsAuthor,dateOfTheNews
       })
       newsImg.mv(imgPath,error=>{
        if(error){
            console.log(error)
            errors.push(error)}
        else{ console.log(newsImg)}
    })
       createNews.save()
       .then(savedNews=>{
           return res.json({success: true, response: savedNews})
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