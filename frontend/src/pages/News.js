import {connect} from 'react-redux'
import newsActions from "../redux/actions/newsActions"
import {useEffect} from "react"

const News = (props) => {
   console.log(props.news)
    useEffect(() => {
        props.mostrarNews()
    },[])
    if (!props.news){return <h2>loading...</h2> }
    return(
        <>
       {props.news && (props.news).map(article=> {
           return(
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