
 const GamesLib = (props) =>{
    

    var prom=0

        return(
            <>
           
           <div style={{display:'flex',flexWrap:'wrap',justifyContent:'space-around'}}>
             {props.newGamesList.map( ({_id,gameTitle,gameImg,gameInfo,gameCategories,idUser,valoration,clasificationPEGI,userComments})  =>{
             
                return(
                 <div key={_id} style={{fontSize:'0.4em'}}>
                     <h4>{gameTitle}</h4>
                     <div style={{width:'85px',height:'85px',backgroundColor:'yellowgreen',backgroundImage:`url(${gameImg})`,backgroundSize:'cover'}}></div>
                  
                        { valoration.map(() =>{  
                            const sum =valoration.reduce((a,b) =>{  
                                    return {
                                    valoration: (a.valoration+ b.valoration)
                                    }
                                }, {valoration: 0})
                                
                                prom = sum.valoration/valoration.length
                                })        
                            }

                        <p>Valoration: {prom}</p>
                        <p>Clasification: {clasificationPEGI}</p>
                       
                 </div>
                 ) 
 
             })}
             </div>
             </>)

}

export default GamesLib