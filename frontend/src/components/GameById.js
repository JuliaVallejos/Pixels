import { useEffect, useState } from "react"
import { connect } from "react-redux"
import Swal from "sweetalert2"
import gamesActions from "../redux/actions/gamesActions"
import ReactStars from "react-rating-stars-component";
import Commentary from "./Commentary";
import {Link} from 'react-router-dom'
import { GrPaypal } from 'react-icons/gr'
import { BiJoystick } from 'react-icons/bi'
import { RiStarSmileLine } from 'react-icons/ri'
import Loader from "../components/Loader"


const GameById = (props)=>{

    var newValoration=0
    const {id}= props.match.params
    const [edit,setEdit] = useState(false)
    const [comment, setComment] = useState('')
    const {game} = props
    
    console.log(game)
    useEffect(()=>{        
        props.gamesById(id)
    },[])
    if(props.game==={}){return <h1>loading...</h1> }
    
    const info = e => {
        var comment = e.target.value       
        setComment(comment)        
    }
    const enviarInfo = async e => {
        e.preventDefault()
        if(!props.loggedUser){
            Swal.fire('You need be logged to comment!')
            return false;
        }
        if(comment===''){
            Swal.fire('You cannot send an empty comment!')
            return false
        }
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
    if(!props.game.idUser){return <Loader/>}
    return(            
        <>
            <div>
                {props.game ?
                    
                <div className="cajaPadreSingleGame">
                    <div className="singleGame">
                        <div className="cajaTituloSingleGame centerCenter">
                            <h1 className="textCenter uppercase">{props.game.gameTitle}</h1>
                        </div>
                        <div className="portadaSingleGame" style={{backgroundImage:`url("/gamesImages/${props.game.gameImg}")`}}/>
                        <div className="cajaTituloSingleGame centerCenter" id="gameInfo1">
                            <h3 className="centerCenter uppercase">{props.game.gameInfo}</h3>
                        </div>
                    </div>
                
                    <div className="justifyCenter">
                        <div className="cajaComentarios">
                            <div className="mensajes">
                                {(props.game.userComments) && props.game.userComments.map(comment => <Commentary game={props.game} comment={comment}/>)}
                            </div>

                            <div className="enviarMensaje">
                                <input name="comment" disabled={!props.loggedUser&&'true'}onChange={info} value={comment}  type="text" class="form-control" placeholder={props.loggedUser? "Write your message here!" :"Please Login to comment"}id="inputEmail4"/>
                                <input style={{cursor:'pointer'}} id="sendMessage" class=" btn btn-primary"  onClick={enviarInfo}  type="submit" value="SEND"/> 
                            </div>    
                        </div>

                    </div>
                    {props.game && <div className="justifyCenter subtitulo uppercase"><h4>Author:{` ${game.idUser.userFirstName} ${game.idUser.userLastName}`} </h4>
                    </div>}


                        <div className="justifyCenter">
                            <Link to="/library">
                                <div className="caja centerCenter backGames zoom" >
                                    <div className="iconPaypal centerCenter">
                                        <BiJoystick/>
                                    </div>
                                    <h3 style={{cursor:'pointer'}}>BACK TO ALL GAMES</h3>
                                </div>
                              
                        </Link>
                        <a href="https://www.paypal.com/" target="_blank">
                            <div className="caja centerCenter paypal zoom" >
                                <div className="iconPaypal centerCenter">
                                    <GrPaypal/>
                                </div>
                                <h3 style={{cursor:'pointer'}}>SUPPORT TO CREATOR</h3>
                            </div>
                        </a>
                        
                    </div>
                    <div className="commentsRate centerCenter paypal ">
                     {props.loggedUser&& <div className="cajaRate centerCenter zoom iconPaypal" onClick={() => setEdit(true)}><div className="iconPaypal centerCenter"><RiStarSmileLine/></div><h3 style={{cursor:'pointer'}} className="centerCenter">RATE THIS GAME</h3></div>}
                   </div>
                
                   
                    <div className="valoracion centerCenter">
                     
                    {edit
                    ?
                            <div className='rateGame'>

                                <ReactStars
                                    count={5}
                                    isHalf={true}
                                    size={50}
                                    activeColor="#ffd700"
                                    edit={true}
                                    onChange={ratingChanged} />

                                <div style={{cursor:'pointer'}}className="cajaRate centerCenter" onClick={send_rate}><p>VOTE</p></div>
                            </div>
                            :   
                            <ReactStars
                            count={5}
                            isHalf={true}
                            value={game.prom}
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