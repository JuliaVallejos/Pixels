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
        var value = e.target.value
        if(property==="userImg"){
            value=e.target.files[0];
        }
        setNewUser({
            ...newUser, 
            [property]:value
        }) 
    }
    
    const send_data= async (e) =>{
        setErrors([])
        e.preventDefault()
        const {userFirstName,userLastName,userName,userPass,userImg,userRol,userPhone,userPayPal} = newUser
        const formSignUp= new FormData();
        formSignUp.append("userFirstName",userFirstName)
        formSignUp.append("userLastName",userLastName)
        formSignUp.append("userName",userName)
        formSignUp.append("userPass",userPass)
        formSignUp.append("imgFile",userImg)
        formSignUp.append("userRol",userRol)
        formSignUp.append("userPhone",userPhone)
        formSignUp.append("userPayPal",userPayPal)
        
        if(userFirstName==='' || userLastName===''|| userName ==='' || userPass==='' || userImg==='' ||userRol===''){
            setErrors([['All required(*) fields must be completed']])
            return false
        }else if(dev===true && (userPhone==='' || userPayPal==='')){
            setErrors([['All required(*) fields must be completed']])
            return false
        }
        const data = await props.createNewUser(formSignUp)     

        if(data && !data.sucess){
            console.log(data)
            setErrors([data.errors])
        }else {
            Swal.fire({
                icon: 'success',
                title:  `Welcome ${localStorage.getItem("userFirstName")}!`,
                text: 'Enjoy all our content!',
              })
        }
        
    }
    // GOOGLE SIGN UP
    const inputOptions = new Promise((resolve) => {
        setTimeout(() => {
        resolve({
            'User': 'User',
            'Developer': 'Developer'
        })
        }, 1000)
    })
    
   
    const responseGoogle = async (googleResponse) => {
        console.log(googleResponse)
        const formSignUp= new FormData();
        if(googleResponse.error){
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'There was an error trying to register with Google, try again later!',
              })
        }
        else {
            const { value: userRol } = await Swal.fire({
                title: 'Select user type account',
                input: 'radio',
                inputOptions: inputOptions,
                inputValidator: (value) => {
                    if (!value) {
                        return 'You need to choose something!'
                    }
                },
                showCancelButton: true
            })
            const { value: imgFile } = await Swal.fire({
                title: 'Select image',
                input: 'file',
                inputAttributes: {
                  'accept': 'image/*',
                  'aria-label': 'Upload your profile picture'
                }
              })
            
            if (userRol  && imgFile) {
                formSignUp.append("userFirstName",googleResponse.profileObj.name.split(" ").slice(0,-1).join(" "))
                formSignUp.append("userLastName",googleResponse.profileObj.name.split(" ").slice(-1).join(" "))
                formSignUp.append("userName",googleResponse.profileObj.email)
                formSignUp.append("userPass",googleResponse.profileObj.googleId)
                formSignUp.append("imgFile",imgFile)
                formSignUp.append("userRol",userRol)
                formSignUp.append("userPhone","")
                formSignUp.append("userPayPal","")

                const response= await props.createNewUser(formSignUp)
                if(response && !response.sucess){
                    setErrors([response.errors])
                }else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Welcome!' `${localStorage.getItem("userFirstName")}`,
                        text: 'Enjoy all our content!',
                      })
                    props.history.push('/')
                }
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
                <label htmlFor="userImg"><p>Upload your pic</p></label>
                <input type='file' id="userImg" name='userImg' onChange={read_input}/>
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
                    {errors[0].map(error=> <p className="signUpErrorText">{error}</p>)}
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