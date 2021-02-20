import { FiTrash2 } from 'react-icons/fi'
import { FaEdit } from 'react-icons/fa'
import { connect } from "react-redux"
import gamesActions from "../redux/actions/gamesActions"
import { useEffect, useState } from "react"

const Commentary = (props) =>{ 
 

  useEffect(()=>{        
    
},[])



  const deleteComment =async()=>{
    await props.deleteComment( props.game._id._id, props.comment._id)
  }

    return(
  
  
    <div className="displayFlex ">
       
        <div className="centerCenter">
          <div className=" userImg " style={{backgroundImage:`url("/userImages/${props.comment.idUser.userImg}")`}}></div>
          
        </div>

        <div class="dialogbox">
          <div class="body">
            
              <span class="tip tip-left"></span>
                  <div class="message">
                    
                      <h3 className="NombreUsuario">{props.comment.idUser.userFirstName}  </h3>
                        
                      <span className="comentarioTexto">{props.comment.comment}</span>
                  </div>
            </div>
            
          </div>
          <div className="displayFlex iconos centerCenter" onClick={deleteComment}>
            <div>
              <FiTrash2 />
            </div>
            
            <div className="iconEdit">
              <FaEdit/>
            </div>
          </div>

    </div>
         
  

  

  
  
  )

    
}


const mapStateToProps = state =>{
  return {
    
      game: state.game.gameById,
    
  }
}
const mapDispatchToProps={
  deleteComment: gamesActions.deleteComment,
}

export default connect (mapStateToProps, mapDispatchToProps)(Commentary)


