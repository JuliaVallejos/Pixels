import { useState } from "react"
import Swal from "sweetalert2"
import { connect } from "react-redux"
import usersActions from "../redux/actions/usersActions"

const EnterNewPassword = (props) => {
const [password, setPassword]=useState({
    userPass:''
})
    const readInput= e =>{
        const property = e.target.name
        var value = e.target.value
        setPassword({
            ...password,
            [property]:value
        }
            
        )
    }
    const sendPassword= async e =>{
        e.preventDefault()
        if(password.userPass==='' || password.userName === ''){
            Swal(' add password')
            return false
        }
        console.log(password)
        const data = await props.recoverPassword(password)
        console.log(data)
        if(data && !data.success){
            console.log(data)
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
                <p className="centerCenter">Your password will be reseted.</p>
            </form>
            
        </div>
        </>
    )
}




const mapDispatchToProps ={
    recoverPassword: usersActions.recoverPassword
}

export default connect(null,mapDispatchToProps) (EnterNewPassword)