import {Link} from "react-router-dom";
const RecommendedGame = ({game:{gameTitle,gameImg,_id}}) =>{ 
    
    return(
        <Link to={`/games/${_id}`}>
        <div id="cardPadreRecommend" className="justifyCenter">  
            <div className="bordesRecommend estiloCardItRecommend estiloCardRecommend cardHijoRecommend justifyFlexEnd" 
            style={{ backgroundImage: `url("/gamesImages/${gameImg}")` }}>
                <div className="Recommend">
                    <div className="justifyCenter tituloRecommended">
                        <h5>{gameTitle}</h5>
                    </div>
                </div>
            </div>
        </div>    
        </Link>
    )
    }
    
    export default RecommendedGame