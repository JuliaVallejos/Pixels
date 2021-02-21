import ReactStars from "react-rating-stars-component";
import React from "react";
import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'

 
  const Games = ({newGamesList,filterGames}) =>{
 
    const [newOrder,setNewOrder] =  useState([])
    const [gamesFilteredPEGI,setGamesFilteredPEGI]=useState([gamesFiltered])
    const [noResults,setNoResults] = useState(false)
    const [agesState,setAgesState] = useState([])
    var elements = newGamesList


    const [categories,setCategories] = useState(elements)


    const [search, setSearch] = useState ('')
          
    var ages=[]
    var gamesFiltered=[]
    var gamesConcat=[]
    
    console.log(agesState)
    var arrayGames = (categories.length===0 ) ?elements : categories
  
    console.log(search)

    // useEffect(() =>{
    //     setCategories(
    //         elements.filter((element) =>{
    //             return(element.gameTitle.toLowerCase().trim().indexOf(search.toLocaleLowerCase().trim())===0)                              
    //         })
    //     )
    // }, [search] )

    // const read_input= e =>{
        // const search = e.target.value
        // filterGames(search)
    // }

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
   
    agesState.map(age=>{
        
            gamesFiltered= newGamesList.filter(game=> game.clasificationPEGI===age)
    
            gamesConcat = gamesConcat.concat(gamesFiltered)
        })
        console.log(gamesConcat)
        console.log(agesState)
        if(gamesConcat.length===0 &&agesState.length!==0){
            setNoResults(true)
        }else{
            setNoResults(false)
            setCategories(gamesConcat)
            }    
    }

    const read_sort= e =>{  
           
        const order = e.target.value

        if(order==='less_valued'){          
         return   setNewOrder([...categories].sort((a,b) => a.prom - b.prom))       
        }
        if (order==='most_valued'){   
           return  setNewOrder([...categories].sort((a,b) => b.prom - a.prom))
            
        }else{           
            setNewOrder(categories)
        }
        
    }

         return(
            <>
            <div id="library">
            <h2 className="textCenter centerCenter" >Find your favorite games</h2>

            <div className="libraryFilters">

                <input className="searchLibrary" type='text' onChange={e =>setSearch(e.target.value)} placeholder='Search'/>
            
                <label className="libraryLabel" onChange={selectAges} htmlFor='PEGI'>Select clasification PEGI
                <div className="libraryCheckbox">
                    <input type='checkbox' name='PEGI' value='3' />3
                    <input type='checkbox' name='PEGI' value='7' />7
                    <input type='checkbox' name='PEGI' value='12' />12
                    <input type='checkbox' name='PEGI' value='16' />16
                    <input type='checkbox' name='PEGI' value='18' />18
                </div>

                <button onClick={filt_games}>Search</button>
            </label>
            
                <select defaultValue='' onChange={read_sort}>
                    <option value='' >Sort by</option>
                    <option value='most_valued'>Most Valued</option>
                    <option value='less_valued'>Less Valued</option>
                </select>
            </div>
            {noResults? <h2>No games</h2>:
            <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center'}}>
      
                {arrayGames && arrayGames.map( ({_id,gameTitle,gameImg,gameInfo,prom,gameCategories,idUser,valoration,clasificationPEGI,userComments})  =>{
                 return(
                    <Link key={_id} to={`/games/${_id}`}>
                        <div className="zoom" key={_id}> 
                                                  
                            <div className="portadaJuego" style={{backgroundImage:`url(${gameImg})`}}>
                                <p className="pegiClasification centerCenter">{clasificationPEGI}</p>  
                            </div>                            
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