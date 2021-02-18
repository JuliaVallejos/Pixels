const Game = require('../models/Game')
const GameController ={
    addGame: async (req, res) =>{
        var prom = 0
        const {gameImg, gameTitle, gameCategories, gameInfo, valoration,userComments,clasificationPEGI,idUser}=req.body
  
        const createGame= new Game({
            gameImg, gameTitle, gameCategories, gameInfo, valoration, userComments,clasificationPEGI,idUser
        })
        createGame.save()
        .then( async savedGame =>{
           const game = await savedGame.populate('idUser')
            
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
    gameForId:(req, res)=>{
       const  id=req.params.idGame
        Game.find({"_id":id})
        .then(respuesta=>{
            return res.json({success:true, response:respuesta})
        })
        .catch(error=>{
            return res.json({success:false, response:error})
        })
    }
}




module.exports = GameController