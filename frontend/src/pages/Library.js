import {useState,useEffect} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import Categories from '../components/Categories'
import Games from '../components/Games'
import gamesActions from '../redux/actions/gamesActions'

const Library = (props) =>{
    const {newGamesList} = props
    const [loading,setLoading] = useState(true)
    const [newOrder,setNewOrder] = useState(newGamesList)
    const ages=[]
    var gamesFiltered=[]
    const gamesFilterAll=[]
     const [gamesFilteredPEGI,setGamesFilteredPEGI]=useState([])


    useEffect(() => {
        getGames() 
    
    }, [])

  
    const read_input= e =>{
        const search = e.target.value
        props.filterGames(search)
      

    }
    const getGames = async () =>{
        const data = await props.allGames()
        data&& setLoading(false)
    }
    const filterPEGI = e =>{
        const value=parseInt(e.target.value)
      
       
        if(ages.indexOf(value)!==-1){
       
            const ind= ages.indexOf(value)
            ages.splice(ind,1)
           
        }else{
            ages.push(value)
        }
         console.log(ages)
   
            console.log(newGamesList)
        newGamesList.map(game =>{
            ages.map(age=>{
                if(game.clasificationPEGI===age){
                   gamesFiltered.push(game)
                }
                    
           })
        
        })
        gamesFilterAll.push(gamesFiltered)
        setGamesFilteredPEGI(gamesFilteredPEGI,gamesFilterAll)
       
      
          
    }
        
    



    return (
        <>
        <div id="latestNews" className="fondoWall ">
        <h2  className="textCenter">Library</h2>
        <Categories/>
        <input type='text' onChange={read_input} placeholder='Search'/>
        <label onChange={filterPEGI} htmlFor='PEGI'>Select clasification PEGI
            <input type='checkbox' name='PEGI' value='3'/>3
            <input type='checkbox' name='PEGI' value='7'/>7
            <input type='checkbox' name='PEGI' value='12'/>12
            <input type='checkbox' name='PEGI' value='16'/>16
            <input type='checkbox' name='PEGI' value='18'/>18
        </label>
  
            {loading && <h2>Loading...</h2>}
         {console.log(gamesFilteredPEGI)}
      
          {/*   {(!loading)&&<Games newGamesList={ages.length!==0? gamesFilteredPEGI : newGamesList }/>} */}
 
        
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