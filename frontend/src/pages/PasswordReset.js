import {useState,useEffect} from 'react'
import { connect } from 'react-redux'
import usersActions from '../redux/actions/usersActions'
import userActions from '../redux/actions/usersActions'

const PasswordReset = (props)=>{
    const [email, setEmail]=useState({})
    const readInput= e =>{
        const property = e.target.name
        var value = e.target.value
        setEmail({
            ...email,
            [property]:value
        })
    }
    const sendContact = async e =>{
        e.preventDefault()
        console.log(email)
        if(email.userName === ''){
            return false
        }
        const data = await props.contactEmail(email)
        console.log(data)
        if(data && !data.success){
            console.log(data)
        }
    }
    return(
        <>
        <div className="signUp centerCenter" style={{backgroundImage: `url("../assets/bricks.jpg")`, height: "65vh"}}>
            <h2>Enter your Email Account</h2>
            <form>
                <input type='email' name="userName" placeholder="Enter your email" onChange={readInput}></input>
                <button onClick={sendContact}>Send</button>
                <p className="centerCenter">An email will be sent to your email to reset your password.</p>
            </form>
            
        </div>
        </>
    )
}

const mapDispatchToProps ={
    contactEmail: usersActions.contactEmail
}
export default connect (null,mapDispatchToProps) (PasswordReset)