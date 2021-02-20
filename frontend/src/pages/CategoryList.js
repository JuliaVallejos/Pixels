import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Games from '../components/Games'
import {useEffect} from 'react'
import gamesActions from '../redux/actions/gamesActions'


const CategoryList = (props) =>{
    console.log(props.newGamesList)
      
    const category= props.match.params.category
    const arrayCategory=props.newGamesList.filter(game => game.gameCategories.indexOf(category)!==-1)
    console.log(props.newGamesList)

    useEffect(() => {
        //     if( !news ||news.length===0 || !mostValuedList||  mostValuedList.length===0 || !latestNews){
               if(props.newGamesList.length==0){
                   props.allGames()
               }
         
        //     }
        },[])
    
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
const mapDispatchToProps = {
    allGames:gamesActions.allGames
}
export default connect(mapStateToProps,mapDispatchToProps)(CategoryList)