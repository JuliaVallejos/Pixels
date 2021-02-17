import {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import userActions from '../redux/actions/usersActions'
import { GoogleLogin } from 'react-google-login'
import Swal from 'sweetalert2'

const SignUp = (props) =>{
    const [errors,setErrors] = useState([])
    const [dev,setDev]= useState(false)
    const [newUser,setNewUser] = useState({
        userFirstName:'',
        userLastName:'',
        userName:'',
        userPass:'',
        userImg:'',
        userRol:''
    })
   useEffect(() => {
       if(!dev){
           setNewUser({
               ...newUser,
               userPhone:'',
               userPayPal:''
           })
       }
   }, [dev])
    const read_input = e =>{
        const property= e.target.name
        const value = e.target.value

        setNewUser({
            ...newUser, 
            [property]:value
        })
       
    }
    
    const send_data= async e =>{
        setErrors([])
        e.preventDefault()
        const {userFirstName,userLastName,userName,userPass,userImg,userRol,userPhone,userPayPal} = newUser
        
        if(userFirstName==='' || userLastName===''|| userName ==='' || userPass==='' || userImg==='' ||userRol===''){
           
            setErrors([{message:'All required(*) fields must be completed'}])
           return false
        
        }else if(dev===true && (userPhone==='' || userPayPal==='')){
   
            setErrors([{message:'All required(*) fields must be completed'}])
            return false
        }

        const data = await props.createNewUser(newUser)
        if(data && !data.sucess){
            setErrors([data.errors])
        }else {
            alert(`Welcome ${localStorage.getItem("userFirstName")}`)
        }
        
    }
    // GOOGLE SIGN UP
    const responseGoogle = async (googleResponse) => {
        
        if(googleResponse.error){
            alert("algo paso con el registro de google")
        }
        else {

            /* inputOptions can be an object or Promise */
            const inputOptions = new Promise((resolve) => {
                setTimeout(() => {
                resolve({
                    'User': 'User',
                    'Developer': 'Developer'
                })
                }, 1000)
            })
            
            const { value: userRol } = await Swal.fire({
                title: 'Select user type account',
                input: 'radio',
                inputOptions: inputOptions,
                inputValidator: (value) => {
                if (!value) {
                    return 'You need to choose something!'
                }
                }
            })
            
            if (userRol) {
                Swal.fire({ html: `You selected: ${userRol}` })
            }

            alert(userRol);


            const response= await props.createNewUser({
                userFirstName: googleResponse.profileObj.name.split(" ").slice(0,-1).join(" "),
                userLastName: googleResponse.profileObj.name.split(" ").slice(-1).join(" "),
                userName: googleResponse.profileObj.email,
                userPass: googleResponse.profileObj.googleId,
                userImg: googleResponse.profileObj.imageUrl,
                userRol: userRol,
            })
            if(response && !response.sucess){
                setErrors([response.errors])
            }else {
                alert(`Welcome ${localStorage.getItem("userFirstName")}`)
            }
        }
    }
    return (
        <>
        <div className="signUp centerCenter" style={{backgroundImage: `url("../assets/bricks.jpg")`}}>
            <h2>Create an Account</h2>
            <form>
                <input type='text'  name='userFirstName' placeholder='First Name*' onChange={read_input}/>
                <input type='text'  name='userLastName' placeholder='Last Name*' onChange={read_input}/>
                <input type='email' name='userName' placeholder='Username (email)*' onChange={read_input}/>
                <input type='password' name='userPass' placeholder='Password*' onChange={read_input}/>
                <input type='text' name='userImg' placeholder='Profile Photo*' onChange={read_input}/>
                <div className="selection">
                    <div className="radioButtons">
                        <label htmlFor='userRol' onChange={read_input}><p>Account Type:</p>
                        <input type='radio'  onClick={()=>setDev(false)}  value='User' name='userRol'/><p>User</p>
                        <input type='radio' onClick={()=>setDev(true)} value='Developer' name='userRol'/><p>Developer</p>
                        </label>
                    </div>

                    {dev && 
                    <div className="devInputs">
                        <input type='text' name='userPhone'  placeholder='Phone*' onChange={read_input}/>
                        <input type='text' name='userPayPal' placeholder='Your PayPal.me*' onChange={read_input}/>
                    </div>}  
                </div>

                <button type='submit' onClick={send_data}>Send</button>
                {errors[0] && (
                <div className="signUpErrorContainer">
                    {errors[0] && errors[0].map(error=> <p className="signUpErrorText">{error.message}</p>)}
                </div>
                )}


            </form>
                <GoogleLogin
                    clientId="312438551447-nmud4jvr1cmj672mvc01vrmkhs6629r4.apps.googleusercontent.com"
                    buttonText="Sign Up with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
                <Link to ='/login'><p >Do you already have an account? <span className="logInRedirect">Log in here</span></p></Link>
        </div>
        
        </>


    )
}
const mapStateToProps= state =>{
    return {
        loggedUser:state.user.loggedUser
    }
}
const mapDispatchToProps ={
    login_user:userActions.login_user,
    createNewUser: userActions.createNewUser
}
export default connect(mapStateToProps,mapDispatchToProps)(SignUp)