
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
     function prom(game){
       let prom = 0
  /*       const newPayload= action.payload.map(game =>{   */           
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
     }
     
    switch (action.type) {
        case 'ALL_GAMES':
            const newPayload = action.payload.map(game =>{ 
            return prom(game)})
            console.log(newPayload)
                       
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
            const newGameChanged= prom(action.payload)
            console.log(newGameChanged)

          
                return {
                    
                    ...state,
                    loading:false,
                    newGamesList: state.newGamesList,
                    gameById: newGameChanged
                }
            break
            case "GAMEBYID":
               
                const newGame= prom(action.payload)
                console.log(newGame)
                return{
                    ...state,
                    gameById:newGame
                }
        
            
            break
        case "MOST_VALUED":
            return{
                ...state,
                mostValuedList:action.payload
            }
        default:
            return state
    }
}
export default gamesReducer