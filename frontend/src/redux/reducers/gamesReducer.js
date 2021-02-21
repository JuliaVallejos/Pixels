
const initialState ={
    gamesList:[],
    gameById:{},
    loading:false,
    newGamesList:[],
    mostValuedList:[],
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
            let prom = 0
            let newGameList1= action.payload.map(game =>{             
                game.valoration.map(() =>{      
                    const sum =game.valoration.reduce((a,b) =>{  
                        return {
                            valoration:(a.valoration+ b.valoration)
                        }
                    }, {valoration: 0})                     
                    prom = game.valoration.length===0? 0 : sum.valoration/game.valoration.length                      
                }) 
                game= {...game,prom:prom}              
                return game                   
            })  
            var mostValuedList1= newGameList1.sort((a,b) => a.prom < b.prom? 1:-1)
            var aux=[]
            mostValuedList1.filter((game,index)=>{
                if(index<3) {aux.push(game)}
            })
        return{
            ...state,
            newGamesList:newGameList1,
            mostValuedList:aux,
            gamesList:action.payload,
        }
        case 'FILTER':
        return {
            ...state,
            newGamesList: state.gamesList.filter(({gameTitle}) => gameTitle.toUpperCase().indexOf(action.payload.toUpperCase().trim())=== 0)
        
        }
        case 'CHANGES':
            console.log(action.payload)
            // const newGameChanged= prom(action.payload)
            const newGameChanged= action.payload
                return {
                    ...state,
                    loading:false,
                    newGamesList: state.newGamesList,
                    gameById: newGameChanged
                }
            
        case "GAMEBYID":

            // var newGame= prom(action.payload)
            var newGame= action.payload
            return{
                ...state,
                gameById:newGame
            }
        default:
            return state
    }
}
export default gamesReducer