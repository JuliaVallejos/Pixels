import {useState,useEffect} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import Categories from '../components/Categories'
import GamesLib from '../components/GamesLib'
import gamesActions from '../redux/actions/gamesActions'

const Library = (props) =>{
  
    // const {newGamesList} = props
    // const [loading,setLoading] = useState(true)
    // const [editFilter,setEditFilter] = useState(false)
    // const [newOrder,setNewOrder] =  useState([])
  
    // const [agesState,setAgesState] = useState([])
    // var ages=[]
    // var gamesFiltered=[]
    // var gamesConcat=[]


    //  const [gamesFilteredPEGI,setGamesFilteredPEGI]=useState(gamesFiltered)

    // useEffect(() => {
    //     getGames()
        
    // }, [])
  
    // const read_input= e =>{
    //     const search = e.target.value
    //     props.filterGames(search)    

    
        
    //     ages=ages.concat(agesState)
    //     const value=parseInt(e.target.value)

    //     if(ages.indexOf(value)===-1){
    //          ages.push(value)
            
           
    //     }else{ 
    //        const ind= ages.indexOf(value)
    //         ages.splice(ind,1)
    //     }
    //     setAgesState(ages)
  
        
    // }
    // const filt_games = () =>{
    //     if(ages.length===0){
    //         ages=ages.concat(agesState)
    //     }
    //     gamesConcat=[]

    //     ages.map(age=>{
           
    //          gamesFiltered= newGamesList.filter(game=> game.clasificationPEGI===age) 
    //             gamesConcat = gamesConcat.concat(gamesFiltered)
    //         })
    //  setGamesFilteredPEGI(gamesConcat)

    
    // }
    // const read_sort= e =>{
     
    //     const order = e.target.value

    //     if(order==='less_valued'){          
    //      return   setNewOrder([...newGamesList].sort((a,b) => a.prom - b.prom))       
    //     }
    //     if (order==='most_valued'){   
    //        return  setNewOrder([...newGamesList].sort((a,b) => b.prom - a.prom))
            
    //     }else{
           
    //         setNewOrder(newGamesList)
    //     }
        
    // }
 

    return (
        <>
        <div id="library">
        <h2  className="textCenter sectionTitle homeTitle centerCenter" style={{backgroundImage: `url(../assets/bricks.jpg)`}}>Library</h2>

        <Categories/>

        {/* <h2 className="textCenter sectionTitle homeTitle centerCenter" style={{backgroundImage: `url(../assets/bricks.jpg)`}} >Find your favorite games</h2>

        <div className="libraryFilters"> */}

        {/* <input className="searchLibrary" type='text' onChange={read_input} placeholder='Search'/>

        <label className="libraryLabel" onChange={selectAges} htmlFor='PEGI'>Select clasification PEGI
        <div className="libraryCheckbox"> 
            <input type='checkbox' name='PEGI' value='3' />3
            <input type='checkbox' name='PEGI' value='7' />7
            <input type='checkbox' name='PEGI' value='12' />12
            <input type='checkbox' name='PEGI' value='16' />16
            <input type='checkbox' name='PEGI' value='18' />18
        </div>

            <button  onClick={filt_games}>Search</button>
        </label>
        
       <select defaultValue='' onChange={read_sort}>
            <option value='' >Sort by</option>
            <option value='most_valued'>Most Valued</option>
            <option value='less_valued'>Less Valued</option>
        </select>

            {loading && <h2>Loading...</h2>} */}
      
           {/* {(!loading)&&<GamesLib newGamesList={gamesFilteredPEGI.length!==0 ?gamesFilteredPEGI : newOrder.length!==0?newOrder : newGamesList }/>}  */}
 
        
        {/* </div> */}
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