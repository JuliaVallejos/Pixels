const initialState ={
    listGames: null
}

function usersReducer(state= initialState,action){
    switch (action.type) {
        case 'ALL_GAMES':
         
        return {
            ...state,
            listGames:action.payload,      
        }
    
        default:
            return state
}}
export default usersReducer