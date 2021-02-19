import {useState,useEffect} from 'react'
import userActions from '../redux/actions/usersActions'

const PasswordReset = ()=>{
    const readInput= e =>{
        const property = e.target.name
        var value = e.target.value
    }
    return(
        <>
        <div className="signUp centerCenter" style={{backgroundImage: `url("../assets/bricks.jpg")`, height: "65vh"}}>
            <h2>Enter your Email Account</h2>
            <form>
                <input type='email' name="userName" placeholder="Enter your email"></input>
                <button >Send</button>
                <p className="centerCenter">An email will be sent to your email to reset your password.</p>
            </form>
            
        </div>
        </>
    )
}
export default PasswordReset