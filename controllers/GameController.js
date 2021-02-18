const Game = require('../models/Game')

const GameController ={
    addGame: async (req, res) =>{
        var prom = 0
        const {gameTitle, gameCategories, gameInfo, valoration,userComments,clasificationPEGI,idUser}=req.body
        const {gameFile}= req.files;

        // console.log(gameFile)

        const imgType= gameFile.name.split(".").slice(-1).join(" ");


        const createGame= new Game({
            gameTitle, gameCategories, gameInfo, valoration, userComments,clasificationPEGI,idUser
        })

        var imgPath= `${__dirname}/../frontend/public/gamesImages/${createGame._id}.${imgType} `

        console.log("hola")

        await gameFile.mv(imgPath,error=>{
            if(error){
                console.log("Todo mal")
                errors.push(error)}
            else{console.log("Todo OK")}
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
    
    }
}




module.exports = GameController