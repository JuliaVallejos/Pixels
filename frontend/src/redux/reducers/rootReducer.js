import { combineReducers } from "redux"
import gamesReducer from "./gamesReducer"
import newsReducer from "./newsReducer"
import usersReducer from './usersReducer'

const rootReducer = combineReducers({
    
    user: usersReducer,
    game: gamesReducer,
    news:newsReducer
 
})

export default rootReducer