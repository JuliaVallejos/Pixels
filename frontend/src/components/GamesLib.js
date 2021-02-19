
 const GamesLib = (props) =>{
    console.log("estoy en GamesLib")
    console.log(props.newGamesList)
    var prom=0

        return(
            <>           
           <div style={{display:'flex',flexWrap:'wrap',justifyContent:'space-around'}}>
          
             {props.newGamesList && props.newGamesList.map( ({_id,gameTitle,gameImg,prom,gameInfo,gameCategories,idUser,valoration,clasificationPEGI,userComments})  =>{
             
                return(
                 <div key={_id} style={{fontSize:'0.4em'}}>
                     <h4>{gameTitle}</h4>
                     <div style={{width:'85px',height:'85px',backgroundColor:'yellowgreen',backgroundImage:`url(${gameImg})`,backgroundSize:'cover'}}></div>
                  

                        <p>Valoration: {prom}</p>
                        <p>Clasification: {clasificationPEGI}</p>
                       
                 </div>
                 ) 
 
             })}
             </div>
             </>)

}

export default GamesLib