import { useEffect, useState } from "react"
import { connect } from "react-redux"
import gamesActions from "../redux/actions/gamesActions"

const GameById = (props)=>{
 const [games, setGames]=useState({})

useEffect(()=>{
    props.allGames()
    const {id}= props.match.params
    const game =props.gamesList.filter(singleGame=>singleGame._id === id)
    setGames(game)
  props.gamesById(id)
},[])

console.log(games)

    return(
        <h1>game by id </h1>
    )
}
const mapStateToProps =state=>{
    return {
        gameById: state.game.gameById
    }
}
const mapDispatchToProps={
    gamesById: gamesActions.gamesById,
    allGames: gamesActions.allGames
}
export default connect (mapStateToProps, mapDispatchToProps) (GameById)