import {connect} from 'react-redux'
import {useState} from 'react'
import gamesActions from '../redux/actions/gamesActions'



const AddGames = (props) =>{
    const [errors,setErrors] = useState([])
    const [newGame,setNewGame] = useState({
        gameTitle:'',
        gameInfo:'',
        gameCategories:'',
        clasificationPEGI:'',
        gameImg:''
    })

    // console.log(props)

    const read_input = e =>{
        const property= e.target.name
        var value = e.target.value
        // console.log(e.target.files[0])
        if(property ==="gameImg"){
            value=e.target.files[0];
        }
        setNewGame({
            ...newGame, 
            [property]:value,
            idUser: props.loggedUser.id
        })      
    }

        // console.log(props.loggedUser.id)

    const send_data= async e =>{
        setErrors([])
        e.preventDefault()
        // console.log(newGame)
        const {gameTitle,gameInfo,gameCategories,clasificationPEGI,gameImg} = newGame
        const formNewGame= new FormData();

        formNewGame.append("gameTitle",gameTitle)
        formNewGame.append("gameInfo",gameInfo)
        formNewGame.append("gameCategories",gameCategories)
        formNewGame.append("clasificationPEGI",clasificationPEGI)
        formNewGame.append("gameImg",gameImg)

        if(gameTitle ==='' || gameInfo===''|| gameCategories ==='' || clasificationPEGI ==='' || gameImg ===''){           
            setErrors([{message:'All required(*) fields must be completed'}])
            return false        
        }
     
        const data = await props.submitNewGame(formNewGame)
        console.log(data)
        // if(data && !data.sucess){
        //     setErrors([data.errors])
        //     alert('Error recording a new game')
        //     console.log(errors)
        // }else {
        //     alert('New game saved successfully')

        // } 
    }
    
    const clasificationPEGI = [3,7,12,16,18]

    // console.log(errors)
    console.log(newGame)
    
    return(
        <div className="signUp centerCenter" style={{height: "65vh"}}>
            <h2>Upload your game</h2>
                <form>
                    <input id='gameTitle' name='gameTitle' type='text' placeholder='Game Title*' onChange={read_input}/>

                    <textarea id='gameInfo' name='gameInfo' type='text' placeholder='Game description*' style={{resize: 'unset', height:'150px' }} onChange={read_input}/>

                    <select name='gameCategories'onChange={read_input}>
                        <option value='' disabled='true' selected='true'>Select Category</option>
                        {props.categories.map(category=>{
                            return(<option value={category.name}>{category.name}</option>)
                        })}
                    </select>
                    
                    <select name='clasificationPEGI'onChange={read_input}>
                        <option value='value1' disabled='true' selected='true'>ClasificationPGI</option>
                        {clasificationPEGI.map((clasification,index) =>{
                            return(<option value={clasification} key={index}>{clasification}</option>)
                        })}
                    </select>

                    {/* <input type="text" name="gameImg" placeholder="Pic*" onChange={read_input}/> */}
                    <label htmlFor='gameImg'><p>Upload your game pic</p></label>
                    <input type='file' id='gameImg' name='gameImg' onChange={read_input}/>

                    <button onClick={send_data} type='submit'>Submit</button>
                    
                    {errors&& errors.map((error,index) =>{
                                return (<p key={index}>{error.message}</p>)
                            })}
                </form>
        </div>
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

export default connect(mapStateToProps,mapDispatchToProps)(AddGames)