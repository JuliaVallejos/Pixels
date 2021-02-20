
const initialState ={
    gamesList:[],
    loading:false,
    newGamesList:[],
    categories:[
        {name:"Horror",img:'https://www.xtrafondos.com/wallpapers/resoluciones/20/chico-jugando-en-arcade_1920x1080_6342.jpg'},
        {name:"Action",img:'https://miro.medium.com/max/3400/1*V2dd0ty7jnMaq_swEGZNuw.jpeg'},
        {name:"RPG",img:'https://miro.medium.com/max/3400/1*V2dd0ty7jnMaq_swEGZNuw.jpeg'},
        {name:"Adventure",img:'https://miro.medium.com/max/3400/1*V2dd0ty7jnMaq_swEGZNuw.jpeg'},
        {name:"Survival",img:'https://miro.medium.com/max/3400/1*V2dd0ty7jnMaq_swEGZNuw.jpeg'},
        {name:"Arcade",img:'https://www.xtrafondos.com/wallpapers/resoluciones/20/chico-jugando-en-arcade_1920x1080_6342.jpg'},
        {name:"Shooter",img:'https://miro.medium.com/max/3400/1*V2dd0ty7jnMaq_swEGZNuw.jpeg'},
        {name:"MOBA",img:'https://images5.alphacoders.com/104/thumb-1920-1046767.jpg'}]
}

 function gamesReducer(state= initialState,action){
    switch (action.type) {
        case 'ALL_GAMES':
          
            let prom = 0
            let newPayload= action.payload.map(game =>{             
               game.valoration.map(() =>{      
                   const sum =game.valoration.reduce((a,b) =>{  
                           return {
                           valoration: (a.valoration+ b.valoration)
                           }
                       }, {valoration: 0})                     
                      prom = game.valoration.length===0? 0 : sum.valoration/game.valoration.length                      
                       }) 
                   game= {...game,prom:prom}              
                   return game                   
                   })            
        return{
            ...state,
            gamesList:action.payload,
            newGamesList:newPayload
                }
        
        case 'FILTER':
         
        return {
            ...state,
            newGamesList: state.gamesList.filter(({gameTitle}) => gameTitle.toUpperCase().indexOf(action.payload.toUpperCase().trim())=== 0)
        
        }
        case "GAMEBYID":
               
                
                return{
                    ...state,
                    gameById:action.payload
                }
        case 'CHANGES':
           
            let sum =action.payload.valoration.reduce((a,b) =>{  
                return {
                valoration: (a.valoration+ b.valoration)
                }
            }, {valoration: 0})
          
              let promed = action.payload.valoration.length===0? 0 : sum.valoration/action.payload.valoration.length
                    
              let newPayloadID= {...action.payload,prom:promed}
                
            var newGamesList1 = state.newGamesList.map(game=> game._id===action.payload._id ? game=action.payload : game)

            return {
                
                ...state,
                loading:false,
                newGamesList: newGamesList1,
                gameById: action.payload
            }
            break
            case "GAMEBYID":
                return{
                    ...state,
                    gameById:action.payload
                }
                // gameById:newPayloadID
            
            break
            
            case "MOST_VALUED":

                return{
                    ...state,
                    mostValuedList:action.payload
                }
        default:
            return state

}}

export default gamesReducer
