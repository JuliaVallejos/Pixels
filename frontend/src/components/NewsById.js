import { connect } from "react-redux"
import {useEffect} from "react"
import newsActions from "../redux/actions/newsActions"


const NewsById = (props) =>{



useEffect(()=>{
    const {id}= props.match.params
    props.newsById(id)
},[])
    



return(
<div className="justifyCenter cajaPadreNoticia">

{props.newsId ?
<div className="cajaNoticias">
    
    <div className="tituloDescripcion">
        <h1 className="singleNewsTitle uppercase">{props.newsId.newsTitle}</h1>
        <h3 className="singleNewsDescription">{props.newsId.newsDescription}</h3>
    </div>
    
    <div className="portadaSingleNews" style={{backgroundImage:`url("/newsImages/${props.newsId.newsImg}")`}}></div>


    <div className="justifyBetween subtitulo uppercase">
        <h4>Author: {props.newsId.newsAuthor}</h4>
        <h4>Posted on: {props.newsId.newsDate.slice(0,10)}</h4>
    </div>
    
    <div className="parrafoNoticia ">
        <h2>{props.newsId.newsBody}</h2>
    </div>




</div>

            

: <h1> Cargando...</h1> }
</div>
)
}


const mapStateToProps =state=>{
    return {
        newsId: state.news.newsById
    }
}
const mapDispatchToProps={
    newsById: newsActions.newsById,
    allNews: newsActions.allNews
    
}
export default connect (mapStateToProps, mapDispatchToProps)(NewsById)