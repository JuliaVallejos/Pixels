
 import ReactStars from "react-rating-stars-component";
 import React from "react";
 import {Link} from 'react-router-dom'
 
  const Games = (props) =>{
 
    console.log(props)
 
     var prom=0
 
         return(
             <>
            
            <div style={{display:'flex',flexWrap:'wrap',justifyContent:'space-around'}}>
              {props.newGamesList&&props.newGamesList.map( ({_id,gameTitle,gameImg,gameInfo,prom,gameCategories,idUser,valoration,clasificationPEGI,userComments})  =>{
              
                 return(
                  <Link to={`/games/${_id}`}>
                  <div className="zoom" key={_id}>
                      
                      <div className="portadaJuego" style={{backgroundImage:`url(${gameImg})`}}></div>
                         <div className="cajaInformacion">
                             <div className="infoJuego">
                                 <h4 className="tituloJuego">{gameTitle}</h4>
                                 <p className="gameInfo">{gameInfo}</p>
                             </div>
                         

                        
                             <p className="valoracion justifyCenter"><ReactStars
                                     count={5}
                                     isHalf={true}
                                     value={prom}
                                     size={50}
                                     activeColor="#ffd700"
                                     edit= {false}
                             /></p>
                         
                         </div>
                             

                  </div>
                  </Link>
                  ) 
  
              })}
              </div>
              </>)
 
 }
 
 export default Games