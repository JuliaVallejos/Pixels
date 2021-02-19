import HomeNews from '../components/HomeNews'
import RecommendedGame from '../components/RecommendedGame'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {useEffect} from 'react'
import gamesActions from '../redux/actions/gamesActions'
import newsActions from '../redux/actions/newsActions'

const Home = ({loggedUser,allGames,newGamesList,mostValued,mostValuedList,allNews,latestNews}) =>{
    
    useEffect(() => {
        getGames()
    }, [])
    
    {!latestNews.length && allNews()}

    const getGames = async () =>{
        const data = await allGames()
        if (data){
            mostValued()
        }
    }
    if(latestNews.length===0){return <h1>loading...</h1> }

    return (
        <> 
            <div className="homeContainer">
                <div className="homeHero" style={{backgroundImage: `url("../assets/homeHeader.jpg")`}}>
                    <h1>WELCOME TO PIXELS</h1>
                    <h3>THE PLACE TO GET THE LATEST NEW OF VIDEOGAMES</h3>
                    {loggedUser
                        ?<Link to="/library"><button>Library</button></Link> 
                        :<Link to="/signUp"><button>Sign Up</button></Link>
                    }
                </div>
                <div>
                    <h2 className="homeTitle centerCenter" style={{backgroundImage: `url(../assets/bricks.jpg)`}}>LATEST NEWS</h2>
                    <div id="cardPadre" className="justifyCenter "> 
                    {latestNews.map(news=><HomeNews key={news._id} news={news}/>)}  
                    </div>      
                </div>  
                <div>
                    <h2 className="homeTitle centerCenter" style={{backgroundImage: `url(../assets/bricks.jpg)`}}>RECOMMENDED</h2>
                    <RecommendedGame/>
                </div>
                
            </div>
        </>
    )
}
const mapStateToProps=state=>{
    return{
        latestNews: state.news.latestNews,
        loggedUser: state.user.loggedUser,
        newGamesList: state.game.newGamesList,
        mostValuedList: state.game.mostValuedList
    }
}
const mapDispatchToProps = {
    allGames:gamesActions.allGames,
    mostValued: gamesActions.mostValued,
    allNews: newsActions.allNews
}
export default connect(mapStateToProps,mapDispatchToProps)(Home)