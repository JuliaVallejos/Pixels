const initialState ={
    gamesList: [],  
    categories: ["Horror","Action","RPG","Adventure","Survival","Arcade","Shooter","MOBA"]

}
 function gamesReducer(state= initialState,action){
    switch (action.type) {
        case 'ALL_GAMES':
           
            
        return{
            ...state,
            gamesList:action.payload,
            newGamesList:action.payload
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
        
        default:
            return state

}}

export default gamesReducer
