import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Games from '../components/Games'


const CategoryList = (props) =>{
    console.log(props.newGamesList)
      
    const category= props.match.params.category
    const arrayCategory=props.newGamesList.filter(game => game.gameCategories.indexOf(category)!==-1)
    console.log(props.newGamesList)git p
        newGamesList:state.game.newGamesList
    }
}

export default connect(mapStateToProps)(CategoryList)