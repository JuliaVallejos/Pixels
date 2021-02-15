import {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import userActions from '../redux/actions/usersActions'
import GoogleLogin from 'react-google-login';//traer logIn de google


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
     
        return false
    }

    return (
        <>
        <h2>Create an Account</h2>
        <form>

            <input type='text'  name='userFirstName' placeholder='First Name*' onChange={read_input}/>
            <input type='text'  name='userLastName' placeholder='Last Name*' onChange={read_input}/>
            <input type='email' name='userName' placeholder='Username(email)*' onChange={read_input}/>
            <input type='password' name='userPass' placeholder='Password*' onChange={read_input}/>
            <input type='text' name='userImg' placeholder='Profile Photo*' onChange={read_input}/>
            <label htmlFor='rol' onChange={read_input}>Account Type:
            <input type='radio'  onClick={()=>setDev(false)}  value='user' name='rol'/>User
            
            <input type='radio' onClick={()=>setDev(true)} value='developer' name='rol'/>Developer
            </label>
            {dev && 
            <div>
                <input type='text' name='userPhone'  placeholder='Phone*'  onChange={read_input}/>
                <input type='text' name='userPayPal' placeholder='Your PayPal.me*'  onChange={read_input}/>
            </div>} 
            <button type='submit' onClick={send_data}>Send</button>
  
            {errors&& errors.map((error,index) =>{
                        return ( <p key={index}>{error.message}</p>)
                    })}
            <Link to ='/login'><p>Do you already have an account? Log in here</p></Link>
            <Link to ='/'><p>Home</p></Link>


        </form>
        </>


    )
}
const mapStateToProps= state =>{
    return {
        loggedUser:state.user.loggedUser
    }
}
const mapDispatchToProps ={
    createNewUser: userActions.createNewUser
}
export default connect(mapStateToProps,mapDispatchToProps)(SignUp)