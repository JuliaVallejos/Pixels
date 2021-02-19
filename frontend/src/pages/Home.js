import HomeNews from '../components/HomeNews'
import RecommendedGame from '../components/RecommendedGame'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {useEffect} from 'react'
import gamesActions from '../redux/actions/gamesActions'

const Home = (props) =>{

    const {loggedUser,allGames,newGamesList,mostValued,mostValuedList} = props
    useEffect(() => {
     getGames()
    }, [])
   
    const getGames = async () =>{
         const data = await allGames()
         if (data){
             mostValued()
         }
    }
    return (
        <> 
            <div className="homeContainer">
                {console.log(mostValuedList)}
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
                    <HomeNews/>  
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
        loggedUser:state.user.loggedUser,
        newGamesList:state.game.newGamesList,
        mostValuedList:state.game.mostValuedList

    }
}
const mapDispatchToProps = {
    allGames:gamesActions.allGames,
    mostValued: gamesActions.mostValued
}
export default connect(mapStateToProps,mapDispatchToProps)(Home)