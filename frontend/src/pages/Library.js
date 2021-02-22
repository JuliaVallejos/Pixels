import {useState,useEffect} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import Categories from '../components/Categories'
import GamesLib from '../components/GamesLib'
import gamesActions from '../redux/actions/gamesActions'

const Library = (props) =>{
  
    return (
        <>
        <div id="library">
        <h2 className="textCenter sectionTitle homeTitle centerCenter" style={{backgroundImage: `url(../assets/bricks.jpg)`}}>Library</h2>
            <Categories/>
        </div>
        </>
    )
}

const mapStateToProps= state =>{
    return{
        loading: state.game.loading,
        newGamesList:state.game.newGamesList
    }
}
const mapDispatchToProps = {
    allGames:gamesActions.allGames,
    filterGames: gamesActions.filterGames
}

export default connect(mapStateToProps,mapDispatchToProps)(Library)