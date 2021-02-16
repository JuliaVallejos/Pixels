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
        
        default:
            return state

}}

export default gamesReducer
