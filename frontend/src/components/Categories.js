import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const Categories = ({categories}) =>{ 
    return (
        <div className="justifyAround padre">
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
         
}

const mapStateToProps = state =>{
    return{
        categories:state.game.categories
    }
}
export default connect(mapStateToProps)(Categories)