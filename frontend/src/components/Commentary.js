import { FiTrash2 } from 'react-icons/fi'
import { FaEdit } from 'react-icons/fa'
import { connect } from "react-redux"
import gamesActions from "../redux/actions/gamesActions"
import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
const Commentary = (props) =>{ 
 
const [gameNew,setGameNew] =useState(props.game)
  useEffect(()=>{        
    
},[])
console.log(props.comment)



  const deleteComment =async()=>{
     
          const data = await props.deleteComment( props.game._id._id, props.comment._id)
       if(data){
         setGameNew(data.data.response)
       }
    
  }

    return(
  
  
    <div className="displayFlex">
       
        <div className="centerCenter">
          <div className=" userImg " style={{backgroundImage:`url("${props.comment.idUser.userImg}")`}}></div>
          
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
          <div className="displayFlex iconos centerCenter" >
            <div style={{cursor:'pointer'}} onClick={deleteComment} >
              <FiTrash2 />
            </div>
           
            <div  style={{cursor:'pointer'}} className="iconEdit">
              <FaEdit/>
            </div>
          </div>

    </div>
         
  

  

  
  
  )

    
}


const mapStateToProps = state =>{
  return {
    
     
    
  }
}
const mapDispatchToProps={
  deleteComment: gamesActions.deleteComment,
}

export default connect (mapStateToProps, mapDispatchToProps)(Commentary)


