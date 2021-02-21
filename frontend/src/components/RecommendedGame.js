const RecommendedGame = ({game}) =>{ 
    
    return(
        <div id="cardPadreRecommend" className="justifyCenter">  
            <div className="bordesRecommend estiloCardItRecommend estiloCardRecommend cardHijoRecommend justifyFlexEnd" style={{ backgroundImage: `url("/gamesImages/${game.gameImg}")` }}>
                <div className="Recommend">
                    <div className="justifyCenter tituloRecommended">
                        <h5>{game.gameTitle}</h5>
        {/* <div className="displayFlex justifyAround" id="recommendedHomeContainer">
            <div>
                <div id="cardPadreRecommend" className="justifyCenter">  
                    <div className="bordesRecommend estiloCardItRecommend estiloCardRecommend cardHijoRecommend justifyFlexEnd" style={{ backgroundImage: `url("https://e00-marca.uecdn.es/assets/multimedia/imagenes/2019/07/18/15634789301233.jpg")` }}>
                        <div className="Recommend">
                            <div className="justifyCenter tituloRecommended">
                                <h5>Limbo</h5>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>    
    )
    }
    
    export default RecommendedGame