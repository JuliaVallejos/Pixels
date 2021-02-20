const Commentary = (props) =>{ 
    
    return(
  
  
    <div className="displayFlex">
       
        <div>
          <div className=" userImg " style={{backgroundImage:`url("/userImages/${props.comment.idUser.userImg}")`}}></div>
        
        </div>

        <div class="dialogbox">
          <div class="body">
              <span class="tip tip-left"></span>
                  <div class="message">
                      <h3 className="NombreUsuario">{props.comment.idUser.userFirstName}</h3>
                      <span>{props.comment.comment}</span>
                  </div>
            </div>
          </div>
        

    </div>
         
  

  

  
  
  )

    
}

export default Commentary


