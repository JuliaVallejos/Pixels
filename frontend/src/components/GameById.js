import { useEffect, useState } from "react"
import { connect } from "react-redux"
import gamesActions from "../redux/actions/gamesActions"
import ReactStars from "react-rating-stars-component";
import Commentary from "./Commentary";
import {Link} from 'react-router-dom'
import { GrPaypal } from 'react-icons/gr'
import { BiJoystick } from 'react-icons/bi'
import { RiStarSmileLine } from 'react-icons/ri'







const GameById = (props)=>{

    var newValoration=0
    const {id}= props.match.params
    const [edit,setEdit] = useState(false)
    const [comment, setComment] = useState('')


    useEffect(()=>{        
        props.gamesById(id)
    },[])

    const info = e => {
        var comment = e.target.value       
        setComment(comment)        
        console.log(comment)
    }
    const enviarInfo = async e => {
        e.preventDefault()
        props.addComment(comment, id)
        setComment('')
    }
    const ratingChanged = (newRating) => {
        newValoration=newRating
        console.log(newValoration)
    }
    const send_rate = () =>{
        props.setValoration(id,newValoration)
        setEdit(false)
    }

    console.log(props.game)

    return(            
        <>
            <div>
                
                {props.game ?

                <div className="cajaPadreSingleGame">
                    <div className="singleGame">
                        
                        <div className="cajaTituloSingleGame centerCenter">
                            <h1 className="textCenter uppercase">{props.game.gameTitle}</h1>
                        </div>
                        <div className="portadaSingleGame" style={{backgroundImage:`url(${props.game.gameImg})`}}/>
                        <div className="cajaTituloSingleGame centerCenter">
                            <h3 className="centerCenter uppercase">{props.game.gameInfo}</h3>
                        </div>
                    </div>
                    <div className="justifyCenter">
                        <div className="cajaComentarios">
                            <div className="mensajes">
                                {props.game.userComments.map(comment => <Commentary comment={comment}/>)}
                            </div>

                            <div className="enviarMensaje">
                                <input name="comment" onChange={info} value={comment}  type="text" class="form-control" placeholder="Write your message here!" id="inputEmail4"/>
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
                
                   
                    <div className="valoracion centerCenter">
                            {edit?
                            <div className="rateGame">
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
                            <ReactStars
                            count={5}
                            isHalf={true}
                            value={props.game.prom}
                            size={50}
                            activeColor="#ffd700"
                            edit= {false}/>

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
        game: state.game.gameById,
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