
const initialState={
    news:[],
    latestNews:[]
}

function newsReducer (state=initialState, action) {
    switch (action.type) {
        case "NEW_NEWS":
            return{
                ...state,
                news: [...state.news,action.payload],
                latestNews: state.news.splice(0,4)
            }
            break
            case "ALL_NEWS":
                return{
                    ...state,
                    news: action.payload.sort((a,b)=>b.newsDate>a.newsDate? 1:-1),
                    latestNews: state.news.splice(0,4)
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