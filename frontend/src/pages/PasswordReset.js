import {useState,useEffect} from 'react'
import { connect } from 'react-redux'
import usersActions from '../redux/actions/usersActions'
import Swal from "sweetalert2"

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
            Swal.fire({
                icon: 'error',
                title: 'Error :(',
                text: 'Please introduce your email and try again.',
              })
            return false
        }
        const data = await props.contactEmail(email)
        console.log(data)
        if(data && data.success){
            Swal.fire({
                icon: 'success',
                title: 'Congratulation!',
                text: 'Please check your mailbox! :)',
              })
            window.location='/'
        }
        else if (data && !data.success){
            Swal.fire({
                icon: 'error',
                title: 'Error :(',
                text: 'Email must be a valid email',
            })
            return false
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Error :(',
                text: 'There was a failure sending the email, please try again!',
            })
            return false
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