import { useState } from "react"

 const Game = (props) =>{

    var prom=0
/*      props.newGamesList.map((game,index) =>{
         game.valoration.map(valoration =>{  
         const sum = game.valoration.reduce((a,b) =>{  
        
                return {
                  valoration: (a.valoration+ b.valoration)
                };
              }, {valoration: 0}); 
              
              prom = sum.valoration
            })
            console.log(prom/game.valoration.length)
         })
  
 */
        return(
            <>
           
           <div style={{display:'flex',flexWrap:'wrap',justifyContent:'space-around'}}>
             {props.newGamesList.map( ({_id,gameTitle,gameImg,gameInfo,gameCategories,idUser,valoration,clasificationPEGI,userComments})  =>{
             
                return(
                 <div key={_id}>
                     <h4>{gameTitle}</h4>
                     <div style={{width:'85px',height:'85px',backgroundColor:'yellowgreen',backgroundImage:`url(${gameImg})`,backgroundSize:'cover'}}></div>
<<<<<<< HEAD
                        <p>{gameInfo}</p><p>Valoration</p>{
                           valoration.map( (valoration1,index) => {  
                               return(
                                   <p key={index}>{valoration1.valoration}</p>
                                   )
                                   
                                })
                            
                        }<p>Clasification {clasificationPEGI}</p>
=======
                        <p>{gameInfo}</p><p>Valoration</p>
                        { valoration.map(() =>{  
                            const sum =valoration.reduce((a,b) =>{  
                                    return {
                                    valoration: (a.valoration+ b.valoration)
                                    }
                                }, {valoration: 0})
                                
                                prom = sum.valoration/valoration.length
                                })        
                            }
                    
                    
                       
                        <p>{prom}</p> <p>Clasification {clasificationPEGI}</p>
>>>>>>> 1a7bbe4c2647ff867c9b9ed92c60b9807e77d7bd
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