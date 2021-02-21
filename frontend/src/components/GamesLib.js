
 const GamesLib = (props) =>{

    var prom=0

        return(
            <>           
           <div style={{display:'flex',flexWrap:'wrap',justifyContent:'space-around'}}>
            
             {props.newGamesList && props.newGamesList.map( ({_id,gameTitle,gameImg,prom,gameInfo,gameCategories,idUser,valoration,clasificationPEGI,userComments})  =>{
             
                return(
                 <div key={_id} className="gameLib">
                     <div className="gameLibItem"style={{backgroundImage:`url(${gameImg})`}}>
                         <div className="innerGameLibItem">
                            <h4 className="gameLibTitle">{gameTitle.toUpperCase()}</h4>
                            <p>Valoration: {prom}</p>
                            <p>Clasification: {clasificationPEGI}</p> 
                         </div>

                     </div>                    
                 </div>
                 ) 
 
             })}
             </div>
             </>)

}

export default GamesLib