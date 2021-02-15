const initialState ={
    loggedUser:null
}

 function usersReducer(state= initialState,action){
    switch (action.type) {
        case 'LOGIN':
         
        return {
            ...state,
            loggedUser:action.payload,      
        }
       
        default:
            return state
}}
export default usersReducer
