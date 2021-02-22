import {connect} from 'react-redux'
import {useState} from 'react'
import gamesActions from '../redux/actions/gamesActions'
import {Redirect} from 'react-router-dom'
import Swal from "sweetalert2"


const AddGame = (props) =>{
     
    const clasificationPEGI = [3,7,12,16,18]

    const [errors,setErrors] = useState([])
    const [newGame,setNewGame] = useState({
        gameTitle:'',
        gameInfo:'',
        gameCategories:'',
        clasificationPEGI:'',
        gameImg:''
    })

    const read_input = e =>{
        const property= e.target.name
        var value = e.target.value
        if(property ==="gameImg"){
            value=e.target.files[0];
        }
        setNewGame({
            ...newGame, 
            [property]:value,
            idUser: props.loggedUser.id
        })      
    }


    const send_data= async e =>{
        setErrors([])
        e.preventDefault()

        const {gameTitle,gameInfo,gameCategories,clasificationPEGI,gameImg,idUser} = newGame

        const formNewGame= new FormData();

        formNewGame.append("gameTitle",gameTitle)
        formNewGame.append("gameInfo",gameInfo)
        formNewGame.append("gameCategories",gameCategories)
        formNewGame.append("clasificationPEGI",clasificationPEGI)
        formNewGame.append("gameFile",gameImg)
        formNewGame.append("idUser",idUser)
        

        if(gameTitle ==='' || gameInfo===''|| gameCategories ==='' || clasificationPEGI ==='' || gameImg ===''){           
            setErrors([{message:'All required(*) fields must be completed'}])
            return false        
        }
     
        const data = await props.submitNewGame(formNewGame)
        
        Swal.fire({
            icon: 'success',
            title: 'Excellent!',
            text: 'The game has been uploaded successfully!',
          })
    

    }
    
    return(<>
        <h2 className="centerCenter">Upload your game</h2>
        <div className="addGameContainer centerCenter">            
                <form className="addGames">
                    <input id='gameTitle' name='gameTitle' type='text' placeholder='Game Title*' onChange={read_input}/>

                    <textarea id='gameInfo' name='gameInfo' type='text' placeholder='Game description*' style={{resize: 'unset', height:'150px' }} onChange={read_input}/>

                    <select className="gameCategories" name='gameCategories'onChange={read_input}>
                        <option value='' disabled='true' selected='true'>Select Category</option>
                        {props.categories.map(category=>{
                            return(<option value={category.name}>{category.name}</option>)
                        })}
                    </select>
                    
                    <select className="gameCategories" name='clasificationPEGI'onChange={read_input}>
                        <option value='value1' disabled='true' selected='true'>ClasificationPEGI</option>
                        {clasificationPEGI.map((clasification,index) =>{
                            return(<option value={clasification} key={index}>{clasification}</option>)
                        })}
                    </select>

                    <label htmlFor='gameImg'><p>Upload your game pic</p></label>
                    <label htmlFor="uploadButton" className="inputFile">
                        <p >Click here to Upload a news image</p>
                        <input id="uploadButton" className="fileGame" type='file'  name='gameImg' onChange={read_input}/>
                    </label>
                    
                    
                    

                    <button onClick={send_data} type='submit'>Submit</button>
                    
                    {errors&& errors.map((error,index) =>{
                                return (<p key={index}>{error.message}</p>)
                            })}
                </form>
        </div>
        </>
    )
}

const mapStateToProps= state =>{
    return {
        gamesList: state.game.gamesList,
        categories: state.game.categories,
        loggedUser: state.user.loggedUser
    }
}

const mapDispatchToProps= {   
    submitNewGame: gamesActions.submitNewGame,
    allGames: gamesActions.allGames
}

export default connect(mapStateToProps,mapDispatchToProps)(AddGame)