
 const initialState={
        news:[]
    }

 function newsReducer (state=initialState, action) {
     switch (action.type) {
         case "NEW_NEWS":
             return{
                 ...state,
                 news: [...state.news,action.payload]
             }
             break
             case "ALL_NEWS":
                var lastNews=action.payload.sort((a,b)=>b.newsDate>a.newsDate? 1:-1)
                
                 return{
                     ...state,
                     news: lastNews
                 }
                 break
                 case "NEWSBYID":
                     return{
                        ...state,
                        news:action.payload
                     }
         default:
             return state
             
     }
     
 } 

 export default newsReducer