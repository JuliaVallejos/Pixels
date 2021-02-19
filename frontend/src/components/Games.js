 import { useState } from "react"
 import ReactStars from "react-rating-stars-component";
 import React from "react";
 import { render } from "react-dom";
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
                         
                        
{/*                          
                         { valoration.map(() =>{  
                             const sum =valoration.reduce((a,b) =>{  
                                     return {
                                     valoration: (a.valoration+ b.valoration)
                                     }
                                 }, {valoration: 0})
                                { valoration.length === 0 ?
                                    prom =0  
                                 : 
                                    prom = sum.valoration/valoration.length}
                                 })        
                             } */}
                     
                        
                             <p className="valoracion justifyCenter"><ReactStars
                                     count={5}
                                     isHalf={true}
                                     value={prom}
                                     size={50}
                                     activeColor="#ffd700"
                                     edit= {false}
                             /></p>
                         
                         </div>
                             
                             
                            
                         
                         
                         
                         {/* <p>Clasification: {clasificationPEGI}</p> */}
                        {/* <div style={{display:'flex',justifyContent:'space-between'}}>
                         {gameCategories.map((category,index) =>{
                             return (<p key={index}> {category} </p>)})}
                         </div>
                         {userComments.map(comment =>{
                             return (<p key={comment._id}>{comment.comment}</p>)
                         })} */}
                  </div>
                  </Link>
                  ) 
  
              })}
              </div>
              </>)
 
 }
 
 export default Games