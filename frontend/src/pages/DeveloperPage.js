import React, {useState} from 'react'
import {connect} from 'react-redux'
import newsActions from '../redux/actions/newsActions';


const DeveloperPage = (props) =>{





    return(
        <div className="signUp centerCenter" style={{backgroundImage: `url("../assets/bricks.jpg")`, height: "65vh"}}>
            <h2>Upload your game</h2>
                <form>
                    <input id='gameTitle' name='gameTitle' type='text' placeholder='Game Title' onChange={read_input}/>
                    <textarea id='gameInfo'name='gameInfo' type='text' placeholder='Game description' onChange={read_input}/>
                    <select name="gameCategories"onChange={read_input}>
                        <option value="value1" disabled="true">Category</option>
                        {gameCategories.map(category=>{
                            return(
                                <option value="value2">{category}</option>
                            )
                        })}
                    </select>
                    {/* Clasificacion PGI */}
                    <select name="gameCategories"onChange={read_input}>
                        <option value="value1" disabled="true">Category</option>
                        {gameCategories.map(category=>{
                            return(
                                <option value="value2">{category}</option>
                            )
                        })}
                    </select>


                    <button onClick={send_data} type='submit'>Submit</button>
                    {errors&& errors.map((error,index) =>{
                            return ( <p key={index}>{error.message}</p>)
                        })}
                </form>
        </div>
    )
}

const mapStateToProps= state =>{
    return{
        
    }
}

const mapDispatchToProps= {   
    
}

export default connect(mapStateToProps,mapDispatchToProps)(DeveloperPage)