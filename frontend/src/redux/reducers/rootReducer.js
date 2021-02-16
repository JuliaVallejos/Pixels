import { combineReducers } from "redux"
import gamesReducer from "./gamesReducer"
import usersReducer from './usersReducer'
const rootReducer = combineReducers({
<<<<<<< HEAD
    user: usersReducer 
=======
    
    user: usersReducer,
    game:gamesReducer
>>>>>>> 9e796a7fd41fc74714ef2290da3aa8cfa4272643
 
})

export default rootReducer