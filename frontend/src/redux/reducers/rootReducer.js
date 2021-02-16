import { combineReducers } from "redux"
import gamesReducer from "./gamesReducer"
import usersReducer from './usersReducer'

const rootReducer = combineReducers({
    
    user: usersReducer,
    game: gamesReducer
 
})

export default rootReducer