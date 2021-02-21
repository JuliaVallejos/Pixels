import { useEffect, useState } from "react"
import { connect } from "react-redux"
import gamesActions from "../redux/actions/gamesActions"
import ReactStars from "react-rating-stars-component";
import Commentary from "./Commentary";
import { set } from "mongoose";
import Swal from 'sweetalert2'
import {Link} from 'react-router-dom'
import { GrPaypal } from 'react-icons/gr'
import { BiJoystick } from 'react-icons/bi'
import { RiStarSmileLine } from 'react-icons/ri'







const GameById = (props)=>{
    var newValoration=0
    const {id}= props.match.params
    console.log(id)
    const [edit,setEdit] = useState(false)
    const [comment, setComment] = useState('')


    useEffect(()=>{        
        props.gamesById(id)
    },[])

    const info = e => {
        var comment = e.target.value       
        setComment(comment)        
    
    }
    const enviarInfo = async e => {
        if(comment===''){
            Swal.fire('You cannot send an empty comment!')
            return false
        }
        e.preventDefault()
        props.addComment(comment, id)
        setComment('')
    }
    const ratingChanged = (newRating) => {
        newValoration=newRating
     
    }
    const send_rate = async() =>{
      const data = await props.setValoration(id,newValoration)

        setEdit(false)
    }

 

    return(            
        <>
            <div>
                
                {props.gameById ?

                <div className="cajaPadreSingleGame">
                    <div className="singleGame">
                        
                        <div className="cajaTituloSingleGame">
                            <h1 className="textCenter uppercase">{props.game.gameTitle}</h1>
                        </div>
                        <div className="portadaSingleGame" style={{backgroundImage:`url(${props.game.gameImg})`}}/>
                        <div className="cajaTituloSingleGame">
                            <h3 className="textCenter uppercase">{props.game.gameInfo}</h3>
                        </div>
                    </div>
                    <div className="justifyCenter">
                        <div className="cajaComentarios">
                            <div className="mensajes">
                               
                                {props.game.userComments.map(comment => <Commentary game={props.game} comment={comment}/>)}
                            </div>

                            <div className="enviarMensaje">
                                <input name="comment" disabled={!props.loggedUser&&'true'}onChange={info} value={comment}  type="text" class="form-control" placeholder={props.loggedUser? "Write your message here!" :"Please Login to comment"}id="inputEmail4"/>
                                <input id="sendMessage" class=" btn btn-primary"  onClick={enviarInfo}  type="submit" value="SEND MESSAGE"/> 
                            </div>    
                        </div>
                    </div>

                    <div className="justifyCenter">
                        <Link to="/library">
                            <div className="caja centerCenter backGames zoom" >
                                <div className="iconPaypal centerCenter">
                                    <BiJoystick/>
                                </div>
                                <h3>BACK TO ALL GAMES</h3>
                            </div>
                        </Link>
                        <a href="https://www.paypal.com/" target="_blank">
                            <div className="caja centerCenter paypal zoom" >
                                <div className="iconPaypal centerCenter">
                                    <GrPaypal/>
                                </div>
                                <h3>SUPPORT TO CREATOR</h3>
                            </div>
                        </a>
                        
                    </div>
                    <div className=" centerCenter paypal ">
                     {props.loggedUser&& <div className="cajaRate centerCenter zoom iconPaypal" onClick={() => setEdit(true)}><div className="iconPaypal centerCenter"><RiStarSmileLine/></div> RATE THIS GAME</div>}
                   </div>
                
                   
                    <div className="valoracion justifyCenter">
                        {console.log(props.game.prom)}
                            {edit?
                            <div>
                                <ReactStars
                                    count={5}
                                    isHalf={true}
                                    size={50}
                                    activeColor="#ffd700"
                                    edit={true}
                                    onChange={ratingChanged} />
                                <div className="cajaRate centerCenter" onClick={send_rate}>VOTE</div>
                            </div>
                            :
                                <div></div>
                            }
                    </div>
                
                </div>
                : <h1> Cargando...</h1>                
                }
            </div> 
        </> 
    )
}



const mapStateToProps = state =>{
    return {
        gameById: state.game.gameById,
        newGamesList: state.game.newGamesList,
        loggedUser:state.user.loggedUser
    }
}
const mapDispatchToProps={
    gamesById: gamesActions.gamesById,
    addComment: gamesActions.add_comment,
    setValoration : gamesActions.setValoration    
}

export default connect (mapStateToProps, mapDispatchToProps) (GameById)