import { useEffect, useState } from "react"
import { connect } from "react-redux"
import gamesActions from "../redux/actions/gamesActions"
import ReactStars from "react-rating-stars-component";



const GameById = (props)=>{
    var newValoration=0
    const {id}= props.match.params
    const [edit,setEdit] = useState(false)

    useEffect(()=>{
        
        props.gamesById(id)
    },[])

    const ratingChanged = (newRating) => {
    
    newValoration=newRating
    console.log(newValoration)
  }
    const send_rate = () =>{

     props.setValoration(id,newValoration)
     setEdit(false)

  }
   
    return(
        
    <div>
        {console.log(props.game)}
        {props.game ?
            <>
            <div className="singleGame">
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
                    <div className="mensajes">
                        
                        <div className="dialogbox">
                            <div className="body">
                                <span className="tip tip-left"></span>
                                <div className="message">
                                <span>I just made a comment about this comment box which is purely made from CSS.</span>
                                </div>
                            </div>
                        </div>

                        <div class="dialogbox">
                            <div class="body">
                                <span class="tip tip-left"></span>
                                <div class="message">
                                    <span>I just made a comment about this comment box which is purely made from CSS.</span>
                                </div>
                            </div>
                        </div>

                        <div className="dialogbox">
                            <div className="body">
                            <span className="tip tip-left"></span>
                            <div className="message">
                                <span>I just made a comment about this comment box which is purely made from CSS.</span>
                            </div>
                            </div>
                        </div>

                    </div>
                    
                
                <div className="enviarMensaje">
                    <input  name="comments"   type="text" className="form-control" placeholder="Write your message here!" id="inputEmail4"/>
                    <input  id="sendMessage" className=" btn btn-primary"  type="submit" value="SEND MESSAGE"/> 
                </div>
                
                </div>
                
            </div> 
            
            
            <div className="valoracion justifyCenter">
              {props.loggedUser&& <button onClick={() => setEdit(true)}>Rate this game</button>}
                {edit?
                <>
                <ReactStars
                    count={5}
                    isHalf={true}
                    size={50}
                    activeColor="#ffd700"
                    edit={true}
                    onChange={ratingChanged} />
                <button onClick={send_rate}>Vote</button>
                </>:
                <ReactStars
                count={5}
                isHalf={true}
                value={props.game.prom}
                size={50}
                activeColor="#ffd700"
                edit= {false}/>}
            </div>
           </>

            : <h1> Cargando...</h1> }
     
            
 
    </div>
        
    )
}
const mapStateToProps =state=>{
    return {
        game: state.game.gameById,
        loggedUser:state.user.loggedUser
    }
}
const mapDispatchToProps={
    gamesById: gamesActions.gamesById,
    setValoration : gamesActions.setValoration
    
}
export default connect (mapStateToProps, mapDispatchToProps) (GameById)