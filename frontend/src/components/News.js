import { connect } from "react-redux"
import newsActions from "../redux/actions/newsActions"
import {useEffect} from "react"

const News = (props) =>{ 

    useEffect(()=>{
        props.allNews()
    },[])
  
    console.log(props.news)
    return (
        <>
        {props.news.map(oneNews=>{
            return(
                <h6>{oneNews.newsTitle}</h6>
            )
        })}
        </>
    )
}
const mapStateToProps = state =>{
    return {
        news: state.news.news
    }
}
const mapDispatchToProps={
    allNews: newsActions.allNews
}
export default connect(mapStateToProps, mapDispatchToProps) (News)