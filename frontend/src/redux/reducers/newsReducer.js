
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
                return{
                    news: action.payload.sort((a,b)=>b.newsDate>a.newsDate? 1:-1)
                }
                break
            case "NEWSBYID":
                console.log(action.payload)
                return{
                    ...state,
                    newsById:action.payload
                }
        default:
            return state
    }
     
 } 
 export default newsReducer