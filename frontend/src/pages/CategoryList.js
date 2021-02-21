import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Games from '../components/Games'

import {useEffect} from 'react'

import gamesActions from '../redux/actions/gamesActions'


const CategoryList = (props) =>{

    const category= props.match.params.category
    const arrayCategory=props.newGamesList.filter(game => game.gameCategories.indexOf(category)!==-1)
    

    useEffect(() => {
            if(props.newGamesList.length==0){
               props.allGames()
            }
        },[])
    
    return (
            <div className="categorySectionTitle">
                <h2 id="noGameContainer"className="textCenter sectionTitle homeTitle centerCenter" style={{backgroundImage: `url(../assets/bricks.jpg)`}} >{category}</h2><Link to='/library' className="centerCenter seeAllGames"><p>SEE ALL GAMES</p></Link> 
                {arrayCategory.length!==0? <Games newGamesList={arrayCategory}/>:
                <div className="centerCenter noGames"style={{backgroundImage: `url(../assets/noGames.jpg)`}}><h2>There are no games in this category</h2></div>}
            </div>
           
            )
            
}

const mapStateToProps= state =>{
    return{
        newGamesList:state.game.newGamesList
    }
}

const mapDispatchToProps = {
    allGames:gamesActions.allGames

}
export default connect(mapStateToProps,mapDispatchToProps)(CategoryList)