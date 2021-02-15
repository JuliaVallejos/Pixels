
import {useState} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import usersActions from '../redux/actions/usersActions'
import GoogleLogin from 'react-google-login';//traer logIn de google

const LogIn = (props) => {
    const [loggedUser,setLoggedUser] = useState({
        userName:'',
        userPass:''
    })
    const [errors,setErrors] = useState([])

    const read_input = e =>{
        const property= e.target.name
        const value = e.target.value

        setLoggedUser({
            ...loggedUser, 
            [property]:value
        })
       
    }
    const send_data = async e =>{
        e.preventDefault()
        if(loggedUser.userName==='' || loggedUser.userPass===''){
            setErrors([{message:'All fields must be completed'}])
            return false
        }
        const data = await props.login_user(loggedUser)
        
        if(data.errores){
            setErrors(data.errores.details)
        }else{
            setErrors([])
            alert(`Welcome ${data.name}`)
            props.history.push('/')
        }
    }
    return(
        <div>
            <h3>Log In</h3>
                <form>
                <input id='username' name='userName' type='text' placeholder='Username(email)' onChange={read_input}/>
                <input id='password'name='userPass' type='password' placeholder='Password' onChange={read_input}/>

                    <button onClick={send_data} type='submit'>Log In</button>
                    {errors&& errors.map((error,index) =>{
                            return ( <p key={index}>{error.message}</p>)
                        })}
                     <Link to ='/signup'><p>Don't have account? Create one!</p></Link>
                     <Link to ='/'><p>Home</p></Link>
                </form>

        </div>
                )
}


const mapDispatchToProps = {
    login_user:usersActions.login_user
}
export default connect(null,mapDispatchToProps)(LogIn)