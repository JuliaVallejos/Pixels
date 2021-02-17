import {connect} from 'react-redux'
import {useState,useEffect} from 'react'
import gamesActions from '../redux/actions/gamesActions'



const DeveloperPage = (props) =>{
    const [errors,setErrors] = useState([])
    const [newGame,setNewGame] = useState({
        gameTitle:'',
        gameInfo:'',
        gameCategories:'',
        clasificationPEGI:'',
        gameImg:''
    })

    console.log(props)

    const read_input = e =>{
        const property= e.target.name
        const value = e.target.value

        setNewGame({
            ...newGame, 
            [property]:value,
            idUser: props.loggedUser.response.id
        })      
    }

        // console.log(props.loggedUser.response.id)

    const send_data= async e =>{
        setErrors([])
        e.preventDefault()

        const {gameTitle,gameInfo,gameCategories,clasificationPEGI,gameImg} = newGame
        
        if(gameTitle==='' || gameInfo===''|| gameCategories ==='' || clasificationPEGI==='' || gameImg===''){
           
            setErrors([{message:'All required(*) fields must be completed'}])
            return false        
        }
     
        const data = await props.submitNewGame(newGame)

        if(data && !data.sucess){
            setErrors([data.errors])
            alert('Error recording a new game')
            console.log(errors)
        }else {
            alert('New game saved successfully')
            //CLEAN INPUT FUNCTION
        } 
    }
// CLEAN INPUTS

    const clasificationPEGI = [3,7,12,16,18]
    console.log(errors)
    console.log(newGame)
    
    return(
        <div className="signUp centerCenter" style={{backgroundImage: `url("../assets/bricks.jpg")`, height: "65vh"}}>
            <h2>Upload your game</h2>
                <form>
                    <input id='gameTitle' name='gameTitle' type='text' placeholder='Game Title*' onChange={read_input}/>

                    <textarea id='gameInfo' name='gameInfo' type='text' placeholder='Game description*' onChange={read_input}/>

                    <select name="gameCategories"onChange={read_input}>

                        <option value="" disabled="true" selected="true">Select Category</option>

                        {props.categories.map(category=>{
                            return(<option value={category.name}>{category.name}</option>)
                        })}
                    </select>
                    <select name="clasificationPEGI"onChange={read_input}>
                        <option value="value1" disabled="true" selected="true">ClasificationPGI</option>
                        {clasificationPEGI.map((clasification,index) =>{
                            return(<option value={clasification} key={index}>{clasification}</option>)
                        })}
                    </select>

                    <input type="text" name="gameImg" placeholder="Pic*" onChange={read_input}/>

                    <button onClick={send_data} type='submit'>Submit</button>
                    
                    {/* {errors.length !==0 ?
                        errors.map((error,index) =>{
                            return (<p key={index}>{error.message}</p>)
                        })
                    : 
                    return false

                    } */}
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

export default connect(mapStateToProps,mapDispatchToProps)(DeveloperPage)