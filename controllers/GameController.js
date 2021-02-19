const Game = require('../models/Game')

const GameController ={
    addGame: async (req, res) =>{
        var prom = 0
        const {gameTitle, gameCategories, gameInfo, valoration, userComments, clasificationPEGI, idUser}=req.body

        const {gameFile} = req.files;

        const imgType = gameFile.name.split(".").slice(-1).join(" ");

        const createGame = new Game({
            gameTitle, gameCategories, gameInfo, valoration, userComments,clasificationPEGI,idUser
        })
        var imgName= `${createGame._id}.${imgType}`
        var imgPath= `${__dirname}/../frontend/public/gamesImages/${createGame._id}.${imgType}`


        await gameFile.mv(imgPath,error=>{
            if(error){
                console.log("Todo mal")
                errors.push(error)}
            else{console.log("Todo OK")}
        })
        
        createGame.gameImg=imgName;

        createGame.save()
         

        .then( async savedGame =>{
           const game = await savedGame.populate('idUser').execPopulate() 
           console.log("entró game") 
           console.log(game)         
            return res.json({success:true, response: game})
        })
        .catch(error=>{
            return res.json({success:false, response: error})
        })
    },

    allGames: (req, res)=>{
      
        Game.find()
        .then(respuesta =>{
            return res.json({success: true, response: respuesta})
        })
        .catch(error =>{
            return res.json({success: false, error: error})
        })
    },

    deleteGame:(req,res) =>{
        const idGame= req.params.idGame
        Game.findOneAndDelete({_id:idGame})
        .then(respuesta =>{
            return res.json({success: true, response: respuesta,message:'Game deleted'})
        })
        .catch(error =>{
            return res.json({success: false, error: error})
        })
    
    },
    
    gameById:(req, res)=>{
       const  id=req.params.idGame
        Game.find({'_id':id}).populate('_id')
        .then(respuesta=>{
            return res.json({success:true, response:respuesta})
        })
        .catch(error=>{
            return res.json({success:false, response:error})
        })
    },
    addCommentsGames: (req, res)=>{
           const {idUser, comment}=req.body
           Game.findOneAndUpdate({_id:req.body.id}, {
            $push:{
             userComments:{idUser:idUser, comment:comment}
            }
        })
        .then(respuesta =>{
            return res.json({success:true, response:respuesta})
        })
        .catch(error=>{
            return res.json({success:false, response:error})
        })  
    },
    
    modifyComment: (req, res)=>{
        const {idUser, comment}=req.body
        Game.findByIdAndUpdate({_id:req.body.id}, {
         $set:{
          userComments:{idUser:idUser, comment:comment}
         }
     })
     .then(respuesta =>{
         return res.json({success:true, response:respuesta})
     })
     .catch(error=>{
         return res.json({success:false, response:error})
     })  
    }, 
    deleteComment: (req, res)=>{
        const idGames= req.params.idgame
        const idComment = req.params.idcomment
        Game.findByIdAndUpdate({_id: idGames},{
            $pull:{
                userComments:{_id:idComment}
            }
        })
        .then(respuesta=>{
            return res.json({success:true, response:respuesta, message:"delete comment"})
        })
        .catch(error=>{
            return res.json({success:false, response:error})
        })

    }

  
}


module.exports = GameController