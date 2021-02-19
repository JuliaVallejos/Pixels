import {connect} from 'react-redux'
import newsActions from "../redux/actions/newsActions"
import {useEffect} from "react"
import {Link} from 'react-router-dom'

const News = (props) => {
    useEffect(() => {
        props.mostrarNews()
    },[])
    
    return(
        <>
       {props.news && (props.news).map(article=> {
           return(
            <Link to={`/news/${article._id}`}>
               <div className="centerCenter ">
               
               <div className="cajaNoticia zoom">
                
                
                <div className="imgNo{}ticia boxBackNoticia" style={{backgroundImage: `url(/newsImages/${article.newsImg})`}}>                 
                {article.newsDate}</div>
                <div className="boxBackTitulo ">
                    <div className="paddingTexto">
                        <h1 className="tituloArticle ">{article.newsTitle}</h1>
                        <h3>{article.newsDescription}</h3>
                    </div>
                </div>
                
               </div>
               
               </div>
               </Link>
              
           )
       } )}
      
        
        </>

    )
}


const mapStateToProps = state => {
    return {
        news: state.news.news
        
    }
  } 
  
  const mapDispatchToProps = { 
    mostrarNews: newsActions.allNews,
    
  } 

export default connect(mapStateToProps, mapDispatchToProps)(News);