import News from './News'
import RecommendedGame from './RecommendedGame'
import {Link} from 'react-router-dom'

const Home = () =>{
    return (
        <>
            <div className="homeContainer">
                <div className="homeHero" style={{backgroundImage: `url("../assets/homeHeader.jpg")`}}>
                    <h1>WELCOME TO PIXELS</h1>
                    <h3>THE PLACE TO GET THE LATEST NEW OF VIDEOGAMES</h3>
                    <Link to="/signUp"><button>Sign Up</button></Link>
                </div>
                <div>
                    <h2 className="homeTitle centerCenter" style={{backgroundImage: `url(../assets/bricks.jpg)`}}>LATEST NEWS</h2>
                    <News/>  
                </div>  
                <div>
                    <h2 className="homeTitle centerCenter" style={{backgroundImage: `url(../assets/bricks.jpg)`}}>RECOMMENDED</h2>
                    <RecommendedGame/>
                </div>
                
            </div>
        </>
    )
}
export default Home