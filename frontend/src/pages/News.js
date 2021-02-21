import {connect} from 'react-redux'
import newsActions from "../redux/actions/newsActions"
import {useEffect} from "react"
import {Link} from 'react-router-dom'

const News = (props) => {
    useEffect(() => {
        props.mostrarNews()
    },[])
    if(!props.news){return <h2>loading...</h2> }
    return(
        <>
        <h2 id="newsTitle" className="newsTitle homeTitle centerCenter" style={{backgroundImage: `url(../assets/bricks.jpg)`}}>NEWS</h2>
        <div className="newsSection">
            {props.news && (props.news).map(article=> {
           return(
            <Link to={`/news/${article._id}`}>
                <div className="centerCenter">               
                    <div className="cajaNoticia zoom">
                        <div className="imgNoticia  boxBackNoticia" style={{backgroundImage:`url(/newsImages/${article.newsImg})`}} >               
                            <p>{`Posted: ${article.newsDate.slice(0,10)}`}</p>
                        </div>
                        <div className="boxBackTitulo ">
                            <div className="paddingTexto">
                                <h1 className="tituloArticle ">
                                    {article.newsTitle}
                                </h1>
                                <h3>
                                    {article.newsDescription}
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
               </Link>
                )} )}
        </div>
        </>

    )
}

const mapStateToProps = state => {
    return {
        news: state.news.news,
        latestNews: state.news.latestNews    
    }
  } 
  
  const mapDispatchToProps = { 
    mostrarNews: newsActions.allNews,
    
  } 

export default connect(mapStateToProps, mapDispatchToProps)(News);