import {useState,useEffect} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import gamesActions from '../redux/actions/gamesActions'

const Library = (props) =>{


    useEffect(() => {
        props.allGames()
    }, [])
    const read_input= e =>{
        const search = e.target.value
        props.filterGames(search)

    }
      

    return (
        <>
        <h2>Library</h2>
        <input type='text' onChange={read_input} placeholder='Search'/>
        <div style={{display:'flex',flexWrap:'wrap',justifyContent:'space-around'}}>
            
            {props.newGamesList&& props.newGamesList.map( ({_id,gameTitle,gameImg,gameInfo,gameCategory,idUser,valoration,clasificationPEGI,userComments}) =>{
                return(
                <div key={_id}>
                    <h4>{gameTitle}</h4>
                    <div style={{width:'85px',height:'85px',backgroundColor:'yellowgreen',backgroundImage:`url(${gameImg})`}}></div>
                       <p>{gameInfo}</p><p>Valoracion {valoration.length}</p><p>Clasificacion {clasificationPEGI}</p>
                       <div style={{display:'flex',justifyContent:'space-between'}}>
                       {gameCategory.map(category =>{
                           return (
                           <p> {category} </p>)
                       })}
                       </div>
                       {userComments.map(comment =>{
                           return (
                               <p>{comment.comment}</p>
                           )
                       })}
                    </div>
                )

            })}
        </div>
        </>
    )
}

const mapStateToProps= state =>{
    return{
        newGamesList:state.game.newGamesList
    }
}
const mapDispatchToProps = {
    allGames:gamesActions.allGames,
    filterGames: gamesActions.filterGames
}

export default connect(mapStateToProps,mapDispatchToProps)(Library)