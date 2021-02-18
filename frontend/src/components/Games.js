import { useState } from "react"
import ReactStars from "react-rating-stars-component";
import React from "react";
import { render } from "react-dom";

 const Games = (props) =>{


    var prom=0

        return(
            <>
           
           <div style={{display:'flex',flexWrap:'wrap',justifyContent:'space-around'}}>
             {props.newGamesList.map( ({_id,gameTitle,gameImg,gameInfo,gameCategories,idUser,valoration,clasificationPEGI,userComments})  =>{
             
                return(
                 <div className="zoom" key={_id}>
                     
                     <div className="portadaJuego " style={{backgroundImage:`url(${gameImg})`, backgroundColor:"red"}}></div>
                        <div>
                            <h4 className="tituloJuego">{gameTitle}</h4>
                            <p>{gameInfo}</p>
                        </div>
                       
                        
                        { valoration.map(() =>{  
                            const sum =valoration.reduce((a,b) =>{  
                                    return {
                                    valoration: (a.valoration+ b.valoration)
                                    }
                                }, {valoration: 0})
                                
                                prom = sum.valoration/valoration.length
                                })        
                            }
                    
                            <p className="valoracion justifyCenter"><ReactStars
                                    count={5}
                                    isHalf={true}
                                    value={prom}
                                    size={50}
                                    activeColor="#ffd700"
                                    edit= {false}
                            /></p>
                        
                        
                            
                            
                           
                        
                        
                        
                        {/* <p>Clasification: {clasificationPEGI}</p> */}
                       {/* <div style={{display:'flex',justifyContent:'space-between'}}>
                        {gameCategories.map((category,index) =>{
                            return (<p key={index}> {category} </p>)})}
                        </div>
                        {userComments.map(comment =>{
                            return (<p key={comment._id}>{comment.comment}</p>)
                        })} */}
                 </div>
                 ) 
 
             })}
             </div>
             </>)

}

export default Games