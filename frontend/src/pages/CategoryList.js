import {connect} from 'react-redux'


const CategoryList = (props) =>{
    const category= props.match.params.category

    return (<div><h2>En construccion</h2></div>)
}

const mapStateToProps= state =>{
    return{
        newGamesList:state.game.newGamesList
    }
}

export default connect(mapStateToProps)(CategoryList)