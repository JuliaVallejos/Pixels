import ReactStars from "react-rating-stars-component";
import React from "react";
import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'

 
  const Games = (props) =>{
     
    const {newGamesList,filterGames} = props
    const [newOrder,setNewOrder] =  useState([])
    const [noResults,setNoResults] = useState(false)
    const [agesState,setAgesState] = useState([])
    var elements = newGamesList
    const [categories,setCategories] = useState(elements)
    const [search, setSearch] = useState ('')
    var ages=[]
    var gamesFiltered=[]
    var gamesConcat=[]
    const [filterBySort,setFilterBySort]= useState(false)
    const [filterByAge,setFilterByAge] = useState(false)

    var arrayGames = ((filterBySort===false) ?
     ((categories.length===0 ) ? elements : categories)
     : newOrder)
  

    useEffect(() =>{
        let filterElement=  elements.filter((element) =>{
            return(element.gameTitle.toLowerCase().trim().indexOf(search.toLocaleLowerCase().trim()) !== -1)                              
        })

        if(filterElement.length===0){
                setNoResults(true)
        }else{
        setNoResults(false)
        setCategories(filterElement)} 
    }, [search] )

    const selectAges = e =>{
        
        ages = ages.concat(agesState)
        const value = parseInt(e.target.value)
        console.log("el value es : "+value)
        if(ages.indexOf(value)===-1){
             ages.push(value)
        }else{ 
           const ind= ages.indexOf(value)
            ages.splice(ind,1)
        }
        setAgesState(ages)         
    }
    
    const filt_games = () =>{
        setFilterByAge(true)
    agesState.map(age=>{
            gamesFiltered= newGamesList.filter(game=> game.clasificationPEGI===age)
            gamesConcat = gamesConcat.concat(gamesFiltered)
        })
        if(gamesConcat.length===0 &&agesState.length!==0){
            setNoResults(true)
            
        }else{
            setNoResults(false)
            setCategories(gamesConcat)
        }    

        {(gamesFiltered.length === 0 && gamesConcat.length===0) && setFilterByAge(false)}
  
    }
    
    
    const read_sort= e =>{  
        const order = e.target.value

        setFilterBySort(true)

        if(order==='less_valued'){          
         return   setNewOrder([...categories].sort((a,b) => a.prom - b.prom))       
        }
        if (order==='most_valued'){   
           return  setNewOrder([...categories].sort((a,b) => b.prom - a.prom))
            
        }else{           
            setNewOrder(categories)
            setFilterBySort(false)
        }
    }
    

         return(
            <>
            <div id="library">
            <h2 className="textCenter sectionTitle homeTitle centerCenter" style={{backgroundImage: `url(../assets/bricks.jpg)`}} >Find your favorite games</h2>

            <div className="libraryFilters">

                {filterByAge === false &&
                    <input className="searchLibrary" type='text' onChange={e =>setSearch(e.target.value)} placeholder='Search'/>
                }
                
                {search === '' &&
                    <label className="libraryLabel" onChange={selectAges} htmlFor='PEGI'>Select clasification PEGI
                    <div className="libraryCheckbox">
                        <input type='checkbox' name='PEGI' value='3' />3
                        <input type='checkbox' name='PEGI' value='7' />7
                        <input type='checkbox' name='PEGI' value='12' />12
                        <input type='checkbox' name='PEGI' value='16' />16
                        <input type='checkbox' name='PEGI' value='18' />18
                    </div>
                    <button onClick={filt_games}>Search</button>
                    </label>}
            
                <select defaultValue='' onChange={read_sort}>
                    <option value='' >Sort by</option>
                    <option value='most_valued'>Most Valued</option>
                    <option value='less_valued'>Less Valued</option>
                </select>

            </div>
            {noResults? <h2>No games</h2>:
            <div style={{display:'flex',flexWrap:'wrap',justifyContent:'space-around'}}>
      
            {arrayGames && arrayGames.map( ({_id,gameTitle,gameImg,gameInfo,prom,gameCategories,idUser,valoration,clasificationPEGI,userComments})  =>{
                return(
                <Link key={_id} to={`/games/${_id}`}>
                    <div className="zoom" key={_id}>
                        <p>{clasificationPEGI}</p>
                        <div className="portadaJuego" style={{backgroundImage:`url(${gameImg})`}}/>
                        <div className="cajaInformacion">
                            <div className="infoJuego">
                                <h4 className="tituloJuego">{gameTitle}</h4>
                                <p className="gameInfo">{gameInfo}</p>
                            </div> 
                            <div className="valoracion justifyCenter">
                                <ReactStars
                                    count={5}
                                    isHalf={true}
                                    value={prom}
                                    size={50}
                                    activeColor="#ffd700"
                                    edit= {false}
                            /></div>                         
                        </div> 
                    </div>
                </Link>  
                )
              })}
            </div>
  }
            </div>
            </>
        ) 
 } 
export default Games