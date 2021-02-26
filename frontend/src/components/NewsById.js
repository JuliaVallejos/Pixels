import { connect } from "react-redux"
import {useEffect} from "react"
import newsActions from "../redux/actions/newsActions"
import {Link} from 'react-router-dom'
import { BiNews } from 'react-icons/bi'
import Loader  from './Loader'


const NewsById = (props) =>{



useEffect(()=>{
    const {id}= props.match.params
    props.newsById(id)
},[])

  useEffect(() => {
    window.scrollTo(0, 0)
    }, [])
   
    return(
    <div className="justifyCenter cajaPadreNoticia">

    {props.newsId ?
    <div className="cajaNoticias">
        
        <div className="tituloDescripcion">
            <h1 className="singleNewsTitle uppercase">{props.newsId.newsTitle}</h1>
            {props.newsId.newsDescription && <h3 className="singleNewsDescription">{props.newsId.newsDescription}</h3>}
        </div>
        
        <div className="portadaSingleNews" style={{backgroundImage:`url("/newsImages/${props.newsId.newsImg}")`}}></div>


        <div className="justifyBetween subtitulo uppercase">
            <h4>Author: {props.newsId.newsAuthor}</h4>
            <h4>Posted on: {props.newsId.newsDate.slice(0,10)}</h4>
        </div>
        
        <div className="parrafoNoticia ">
            <h2>{props.newsId.newsBody}</h2>
        </div>

        <div className="justifyCenter">
            <Link to="/news">
                <div className="caja centerCenter backGames zoom " >
                    <div className="iconPaypal centerCenter">
                        <BiNews/>
                    </div>
                <h3>BACK TO ALL NEWS</h3>
                </div>
            </Link>
        </div>
    </div>

                

    : <Loader></Loader>}
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