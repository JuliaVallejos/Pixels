import ReactStars from "react-rating-stars-component";
import React from "react";
import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'

 

const Games = (props) =>{
    
    const {newGamesList,filterGames} = props
    const [newOrder,setNewOrder] =  useState([])
    const [noResults,setNoResults] = useState(false)
    const [agesState,setAgesState] = useState([])
    
    const [categories,setCategories] = useState(newGamesList)
    const [search, setSearch] = useState ('')
    var ages=[]
    var gamesFiltered=[]
    var gamesConcat=[]
    const [filterBySort,setFilterBySort]= useState(false)
    const [filterByAge,setFilterByAge] = useState(false)
    const [filterBySearch,setFilterBySearch] = useState(false)
  
    console.log(newOrder)
    var arrayGames = ((filterBySort===false) ?
     ((categories.length===0 ) ? newGamesList : categories)
     : newOrder)
     useEffect(() => {
        window.scrollTo(0, 0)
       }, [])
    useEffect(() =>{
        if(search!==''){
            setFilterBySearch(true)
        }else{
            setFilterBySearch(false)
        }
        
        let filterElement=  newGamesList.filter((element) =>{
            if (element.gameTitle.split(" ")[2]){
                return(element.gameTitle.split(" ")[0].toLowerCase().indexOf(search.toLocaleLowerCase().trim()) === 0
                    || element.gameTitle.split(" ")[1].toLowerCase().indexOf(search.toLocaleLowerCase().trim()) === 0
                    || element.gameTitle.split(" ")[2].toLowerCase().indexOf(search.toLocaleLowerCase().trim()) === 0) 
            } 
            if (element.gameTitle.split(" ")[1]){
                return(element.gameTitle.split(" ")[0].toLowerCase().indexOf(search.toLocaleLowerCase().trim()) === 0
                    || element.gameTitle.split(" ")[1].toLowerCase().indexOf(search.toLocaleLowerCase().trim()) === 0) 
            } 
            else {
                return(element.gameTitle.toLowerCase().indexOf(search.toLocaleLowerCase().trim()) === 0)
            }   
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
        setCategories(newGamesList)
       
       
    agesState.map(age=>{
            gamesFiltered= newGamesList.filter(game=> game.clasificationPEGI===age)
            gamesConcat = gamesConcat.concat(gamesFiltered)
        })
        if(gamesConcat.length===0 &&agesState.length!==0){
            setNoResults(true)
            
        }else{
            setNoResults(false)
            agesState.length===0?setCategories(newGamesList):setCategories(gamesConcat)
        } 
        {(gamesFiltered.length === 0 && gamesConcat.length===0) && setFilterByAge(false)}
    }
    
    
    const read_sort= e =>{  
        const order = e.target.value
        setFilterBySort(true)
        console.log(categories)
        if(order==='less_valued'){   
            console.log('less')       
         return   setNewOrder([...categories].sort((a,b) => a.prom - b.prom))       
        }
        if (order==='most_valued'){   
            console.log('most')
           return  setNewOrder([...categories].sort((a,b) => b.prom - a.prom))
            
        }else{   
            console.log('nul')        
            setNewOrder(categories)
             setFilterBySort(false) 
        }
    }
    

         return(
            <>
            <div id="library">
              <div className="libraryFilters">
            {(!filterByAge &&!filterBySort)&&   
            <>
                    <h2 className="textCenter centerCenter" >Find your favorite games</h2>
                    <input className="searchLibrary" type='text' onChange={e =>setSearch(e.target.value)} placeholder='Search'/>
            </>
                }
                
                {(search === '' && !filterBySort)&&
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
            
                   {(!filterByAge && !filterBySearch) &&
                        <select defaultValue='' onChange={read_sort}>
                        <option value='' >Sort by</option>
                        <option value='most_valued'>Most Valued</option>
                        <option value='less_valued'>Less Valued</option>
                     </select>}

            </div>
            {noResults? <div  className="centerCenter noGames" style={{backgroundImage: `url("/assets/noGames.jpg")` }}>
                <h2 className="centerCenter">No results</h2>
            </div> 
            :
            <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center'}}>
      
                {arrayGames && arrayGames.map( ({_id,gameTitle,gameImg,gameInfo,prom,gameCategories,idUser,valoration,clasificationPEGI,userComments})  =>{
                 return(
                    <Link key={_id} to={`/games/${_id}`}>
                        <div className="zoom" key={_id}> 
                                                  
                            <div className="portadaJuego" style={{backgroundImage:`url(/gamesImages/${gameImg})`}}>
                                <p className="pegiClasification centerCenter">{clasificationPEGI}</p>  
                            </div>                            
                            <div className="cajaInformacion">
                               <div className="infoJuego">
                                    <h4 className="tituloJuego">{gameTitle.length <= 10 ? gameTitle : gameTitle.slice(0,8)+"..."}</h4>
                                    <p className="gameInfo">{gameInfo.length <=26 ? gameInfo : gameInfo.slice(0,23)+"..."}</p>
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