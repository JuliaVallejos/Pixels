import {useState,useEffect} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import Game from '../components/Game'
import gamesActions from '../redux/actions/gamesActions'

const Library = (props) =>{
    const [filter,setFilter]=useState(false)
    const [noResults,setNoResults] = useState(false)
    const [loading,setLoading] = useState(true)

    const categories=["Horror","Action","RPG","Adventure","Survival","Arcade","Shooter","MOBA"]


    useEffect(() => {
            
        getGames() 
        
    }, [])

    const filterByCategory= e =>{
        
        const arrayCategory = []
        const category= e.target.value
     
        if(category==='all'){
            setNoResults(false)
            setFilter(props.newGamesList)
           
        }else{
            setFilter(true)
        }
        props.newGamesList.map((game) =>{
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
        
        <h2>Library</h2>
        <input type='text' onChange={read_input} placeholder='Search'/>
        <div >
        <select onChange={filterByCategory} name='categories'>
                <option value='all'>Select Category</option>
                {categories.map((category,index) =>{
                    return <option key={index} value={category}>{category}</option>
                })}
            </select>
           
            {loading && <h2>Loading...</h2>}
      
            {noResults?<h1>No results</h1>:
            (!loading&& props.newGamesList )&&<Game newGamesList={!filter?props.newGamesList : filter}/>}
 
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