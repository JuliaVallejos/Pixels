import {useState,useEffect} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import Categories from '../components/Categories'
import Games from '../components/Games'
import gamesActions from '../redux/actions/gamesActions'

const Library = (props) =>{
    const {newGamesList} = props
    const [filter,setFilter]=useState(false)
    const [noResults,setNoResults] = useState(false)
    const [loading,setLoading] = useState(true)


    useEffect(() => {
        getGames() 
     
    }, [])

    const filterByCategory= e =>{
        
        const arrayCategory = []
        const category= e.target.value
     
        if(category==='all'){
            setNoResults(false)
            setFilter(false)
           
        }else{
            setFilter(true)
        }
        newGamesList.map((game) =>{
            if(game.gameCategories.includes(category)){
            return arrayCategory.push(game)
            } 
        })
        if(arrayCategory.length!==0){
            setNoResults(false)
            setFilter(arrayCategory)
        }else {
            category!=='all'&&setNoResults(true)
        }
    }
   
  
    const read_input= e =>{
        const search = e.target.value
        props.filterGames(search)
      

    }
    const getGames = async () =>{
  
        const data = await props.allGames()
        data&& setLoading(false)
    }
      

    return (
        <>
        <div id="latestNews" className="fondoWall ">
        <h2  className="textCenter">Library</h2>
        <Categories/>
        <input type='text' onChange={read_input} placeholder='Search'/>
       
  
            {loading && <h2>Loading...</h2>}
            
      
            {/* {noResults?<h1>No results</h1>:
            (!loading)&&<Games newGamesList={newGamesList}/>} */}
 
        
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