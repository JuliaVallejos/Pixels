
var initialState={
    news:[],
    latestNews:[],
    update:false
}

function newsReducer (state=initialState, action) {
    switch (action.type) {
        case "NEW_NEWS":
            var news1=[...state.news]
            news1.push(action.payload)
            news1.sort((a,b)=>{return b.newsDate>a.newsDate? 1:-1})
            var latestNews1=(news1).filter((news,index)=>
            {if(index<4) return news})
            return{
                news: news1,
                latestNews: latestNews1,    
                update: !state.update
            }
            break
            case "ALL_NEWS":
                var news1= action.payload
                var latestNews1=(news1).filter((news,index)=>
            {if(index<4) return news}) 
                return{
                    news:news1,
                    update:state.update,
                    latestNews: latestNews1
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