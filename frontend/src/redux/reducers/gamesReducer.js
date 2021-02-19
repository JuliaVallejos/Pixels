const initialState ={
    gamesList:[],
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
          
            var prom = 0
            var newPayload= action.payload.map(game =>{
             
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
        case 'CHANGES':
         
            return {
                ...state,
                loading:false,
                newGamesList: state.newGamesList.map(game=> game._id===action.payload._id ? game=action.payload : game)
             
            }
            break
            case "GAMEBYID":
                return{
                    ...state,
                    gamesList:action.payload
                }
        
        default:
            return state

}}

export default gamesReducer
