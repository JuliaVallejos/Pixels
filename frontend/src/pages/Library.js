import {useState,useEffect} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import Categories from '../components/Categories'
import GamesLib from '../components/GamesLib'
import gamesActions from '../redux/actions/gamesActions'

const Library = (props) =>{
    const {newGamesList} = props
    const [loading,setLoading] = useState(true)
    /* const [newOrder,setNewOrder] =  useState(newGamesList) */
    
    const [agesState,setAgesState] = useState([])
    var ages=[]
    var gamesFiltered=[]
    var gamesConcat=[]
     const [gamesFilteredPEGI,setGamesFilteredPEGI]=useState(gamesFiltered)

    useEffect(() => {
        getGames() 
    
    }, [])

  
    const read_input= e =>{
      /*   setEditFilter(true) */
        const search = e.target.value
        props.filterGames(search)    

    }
    const getGames = async () =>{
  
        const data = await props.allGames()
        data&& setLoading(false)
    }
    const selectAges = e =>{
        
        ages=ages.concat(agesState)
        const value=parseInt(e.target.value)

        if(ages.indexOf(value)===-1){
             ages.push(value)
            
           
        }else{ 
           const ind= ages.indexOf(value)
            ages.splice(ind,1)
        }
        setAgesState(ages)
  
        
    }
    const filt_games = () =>{
        if(ages.length===0){
            ages=ages.concat(agesState)
        }
        gamesConcat=[]

     console.log(ages)
        ages.map(age=>{
           
             gamesFiltered= newGamesList.filter(game=> game.clasificationPEGI===age) 
                gamesConcat = gamesConcat.concat(gamesFiltered)
            })
     setGamesFilteredPEGI(gamesConcat)
    
    }


    return (
        <>
        <div id="latestNews" className="fondoWall ">
        <h2  className="textCenter">Library</h2>
        <Categories/>
        <input type='text' onChange={read_input} placeholder='Search'/>
        <label onChange={selectAges} htmlFor='PEGI'>Select clasification PEGI
            <input type='checkbox' name='PEGI' value='3' />3
            <input type='checkbox' name='PEGI' value='7' />7
            <input type='checkbox' name='PEGI' value='12' />12
            <input type='checkbox' name='PEGI' value='16' />16
            <input type='checkbox' name='PEGI' value='18' />18
            <button onClick={filt_games}>Search</button>
        </label>
  
            {loading && <h2>Loading...</h2>}
     
           {(!loading)&&<GamesLib newGamesList={(gamesFilteredPEGI.length!==0 ) ?gamesFilteredPEGI : newGamesList }/>} 
 
        
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