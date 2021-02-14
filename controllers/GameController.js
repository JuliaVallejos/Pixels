const Game = require('../models/Game')
const GameController ={
    addGame: async (req, res) =>{
        console.log(req.body)
        const {gameImg, gameTitle, gameCategory, gameInfo, valoration, userComment,clasificationPEGI,idUser}=req.body
        const createGame= new Game({
            gameImg, gameTitle, gameCategory, gameInfo, valoration, userComment,clasificationPEGI,idUser
        })
        createGame.save()
        .then( async savaedGame =>{
            const game = await savaedGame.populate('idUser')

            return res.json({success:true, response: game})
        })
        .catch(error=>{
            return res.json({success:false, response: error})
        })
    }
}




module.exports = GameController