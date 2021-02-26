const { populate } = require('../models/Game');
const Game = require('../models/Game')
const errors =[]
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
        var imgPath= `${__dirname}/../client/build/gamesImages/${createGame._id}.${imgType}`


        await gameFile.mv(imgPath,error=>{
            if(error){
               
                errors.push(error)}
            else{console.log("Todo OK")}
        })
        
        createGame.gameImg=imgName;

        createGame.save()
         
        .then( async savedGame =>{
           const game = await savedGame.populate('idUser').populate('userComments.idUser').execPopulate() 
             
            return res.json({success:true, response: game})
        })
        .catch(error=>{
            return res.json({success:false, response: error})
        })
    },

    allGames: (req, res)=>{
      
        Game.find().populate('idUser').populate('userComments.idUser')
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

        Game.findOne({'_id':id}).populate('idUser').populate('userComments.idUser')

        .then(respuesta=>{
            return res.json({success:true, response:respuesta})
        })
        .catch(error=>{
            return res.json({success:false, response:error})
        })
    },

    addCommentsGames: (req, res)=>{
           const idUser = req.user._id
           const {comment}=req.body
           const id=req.params.idGame

           Game.findOneAndUpdate({_id:id}, {
            $push:{
             "userComments":{idUser:idUser, comment:comment}
            }
            
        },
        {new: true}
        ).populate('userComments.idUser').populate("idUser")

        .then(respuesta =>{
            return res.json({success:true, response:respuesta})
        })
        .catch(error=>{
     
            return res.json({success:false, response:error})
        })  
    },
    
    editComment: (req, res)=>{
       
        const idGame= req.params.idGame
        const idComment=req.params.idComment
        const editedComment = req.body.editedComment
 
       Game.findOneAndUpdate({_id:idGame,'userComments._id':idComment},{ $set: {'userComments.$.comment':editedComment}},{new:true}).populate('idUser').populate('userComments.idUser')
        .then( response => {

            res.json({success:true,message:'Comment edited',response})})
        .catch(error => res.json({success:false,error}))
    }, 
    
    deleteComment: (req, res)=>{

        const idGames= req.params.idGame
        const idComment = req.params.idComment

        Game.findByIdAndUpdate({_id: idGames},{
            $pull:{
                userComments:{_id:idComment}
            }
        },{new:true}).populate('idUser').populate('userComments.idUser')
        .then(respuesta=>{
            return res.json({success:true, response:respuesta, message:"delete comment"})
        })
        .catch(error=>{
            return res.json({success:false, response:error})
        })

    },
    setValoration: (req,res) =>{
        const idGame= req.params.idGame
        const {idUser,valoration} = req.body
        const newVal ={idUser,valoration}
      
        if(req.body.edit){
            Game.findOneAndUpdate({_id:idGame,'valoration.idUser':idUser},{ $set: {'valoration.$.valoration':valoration}},{new:true}).populate('userComments.idUser').populate("idUser")
             .then(respuesta =>{
                return res.json({success:true, response:respuesta})
            })
            .catch(error=>{
                return res.json({success:false, response:error})
            })
            }else{
        Game.findOneAndUpdate({_id:idGame}, {$push:{valoration:newVal} },{new:true}).populate('userComments.idUser').populate("idUser")
        .then(respuesta =>{
            return res.json({success:true, response:respuesta})
        })
        .catch(error=>{
            return res.json({success:false, response:error})
        })   }
    

    }

  
}


module.exports = GameController