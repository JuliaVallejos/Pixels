
 const initialState={
        news:[]
    }

 function newsReducer (state=initialState, action) {
     switch (action.type) {
         case "NEW_NEWS":
             return{
                 ...state,
                 news: action.payload
             }
         default:
             return state
             
     }
     
 } 

 export default newsReducer