import { useEffect, useState } from "react"
import { connect } from "react-redux"
import gamesActions from "../redux/actions/gamesActions"
import ReactStars from "react-rating-stars-component";
import Commentary from "./Commentary";
import { set } from "mongoose";



const GameById = (props)=>{
 
const [comment, setComment] = useState('')
const {id}= props.match.params
useEffect(()=>{
    
    props.gamesById(id)
},[])

const info = e => {
    var comment = e.target.value
    
    setComment(
        comment
    )
    
    console.log(comment)
}



const enviarInfo = async e => {
    e.preventDefault()
    props.addComment(comment, id)
    setComment('')

}


const ratingChanged = (newRating) => {
    console.log(newRating);
  };
    
    return(
        
    <>
        {props.game ?
<div>
            <div className="singleGame">
                {console.log(props.game)}
                <div className="cajaTituloSingleGame">
                    <h1 className="textCenter uppercase">{props.game.gameTitle}</h1>
                </div>

                <div className="portadaSingleGame" style={{backgroundImage:`url(${props.game.gameImg})`}}></div>

                <div className="cajaTituloSingleGame">
                    <h3 className="textCenter uppercase">{props.game.gameInfo}</h3>
                </div>
            </div>


            <div className="justifyCenter">

    <div className="cajaComentarios">
            
            {console.log(props.game.userComments[0])}

            <div className="mensajes">
                {props.game.userComments.map(comment => <Commentary comment={comment}/>)}
            </div>
       
    
        
    
    <div className="enviarMensaje">
        <input name="comment" onChange={info} value={comment}  type="text" class="form-control" placeholder="Write your message here!" id="inputEmail4"/>
       
        
        <input id="sendMessage" class=" btn btn-primary"  onClick={enviarInfo}  type="submit" value="SEND MESSAGE"/> 
    </div>
    
    </div>
    
</div> 


</div>
: <h1> Cargando...</h1> }


            

<p className="valoracion justifyCenter"><ReactStars
                                     count={5}
                                     isHalf={true}
                                     size={50}
                                     activeColor="#ffd700"
                                     edit={true}
                                     onChange={ratingChanged}
                             /></p>


        
        </>
        
    )
}
const mapStateToProps =state=>{
    return {
        game: state.game.gameById,
        newGamesList: state.game.newGamesList
    }
}
const mapDispatchToProps={
    gamesById: gamesActions.gamesById,
    addComment:gamesActions.add_comment
    
}
export default connect (mapStateToProps, mapDispatchToProps) (GameById)