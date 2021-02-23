import { useState } from "react"
import Swal from "sweetalert2"
import { connect } from "react-redux"
import usersActions from "../redux/actions/usersActions"

const EnterNewPassword = (props) => {
const [password, setPassword]=useState({
    userPass:''
})
const [errors, setErrors]=useState([])
    const readInput= e =>{
        const property = e.target.name
        var value = e.target.value
        setPassword({
            ...password,
            [property]:value
        })
    }

    const sendPassword= async e =>{
        setErrors([])
        e.preventDefault()

        if(password.userPass===''|| password.userName === ''){
            setErrors([['Fill both fields, please try again.']])
            return false
        }
        const data = await props.recoverPassword(password)
        console.log(data)
        if(data && data.success){
            Swal.fire({
                icon: 'success',
                title: 'Congratulation!',
                text: 'Your password has been updated! :)',
                confirmButtonText: 'Ok',
                closeOnConfirm: true
              }).then(function (result) {
                if (result.value) {
             /*       props.history.push('/') */
                }})
        }
        else if (data && !data.success){
            setErrors([['Email must be a valid email and password must contain at least one number, one lowercase and one uppercase letter and six characters']])
            return false
        }
        else{
            setErrors([['There was a failure creating the new pasword, please try again.']])
            return false
        }
    }

  
    return(
        <>
        <div className="signUp centerCenter" style={{backgroundImage: `url("../assets/bricks.jpg")`, height: "65vh"}}>
            <h2>Enter your New Password</h2>
            <form>
                <input type='email'name="userName" placeholder="Enter your email" onChange={readInput}></input>
                <input type='password' name="userPass" placeholder="Enter your new password" onChange={readInput}></input>
                <button onClick={sendPassword}>Send</button>
                {errors[0] && (
                <div className="signUpErrorContainer">
                    {errors[0].map(error=> <p className="signUpErrorText">{error}</p>)}
                </div>
                )}
                <p className="centerCenter">Your password will be reseted</p>
            </form>            
        </div>
        </>
    )
}




const mapDispatchToProps ={
    recoverPassword: usersActions.recoverPassword
}

export default connect(null,mapDispatchToProps) (EnterNewPassword)