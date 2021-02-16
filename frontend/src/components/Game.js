import { useState } from "react"

 const Game = (props) =>{

        return(
            <>
           
           <div style={{display:'flex',flexWrap:'wrap',justifyContent:'space-around'}}>
             {props.newGamesList.map( ({_id,gameTitle,gameImg,gameInfo,gameCategories,idUser,valoration,clasificationPEGI,userComments})  =>{
             
                return(
                 <div key={_id}>
                     <h4>{gameTitle}</h4>
                     <div style={{width:'85px',height:'85px',backgroundColor:'yellowgreen',backgroundImage:`url(${gameImg})`,backgroundSize:'cover'}}></div>
                        <p>{gameInfo}</p><p>Valoration</p>{
                           valoration.map( (valoration1,index) => {  
                               return(
                                   <p key={index}>{valoration1.valoration}</p>
                                   )
                                   
                                })
                            
                        }<p>Clasification {clasificationPEGI}</p>
                       <div style={{display:'flex',justifyContent:'space-between'}}>
                        {gameCategories.map((category,index) =>{
                            return (
                            <p key={index}> {category} </p>)
                        })}
                        </div>
                        {userComments.map(comment =>{
                            return (
                                <p key={comment._id}>{comment.comment}</p>
                            )
                        })}
                 </div>
                 ) 
 
             })}
             </div>
             </>)

}

export default Game