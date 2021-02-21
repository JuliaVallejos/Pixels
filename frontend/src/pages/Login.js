import {useState} from 'react'
import { connect } from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import usersActions from '../redux/actions/usersActions'
import { GoogleLogin } from  'react-google-login'
import Swal from "sweetalert2"


const LogIn = (props) => {
    const [errors,setErrors] = useState([])
    const [loggedUser,setLoggedUser] = useState({
        userName:'',
        userPass:''
    })


    const read_input = e =>{
        const property= e.target.name
        const value = e.target.value

        setLoggedUser({
            ...loggedUser, 
            [property]:value
        })
       
    }
    const send_data = async (e) =>{
        setErrors([])
        e.preventDefault()
        if(loggedUser.userName==='' || loggedUser.userPass===''){
            setErrors([[ 'All fields must be completed']])
            return false;
        }
        const data = await props.login_user(loggedUser)   
        if(data && !data.sucess){
            setErrors([data.errors])
            return false;
        }else{
            
            Swal.fire({
                icon: 'success',
                title: `Welcome! ${localStorage.getItem("userFirstName")}`,
                text: 'Enjoy all our content!',
              })
            
        }
        
    }
    // GOOGLE SIGN UP ACCOUNT
    const responseGoogle = async (googleResponse) => {
        if(googleResponse.error){
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'There was an error trying to log in with Google, try again later!',
              })
        }else{
            const response= await props.login_user({
                userName: googleResponse.profileObj.email,
                userPass: googleResponse.profileObj.googleId
            })
            if(response && !response.sucess){
                setErrors([response.response])
            }else{
                Swal.fire({
                    icon: 'success',
                    title:`Welcome ${localStorage.getItem("userFirstName")}!`,
                    text: 'Enjoy all our content!',
                  })
                props.history.push('/')
            }
        }
    }
    
    return(
        <div className="signUp centerCenter" style={{backgroundImage: `url("../assets/bricks.jpg")`, height: "65vh"}}>
            <h2>Log In</h2>
                <form>
                <input id='username' name='userName' type='text' placeholder='Username(email)' onChange={read_input}/>
                <input id='password'name='userPass' type='password' placeholder='Password' onChange={read_input}/>

                    <button onClick={send_data} type='submit'>Log In</button>
                    {errors[0] && (
                <div className="signUpErrorContainer">
                    {errors[0].map(error=> <p className="signUpErrorText">{error}</p>)}
                </div>
                )}
                
                </form>
                    <GoogleLogin
                        clientId="312438551447-nmud4jvr1cmj672mvc01vrmkhs6629r4.apps.googleusercontent.com"
                        buttonText="Login with Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                    <Link to ='/signup'><p>Don't have account? <span className="logInRedirect">Create one!</span></p></Link>
                    <Link to='/passwordReset'>Can't remember your password? <span className="logInRedirect">Click Here!</span></Link>
                    <Link to ='/'><p>Home</p></Link>
        </div>
                )
}


const mapDispatchToProps = {
    login_user:usersActions.login_user
}
export default connect(null,mapDispatchToProps)(LogIn)