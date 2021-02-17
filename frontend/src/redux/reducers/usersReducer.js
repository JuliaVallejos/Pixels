const initialState ={
    loggedUser:null,
}

function usersReducer(state= initialState,action){
    switch (action.type) {
        case 'LOGIN':
            localStorage.setItem("userFirstName",action.payload.response.userFirstName);
            localStorage.setItem("token",action.payload.response.token);
            localStorage.setItem("id",action.payload.response.id);
            localStorage.setItem("userImg",action.payload.response.userImg);
            localStorage.setItem("userRol",action.payload.response.userRol);

            return {
                ...state,
                loggedUser:action.payload,
            }
            break;
        case 'LOG_OUT':
            localStorage.clear();
            return {
                ...state,
                loggedUser:null
            }
            break;
        default:
            return state;
}}

export default usersReducer;
