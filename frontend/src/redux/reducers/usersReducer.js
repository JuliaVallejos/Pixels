const initialState ={
    loggedUser:null
}

function usersReducer(state= initialState,action){
    switch (action.type) {
        case 'LOGIN':
            localStorage.setItem("userFirstName",action.payload.userFirstName);
            localStorage.setItem("token",action.payload.token);
            localStorage.setItem("userImg",action.payload.userImg);
            localStorage.setItem("userRol",action.payload.userRol);
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
            case 'RECOVERPASSWORD':
                return{
                    ...state,
                    loggedUser:action.payload
                }
                break
                case 'CONTACTEMAIL':
                    return{
                        ...state,
                        loggedUser:action.payload
                    }
        default:
            return state;
}}

export default usersReducer;
