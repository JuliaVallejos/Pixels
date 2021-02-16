import {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import userActions from '../redux/actions/usersActions'
import { GoogleLogin } from 'react-google-login'

const SignUp = (props) =>{
    const [errors,setErrors] = useState([])
    const [dev,setDev]= useState(false)
    const [newUser,setNewUser] = useState({
        userFirstName:'',
        userLastName:'',
        userName:'',
        userPass:'',
        userImg:'',
        rol:''
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
        const {userFirstName,userLastName,userName,userPass,userImg,rol,userPhone,userPayPal} = newUser
        
        if(userFirstName==='' || userLastName===''|| userName ==='' || userPass==='' || userImg==='' ||rol===''){
           
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
            console.log("aass")
        }
    }

    // GOOGLE SIGN UP
    const responseGoogle = async (googleResponse) => {
        if(googleResponse.error){
            alert("algo paso con el registro de google")
        }
        else {
            const response= await props.createNewUser({
                userFirstName: googleResponse.profileObj.givenName.split(" ").slice(0,-1).join(" "),
                userLastName: googleResponse.profileObj.givenName.split(" ").slice(-1).join(" "),
                userName: googleResponse.profileObj.email,
                userPass: googleResponse.profileObj.googleId,
                userImg: googleResponse.profileObj.imageUrl,
                rol: "user"
            })
            if(response && !response.sucess){
                setErrors([response.errors])
            }else {
                alert(`Welcome ${localStorage.getItem("firstName")}`)
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
                        <label htmlFor='rol' onChange={read_input}><p>Account Type:</p>
                        <input type='radio'  onClick={()=>setDev(false)}  value='user' name='rol'/><p>User</p>
                        <input type='radio' onClick={()=>setDev(true)} value='developer' name='rol'/><p>Developer</p>
                        </label>
                    </div>

                    {dev && 
                    <div className="devInputs">
                        <input type='text' name='userPhone'  placeholder='Phone*' onChange={read_input}/>
                        <input type='text' name='userPayPal' placeholder='Your PayPal.me*' onChange={read_input}/>
                    </div>}  
                </div>

                <button type='submit' onClick={send_data}>Send</button>
                
                {errors.map(error=> <p>{error}</p> )}

                <GoogleLogin
                    clientId="312438551447-nmud4jvr1cmj672mvc01vrmkhs6629r4.apps.googleusercontent.com"
                    buttonText="Sign Up with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
                <Link to ='/login'><p >Do you already have an account? <span className="logInRedirect">Log in here</span></p></Link>
            </form>
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