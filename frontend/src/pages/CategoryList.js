import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Games from '../components/Games'
import gamesActions from "../redux/actions/gamesActions"


const CategoryList = ({allGames,newGamesList,match:{params:{category}}}) =>{
    if(newGamesList.length===0){
        allGames();
        return <h1>loading...</h1> }
        
    const arrayCategory=newGamesList.filter(game => game.gameCategories.indexOf(category)!==-1)

    return (
            <div>
                <h2>{category}</h2><Link to='/library'>See all games</Link>
 
                {arrayCategory.length!==0? <Games newGamesList={arrayCategory}/>:
                <h2>There are no games in this category</h2>}
            </div>
            
            )
}

const mapStateToProps= state =>{
    return{
        newGamesList:state.game.newGamesList
    }
}
const mapDispatchToProps={
    allGames:gamesActions.allGames,
    mostValued: gamesActions.mostValued
}

export default connect(mapStateToProps,mapDispatchToProps)(CategoryList)