import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const Categories = (props) =>{ 
    const{categories} = props
   
    return (
        <div className="displayFlex justifyAround padre">
            {categories.map((category,index) =>{
                return(
                    <Link key={index}  to={`/categories/${category.name}`}><div id="cardPadreCategory" className="justifyCenter ">  
                        <div className="bordesCategory estiloCardItCategory estiloCardCategory cardHijoCategory justifyFlexEnd" style={{ backgroundImage: `url(${category.img})` }}>
                            <div className="Category ">
                                <div className="tituloCategory textCenter ">
                                    <h5>{category.name}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    </Link>


                )
            })}
        </div>)
            
           /*  <div id="cardPadreCategory" className="justifyCenter ">  
                <div className="bordesCategory estiloCardItCategory estiloCardCategory cardHijoCategory justifyFlexEnd" style={{ backgroundImage: `url("https://www.xtrafondos.com/wallpapers/resoluciones/20/chico-jugando-en-arcade_1920x1080_6342.jpg")` }}>
                    <div className="Category ">
                        <div className="tituloCategory textCenter ">
                            <h5>Arcade</h5>
                        </div>
                    </div>
                </div>
            </div> 

            <div id="cardPadreCategory" className="justifyCenter ">  
                <div className="bordesCategory estiloCardItCategory estiloCardCategory cardHijoCategory justifyFlexEnd" style={{ backgroundImage: `url("https://images5.alphacoders.com/104/thumb-1920-1046767.jpg")` }}>
                    <div className="Category ">
                        <div className="tituloCategory textCenter ">
                            <h5>Online</h5>
                        </div>
                    </div>
                </div>
            </div> 
            <div id="cardPadreCategory" className="justifyCenter ">  
                <div className="bordesCategory estiloCardItCategory estiloCardCategory cardHijoCategory justifyFlexEnd" style={{ backgroundImage: `url("https://miro.medium.com/max/3400/1*V2dd0ty7jnMaq_swEGZNuw.jpeg")` }}>
                    <div className="Category ">
                        <div className="tituloCategory textCenter ">
                            <h5>Action</h5>
                        </div>
                    </div>
                </div>
            </div> 
   

        </div>
    ) */
}

const mapStateToProps = state =>{
    return{
        categories:state.game.categories
    }
}
export default connect(mapStateToProps)(Categories)