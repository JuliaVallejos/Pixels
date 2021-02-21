import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Games from '../components/Games'
import gamesActions from '../redux/actions/gamesActions'


const CategoryList = (props) =>{
      console.log(props.newGamesList)
    if(props.newGamesList.length===0){
        props.allGames()
        return <h1>loading...</h1> }

    const category= props.match.params.category
    const arrayCategory=props.newGamesList.filter(game => game.gameCategories.indexOf(category)!==-1)   
    return (
            <div className="categorySectionTitle">
                <h2 className="textCenter sectionTitle homeTitle centerCenter" style={{backgroundImage: `url(../assets/bricks.jpg)`}} >{category}</h2><Link to='/library' className="centerCenter seeAllGames"><p>SEE ALL GAMES</p></Link> 
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
    allGames: gamesActions.allGames
}
export default connect(mapStateToProps,mapDispatchToProps)(CategoryList)