import { FiTrash2 } from 'react-icons/fi'
import { FaEdit } from 'react-icons/fa'
import { connect } from "react-redux"
import gamesActions from "../redux/actions/gamesActions"
import { useEffect, useState } from "react"
import Swal from 'sweetalert2'

const Commentary = (props) =>{ 
  const [edit,setEdit] = useState(false)
  const [editedComment,setEditedComment] = useState(props.comment.comment)
  const [gameNew,setGameNew] =useState(props.game)

  const deleteComment =async()=>{
     
          const data = await props.deleteComment( props.game._id, props.comment._id)
       if(data){
         setGameNew(data.data.response)
       }
    
  }
  const readInput= ()=>{
    setEditedComment(document.getElementById('edited_comment').value)
}
 
    const send_new_comment = async () =>{
      if(editedComment===''){
        Swal.fire('You cannot send an empty comment!')
        return false
    }

      const data = await props.editComment(props.game._id,props.comment._id,editedComment)
      if(data.data.errores){
        Swal.fire('Error')
    }else{
        setEdit(false)
    }  
} 
    return(
  
  
    <div className="displayFlex ">
       
        <div className="centerCenter">
          <div id="userImgComment" className=" userImg " 
            style={{backgroundImage:`url("/userImages/${props.comment.idUser.userImg}")`}}> 
          </div>
          
        </div>

        <div className="dialogbox">
          <div className="body">
            
              <span className="tip tip-left"></span>
                  <div className="message">
                    
                      <h3 className="NombreUsuario">{props.comment.idUser.userFirstName}  </h3>
                      {!edit?<span className="comentarioTexto">{props.comment.comment}</span> 
                      : <div className="editComment"><textarea col='1' onChange={readInput} id='edited_comment' value={editedComment}/>
                        <button onClick={send_new_comment}><span style={{cursor:'pointer'}}>Send</span></button>
                      </div>}
              
                  </div>
            </div>
            
          </div>

          {props.loggedUser && props.loggedUser.id===props.comment.idUser._id && 
                    <div className="displayFlex iconos centerCenter" >
                    <div style={{cursor:'pointer'}} onClick={deleteComment} >
                      <FiTrash2 />
                    </div>
                    
                    <div  style={{cursor:'pointer'}} onClick={()=>setEdit(true)} className="iconEdit">
                      <FaEdit/>
                    </div>
                  </div>
        }
         
    </div>
         
  )

    
}

const mapStateToProps = state =>{
  return {
    gameById:state.game.gameById,
    loggedUser:state.user.loggedUser
  
    
  }
}
const mapDispatchToProps={
  deleteComment: gamesActions.deleteComment,
  editComment:gamesActions.editComment
}

export default connect (mapStateToProps, mapDispatchToProps)(Commentary)


