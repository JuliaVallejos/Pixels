const RecommendedGame = ({game}) =>{ 
    console.log(game)
    console.log("llego")
    return(
        <div id="cardPadreRecommend" className="justifyCenter">  
            <div className="bordesRecommend estiloCardItRecommend estiloCardRecommend cardHijoRecommend justifyFlexEnd" style={{ backgroundImage: `url("/gamesImages/${game.gameImg}")` }}>
                <div className="Recommend">
                    <div className="justifyCenter tituloRecommended">
                        <h5>{game.gameTitle}123123</h5>
                    </div>
                </div>
            </div>
        </div>    
    )
    }
    
    export default RecommendedGame