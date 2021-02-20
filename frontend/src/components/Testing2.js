import React from "react";
import {Link} from 'react-router-dom'
import {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import GamesLib from '../components/GamesLib'
import gamesActions from '../redux/actions/gamesActions' 


const Testing2 = (props) =>{

     console.log(props)

     const {newGamesList} = props
     const [loading,setLoading] = useState(true)
     const [editFilter,setEditFilter] = useState(false)
     const [newOrder,setNewOrder] =  useState([])
    const [theGame, setTheGame] = useState([])

     const [agesState,setAgesState] = useState([])
     var ages=[]
     var gamesFiltered=[]
     var gamesConcat=[]
      const [gamesFilteredPEGI,setGamesFilteredPEGI]=useState(gamesFiltered)
 
    console.log(newGamesList)

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
     const selectAges = e =>{
         
         ages= ages.concat(agesState)
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
 
         ages.map(age=>{
            
              gamesFiltered= newGamesList.filter(game=> game.clasificationPEGI===age) 
                 gamesConcat = gamesConcat.concat(gamesFiltered)
             })
      setGamesFilteredPEGI(gamesConcat)
     
     }
     const read_sort= e =>{
      
         const order = e.target.value
            console.log(order)
         if(order==='less_valued'){          
          return   setNewOrder([...newGamesList].sort((a,b) => a.prom - b.prom))       
         }
         if (order==='most_valued'){   
            return  setNewOrder([...newGamesList].sort((a,b) => b.prom - a.prom))
             
         }else{
            
             setNewOrder(newGamesList)
         }
         
     }




     var prom=0
 
         return(
             <>
             <div>
                        {/* BUSQUEDA POR NOMBRE */}
                <input type='text' onChange={read_input} placeholder='Search'/>

                {/* CLASIFICACION PGI */}
                <label onChange={selectAges} htmlFor='PEGI'>Select clasification PEGI
                    <input type='checkbox' name='PEGI' value='3' />3
                    <input type='checkbox' name='PEGI' value='7' />7
                    <input type='checkbox' name='PEGI' value='12' />12
                    <input type='checkbox' name='PEGI' value='16' />16
                    <input type='checkbox' name='PEGI' value='18' />18
                    <button onClick={filt_games}>Search</button>
                </label>

                {/* MOST VALUE LESS VALUE */}
                <select defaultValue='' onChange={read_sort}>
                    <option value='' >Sort by</option>
                    <option value='most_valued'>Most Valued</option>
                    <option value='less_valued'>Less Valued</option>
                </select>

                {loading && <h2>Loading...</h2>}

                {(!loading)&&<GamesLib newGamesList={gamesFilteredPEGI.length!==0 ? gamesFilteredPEGI : newOrder.length!==0?newOrder : newGamesList }/>} 
            </div>


                <div style={{display:'flex',flexWrap:'wrap',justifyContent:'space-around'}}>

                {props.newGamesList && 
                newGamesList.map( ({_id,gameTitle,gameImg,gameInfo,prom,gameCategories,idUser,valoration,clasificationPEGI,userComments})  =>{

                
                    return(
                     
                     <Link to={`/games/${_id}`}>
                     <div className="zoom" key={_id}>
                        <div className="portadaJuego" style={{backgroundImage:`url(${gameImg})`}}></div>
                          <div className="cajaInformacion">
                               <div className="infoJuego">
                                   <h4 className="tituloJuego">{gameTitle}</h4>
                                     <p className="gameInfo">{gameInfo}</p>
                               </div> 
                            

                            
                                {/* <p className="valoracion justifyCenter"><ReactStars
                                       count={5}
                                      isHalf={true}
                                      value={prom}
                                        size={50}
                                        activeColor="#ffd700"
                                         edit= {false}
                               /></p>  */}
                            
                             </div> 
                                

                    </div>
                     </Link>
                   
                    )
    
                })}
              </div>
            </>) 
}
 
const mapStateToProps= state =>{
    return{
        loading: state.game.loading,
    }
}
const mapDispatchToProps = {
    allGames:gamesActions.allGames,
    filterGames: gamesActions.filterGames
}

export default connect(mapStateToProps,mapDispatchToProps)(Testing2)
