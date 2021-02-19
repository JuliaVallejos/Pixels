import { connect } from "react-redux"
import {useEffect} from "react"
import newsActions from "../redux/actions/newsActions"


const NewsById = (props) =>{



useEffect(()=>{
    const {id}= props.match.params
    props.newsById(id)
},[])
    



return(
<>

{props.news ?
<div>
<h1>{props.news.newsTitle}</h1>

<div className="portadaSingleGame" style={{backgroundImage:`url(${props.news.newsImg})`}}></div>
</div>
            

: <h1> Cargando...</h1> }
</>
)
}


const mapStateToProps =state=>{
    return {
        news: state.news.newsById
    }
}
const mapDispatchToProps={
    newsById: newsActions.newsById,
    allNews: newsActions.allNews
    
}
export default connect (mapStateToProps, mapDispatchToProps)(NewsById)