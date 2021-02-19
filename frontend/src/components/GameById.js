import { useEffect, useState } from "react"
import { connect } from "react-redux"
import gamesActions from "../redux/actions/gamesActions"
import ReactStars from "react-rating-stars-component";


const GameById = (props)=>{
 
useEffect(()=>{
    const {id}= props.match.params
    props.gamesById(id)
},[])

    // console.log(props.gameById)
    return(
        
    <div>
        {props.game ?

            <div className="singleGame">
                <div className="cajaTituloSingleGame">
                    <h1 className="textCenter uppercase">{props.game.gameTitle}</h1>
                </div>

                <div className="portadaSingleGame" style={{backgroundImage:`url(${props.game.gameImg})`}}></div>

                <div className="cajaTituloSingleGame">
                    <h3 className="textCenter uppercase">{props.game.gameInfo}</h3>
                </div>
            </div>
: <h1> Cargando...</h1> }

<div className="justifyCenter">
    <div className="cajaComentarios">
        <div className="mensajes">
            
            <div class="dialogbox">
                <div class="body">
                <span class="tip tip-left"></span>
                <div class="message">
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

            <div class="dialogbox">
                <div class="body">
                <span class="tip tip-left"></span>
                <div class="message">
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

            <div class="dialogbox">
                <div class="body">
                <span class="tip tip-left"></span>
                <div class="message">
                    <span>I just made a comment about this comment box which is purely made from CSS.</span>
                </div>
                </div>
            </div>

        </div>
        
    
    <div className="enviarMensaje">
        <input  name="comments"   type="text" class="form-control" placeholder="Write your message here!" id="inputEmail4"/>
        <input  id="sendMessage" class=" btn btn-primary"  type="submit" value="SEND MESSAGE"/> 
    </div>
    
    </div>
    
</div> 
            
        



        
        </div>
        
    )
}
const mapStateToProps =state=>{
    return {
        game: state.game.gameById
    }
}
const mapDispatchToProps={
    gamesById: gamesActions.gamesById,
    
}
export default connect (mapStateToProps, mapDispatchToProps) (GameById)