
const initialState ={
    gamesList:[],
    gameById:{},
    loading:false,
    newGamesList:[],
    mostValuedList:[],
    categories:[
        {name:"Horror",img:'https://images8.alphacoders.com/827/thumb-1920-827457.jpg'},
        {name:"Action",img:'https://miro.medium.com/max/3400/1*V2dd0ty7jnMaq_swEGZNuw.jpeg'},
        {name:"RPG",img:'https://images3.alphacoders.com/219/thumb-1920-219847.jpg'},
        {name:"Adventure",img:'https://1.bp.blogspot.com/-GzD0hMIhIIM/W5gJn6UPdcI/AAAAAAAAOx8/5hhc-azFinkQxcOuwWBoG-y4Z7bhhy0vACLcBGAs/s1600/shadowofthetombraider-5826c8c2a86d347c85d481597fd035a6-1200x600.jpg'},
        {name:"Survival",img:'https://pbs.twimg.com/media/Cw7DP4KWQAAf37-.jpg'},
        {name:"Arcade",img:'https://www.xtrafondos.com/wallpapers/resoluciones/20/chico-jugando-en-arcade_1920x1080_6342.jpg'},
        {name:"Shooter",img:'https://dmarket.com/blog/best-csgo-wallpapers/cs-go-wallpaper_hub6d22fdcaa8629b6f1a6781f6a106093_183473_1920x1080_resize_q75_lanczos.jpg'},
        {name:"MOBA",img:'https://i.pinimg.com/originals/6f/93/50/6f93508f78319faf2a9929632b3fc041.jpg'}]
}

 function gamesReducer(state= initialState,action){
     function getProm(game){
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
            const newGameChanged= getProm(action.payload)
           
                return {
                    ...state,
                    loading:false,
                    newGamesList: state.newGamesList,
                    gameById: newGameChanged
                }
            
        case "GAMEBYID":

            var newGame= getProm(action.payload)
            
            return{
                ...state,
                gameById:newGame
            }
        default:
            return state
    }
}
export default gamesReducer