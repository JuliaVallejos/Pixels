import React, {useState} from 'react'
import {connect} from 'react-redux'
import {useState,useEffect} from 'react'
import gamesActions from '../redux/actions/gamesActions';


const DeveloperPage = (props) =>{
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
        const value = e.target.value

        setNewGame({
            ...newGame, 
            [property]:value
        })      
    }

    const send_data= async e =>{
        setErrors([])
        e.preventDefault()
        const {gameTitle,gameInfo,gameCategories,clasificationPEGI,gameImg} = newGame
        
        if(gameTitle==='' || gameInfo===''|| gameCategories ==='' || clasificationPEGI==='' || gameImg===''){
           
            setErrors([{message:'All required(*) fields must be completed'}])
            return false        
        }
        const data = await props.createNewGame(newGame)
     
        return false
    }

    const clasificationPEGI = [3,7,12,16,18]


    return(
        <div className="signUp centerCenter" style={{backgroundImage: `url("../assets/bricks.jpg")`, height: "65vh"}}>
            <h2>Upload your game</h2>
                <form>
                    <input id='gameTitle' name='gameTitle' type='text' placeholder='Game Title' onChange={read_input}/>

                    <textarea id='gameInfo'name='gameInfo' type='text' placeholder='Game description' onChange={read_input}/>

                    <select name="gameCategories"onChange={read_input}>
                        <option value="value1" disabled="true">Category</option>
                        {gameCategories.map(category=>{
                            return(<option value="value2">{category}</option>)
                        })}
                    </select>
                    <select name="clasificationPEGI"onChange={read_input}>
                        <option value="value1" disabled="true">ClasificationPGI</option>
                        {clasificationPEGI.map(clasification =>{
                            return(<option value="value3">{clasification}</option>)
                        })}
                    </select>

                    <input type="text" name="gameImg" placeholder="Pic" onChange={read_input}/>

                    <button onClick={send_data} type='submit'>Submit</button>
                    {errors&& errors.map((error,index) =>{
                            return (<p key={index}>{error.message}</p>)
                        })}
                </form>
        </div>
    )
}

const mapDispatchToProps= {   
    submitNewGame: gamesActions.submitNewGame
}

export default connect(null,mapDispatchToProps)(DeveloperPage)