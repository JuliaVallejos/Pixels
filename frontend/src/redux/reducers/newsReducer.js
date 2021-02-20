
var initialState={
    news:[],
    update:false
}

function newsReducer (state=initialState, action) {
    switch (action.type) {
        case "NEW_NEWS":
            console.log(state.news)
            return{
                news: action.payload,
                update: true
            }
            break
            case "ALL_NEWS":
                return{
                    news: action.payload,
                    update:true
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