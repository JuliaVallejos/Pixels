const RecommendedGame = ({game}) =>{ 
    
    return(

        <div className="displayFlex justifyAround" id="recommendedHomeContainer">
            <div>
                <div id="cardPadreRecommend" className="justifyCenter">  
                    <div className="bordesRecommend estiloCardItRecommend estiloCardRecommend cardHijoRecommend justifyFlexEnd" style={{ backgroundImage: `url("https://e00-marca.uecdn.es/assets/multimedia/imagenes/2019/07/18/15634789301233.jpg")` }}>
                        <div className="Recommend">
                            <div className="justifyCenter tituloRecommended">
                                <h5>Limbo</h5>
                            </div>
                        </div>
                    </div>
                </div>   
            </div>
            <div>
                <div id="cardPadreRecommend" className="justifyCenter ">  
                    <div className="bordesRecommend estiloCardItRecommend estiloCardRecommend cardHijoRecommend justifyFlexEnd" style={{ backgroundImage: `url("https://argengamestore.com/wp-content/uploads/2016/02/capsule_616x353-15.jpg")` }}>
                        <div className="Recommend">
                            <div className="justifyCenter tituloRecommended">
                                <h5>Stardew Valley</h5>
                            </div>
                        </div>
                    </div>
                </div>   
            </div>
            <div>
                <div id="cardPadreRecommend" className="justifyCenter ">  
                    <div className="bordesRecommend estiloCardItRecommend estiloCardRecommend cardHijoRecommend justifyFlexEnd" style={{ backgroundImage: `url("https://sm.ign.com/t/ign_es/screenshot/default/ign-ori-wisps-blogroll-a-1583796117460_98yy.1200.jpg")` }}>
                        <div className="Recommend">
                            <div className="justifyCenter tituloRecommended">
                                <h5>ORI AND THE WILL</h5>
                            </div>
                        </div>
                    </div>
                </div>   
            </div>
        </div>
        

    )
    }
    
    export default RecommendedGame