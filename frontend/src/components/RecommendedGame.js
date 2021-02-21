const RecommendedGame = ({gameImg,gameTitle}) =>{ 
    console.log(gameTitle)
    return(
        <div id="cardPadreRecommend" className="justifyCenter">  
            <div className="bordesRecommend estiloCardItRecommend estiloCardRecommend cardHijoRecommend justifyFlexEnd" style={{ backgroundImage: `url("/gamesImages/${gameImg}")` }}>
                <div className="Recommend">
                    <div className="justifyCenter tituloRecommended">
                        <h5>{gameTitle}</h5>
                    </div>
                </div>
            </div>
        </div>    
    )
    }
    
    export default RecommendedGame